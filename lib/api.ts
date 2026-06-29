import { v4 as uuidv4 } from 'uuid';
import type { ApiResponse, ApiError } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/v1';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

async function refreshToken(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // HttpOnly refresh cookie
    });
    if (!res.ok) return false;
    const data = await res.json();
    localStorage.setItem('access_token', data.accessToken);
    return true;
  } catch {
    return false;
  }
}

export class ApiClientError extends Error {
  status: number;
  code: string;
  details?: ApiError['error']['details'];

  constructor(status: number, error: ApiError['error']) {
    super(error.message);
    this.status = status;
    this.code = error.code;
    this.details = error.details;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  retrying = false
): Promise<ApiResponse<T>> {
  const token = getToken();
  const correlationId = uuidv4();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Correlation-ID': correlationId,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (res.status === 401 && !retrying) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return request<T>(path, options, true);
    }
    // Redirect to login
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    throw new ApiClientError(401, {
      code: 'UNAUTHORIZED',
      message: 'Session expired.',
      requestId: correlationId,
      timestamp: new Date().toISOString(),
    });
  }

  if (!res.ok) {
    const errBody: ApiError = await res.json().catch(() => ({
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred.',
        requestId: correlationId,
        timestamp: new Date().toISOString(),
      },
    }));
    throw new ApiClientError(res.status, errBody.error);
  }

  return res.json() as Promise<ApiResponse<T>>;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
};

// ─── Account ───────────────────────────────────────────────────────────────
export const accountApi = {
  getSummary: (accountNumber: string) =>
    api.get(`/accounts/${accountNumber}/summary`),
  validateEnroll: (accountNumber: string, enrollmentType: string) =>
    api.get(`/accounts/${accountNumber}/validate-enroll?enrollmentType=${enrollmentType}`),
};

// ─── Billing ────────────────────────────────────────────────────────────────
export const billingApi = {
  getBillHistory: (
    accountNumber: string,
    params: { page?: number; pageSize?: number; fromDate?: string; toDate?: string; status?: string } = {}
  ) => {
    const qs = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== '')
          .map(([k, v]) => [k, String(v)])
      )
    ).toString();
    return api.get(`/accounts/${accountNumber}/bills${qs ? `?${qs}` : ''}`);
  },
  getConsumptionHistory: (
    accountNumber: string,
    params: { granularity?: string; fromDate?: string; toDate?: string } = {}
  ) => {
    const qs = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      )
    ).toString();
    return api.get(`/accounts/${accountNumber}/consumption${qs ? `?${qs}` : ''}`);
  },
};

// ─── Services ───────────────────────────────────────────────────────────────
export const servicesApi = {
  getServiceDetails: (accountNumber: string) =>
    api.get(`/accounts/${accountNumber}/services/details`),
  getServiceOrderHistory: (accountNumber: string, params: { page?: number; pageSize?: number } = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      )
    ).toString();
    return api.get(`/accounts/${accountNumber}/services/orders${qs ? `?${qs}` : ''}`);
  },
  postServiceRequest: (accountNumber: string, body: unknown) =>
    api.post(`/accounts/${accountNumber}/services/requests`, body),
  postMoveRequest: (accountNumber: string, body: unknown) =>
    api.post(`/accounts/${accountNumber}/services/move`, body),
};

// ─── Profile ────────────────────────────────────────────────────────────────
export const profileApi = {
  updateBusinessPartner: (accountNumber: string, body: unknown) =>
    api.put(`/accounts/${accountNumber}/profile`, body),
  updateEmail: (accountNumber: string, body: unknown) =>
    api.put(`/accounts/${accountNumber}/contact/email`, body),
  updatePhone: (accountNumber: string, body: unknown) =>
    api.put(`/accounts/${accountNumber}/contact/phone`, body),
  updateAddress: (accountNumber: string, body: unknown) =>
    api.put(`/accounts/${accountNumber}/address`, body),
  updatePaperBill: (accountNumber: string, body: unknown) =>
    api.put(`/accounts/${accountNumber}/preferences/paper-bill`, body),
};
