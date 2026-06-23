// Account
export interface AccountSummary {
  accountNumber: string;
  accountStatus: 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
  customerName: string;
  serviceType: 'ELECTRIC' | 'GAS' | 'WATER';
  serviceAddress: string;
  balance: {
    currentDue: number;
    pastDue: number;
    totalDue: number;
    currency: string;
  };
  nextDueDate: string;
  paperlessBilling: boolean;
  lastPayment: {
    amount: number;
    date: string;
  };
  alerts: Array<{
    type: 'INFO' | 'WARNING' | 'ERROR';
    message: string;
  }>;
}

export interface ValidateEnrollResponse {
  accountNumber: string;
  enrollmentType: 'PAPERLESS' | 'SERVICE_REQUEST' | 'MOVE';
  isEligible: boolean;
  ineligibilityReasons: string[];
}

// Billing
export interface Bill {
  billId: string;
  billNumber: string;
  billDate: string;
  dueDate: string;
  amountDue: number;
  amountPaid: number;
  status: 'PAID' | 'UNPAID' | 'OVERDUE';
  pdfUrl?: string;
}

export interface BillsResponse {
  bills: Bill[];
  pagination: {
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  };
  summary: {
    totalBilled: number;
    totalPaid: number;
    outstandingBalance: number;
  };
}

export interface ConsumptionRecord {
  periodStart: string;
  periodEnd: string;
  label: string;
  usageAmount: number;
  unit: string;
  cost: number;
  priorYearUsage?: number;
}

export interface ConsumptionResponse {
  accountNumber: string;
  granularity: 'DAILY' | 'MONTHLY' | 'YEARLY';
  unit: string;
  records: ConsumptionRecord[];
  statistics: {
    averageMonthly: number;
    peakMonth: string;
    peakUsage: number;
    lowestMonth: string;
    lowestUsage: number;
    ytdTotal: number;
  };
}

// Services
export interface ServiceDetails {
  serviceId: string;
  serviceType: 'ELECTRIC' | 'GAS' | 'WATER';
  status: 'ACTIVE' | 'SUSPENDED' | 'DISCONNECTED';
  ratePlanCode: string;
  ratePlanName: string;
  serviceStartDate: string;
  premiseNumber: string;
  meterNumber: string;
  meterType: string;
  serviceAddress: string;
}

export interface ServiceOrder {
  orderId: string;
  orderType: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';
  scheduledDate?: string;
  completedDate?: string;
  createdAt: string;
  timeline?: Array<{
    status: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }>;
}

export interface ServiceOrdersResponse {
  orders: ServiceOrder[];
  pagination: {
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  };
}

export interface ServiceRequestPayload {
  requestType: 'OUTAGE_REPORT' | 'METER_ISSUE' | 'NEW_CONNECTION' | 'GENERAL_INQUIRY';
  description: string;
  preferredDate?: string;
  preferredTimeSlot?: 'MORNING' | 'AFTERNOON' | 'EVENING';
}

export interface MoveRequestPayload {
  moveType: 'MOVE_IN' | 'MOVE_OUT';
  moveDate: string;
  newAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  forwardingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  requestFinalMeterReading: boolean;
}

// Profile
export interface BusinessPartner {
  firstName: string;
  lastName: string;
  preferredLanguage: string;
}

export interface EmailUpdatePayload {
  newEmail: string;
  verificationCode?: string;
}

export interface PhoneUpdatePayload {
  phoneType: 'MOBILE' | 'HOME' | 'WORK';
  newPhoneNumber: string;
  smsOptIn: boolean;
}

export interface AddressUpdatePayload {
  addressType: 'BILLING' | 'SERVICE';
  newAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  effectiveDate: string;
}

export interface PaperBillUpdatePayload {
  paperBillEnabled: boolean;
  consentAcknowledged: boolean;
}

// API Meta
export interface ApiMeta {
  requestId: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: ApiMeta;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      code: string;
      message: string;
    }>;
    requestId: string;
    timestamp: string;
  };
}
