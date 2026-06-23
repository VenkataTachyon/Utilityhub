import type {
  AccountSummary,
  BillsResponse,
  ConsumptionResponse,
  ServiceDetails,
  ServiceOrdersResponse,
} from '@/types';

export const MOCK_ACCOUNT_NUMBER = 'ACC-001234';

export const mockAccountSummary: AccountSummary = {
  accountNumber: 'ACC-001234',
  accountStatus: 'ACTIVE',
  customerName: 'John Doe',
  serviceType: 'ELECTRIC',
  serviceAddress: '123 Main St, Springfield, IL 62701',
  balance: {
    currentDue: 142.50,
    pastDue: 0.00,
    totalDue: 142.50,
    currency: 'USD',
  },
  nextDueDate: '2026-07-15',
  paperlessBilling: true,
  lastPayment: {
    amount: 138.20,
    date: '2026-06-01',
  },
  alerts: [
    { type: 'INFO', message: 'Your June bill is ready to view. Amount due: $142.50 by July 15, 2026.' },
  ],
};

export const mockBillsResponse: BillsResponse = {
  bills: [
    { billId: 'BL-001', billNumber: 'INV-20260601', billDate: '2026-06-01', dueDate: '2026-06-20', amountDue: 142.50, amountPaid: 0, status: 'UNPAID' },
    { billId: 'BL-002', billNumber: 'INV-20260501', billDate: '2026-05-01', dueDate: '2026-05-20', amountDue: 138.20, amountPaid: 138.20, status: 'PAID' },
    { billId: 'BL-003', billNumber: 'INV-20260401', billDate: '2026-04-01', dueDate: '2026-04-20', amountDue: 155.80, amountPaid: 155.80, status: 'PAID' },
    { billId: 'BL-004', billNumber: 'INV-20260301', billDate: '2026-03-01', dueDate: '2026-03-20', amountDue: 178.60, amountPaid: 178.60, status: 'PAID' },
    { billId: 'BL-005', billNumber: 'INV-20260201', billDate: '2026-02-01', dueDate: '2026-02-20', amountDue: 192.40, amountPaid: 192.40, status: 'PAID' },
    { billId: 'BL-006', billNumber: 'INV-20260101', billDate: '2026-01-01', dueDate: '2026-01-20', amountDue: 184.80, amountPaid: 184.80, status: 'PAID' },
  ],
  pagination: { page: 1, pageSize: 12, totalRecords: 12, totalPages: 2 },
  summary: { totalBilled: 892.30, totalPaid: 749.80, outstandingBalance: 142.50 },
};

export const mockConsumptionResponse: ConsumptionResponse = {
  accountNumber: 'ACC-001234',
  granularity: 'MONTHLY',
  unit: 'kWh',
  records: [
    { periodStart: '2025-07-01', periodEnd: '2025-07-31', label: 'Jul 25', usageAmount: 812, unit: 'kWh', cost: 142, priorYearUsage: 780 },
    { periodStart: '2025-08-01', periodEnd: '2025-08-31', label: 'Aug 25', usageAmount: 790, unit: 'kWh', cost: 138, priorYearUsage: 760 },
    { periodStart: '2025-09-01', periodEnd: '2025-09-30', label: 'Sep 25', usageAmount: 710, unit: 'kWh', cost: 125, priorYearUsage: 680 },
    { periodStart: '2025-10-01', periodEnd: '2025-10-31', label: 'Oct 25', usageAmount: 620, unit: 'kWh', cost: 110, priorYearUsage: 590 },
    { periodStart: '2025-11-01', periodEnd: '2025-11-30', label: 'Nov 25', usageAmount: 580, unit: 'kWh', cost: 102, priorYearUsage: 550 },
    { periodStart: '2025-12-01', periodEnd: '2025-12-31', label: 'Dec 25', usageAmount: 650, unit: 'kWh', cost: 115, priorYearUsage: 620 },
    { periodStart: '2026-01-01', periodEnd: '2026-01-31', label: 'Jan 26', usageAmount: 720, unit: 'kWh', cost: 128, priorYearUsage: 690 },
    { periodStart: '2026-02-01', periodEnd: '2026-02-28', label: 'Feb 26', usageAmount: 700, unit: 'kWh', cost: 122, priorYearUsage: 670 },
    { periodStart: '2026-03-01', periodEnd: '2026-03-31', label: 'Mar 26', usageAmount: 560, unit: 'kWh', cost: 98, priorYearUsage: 530 },
    { periodStart: '2026-04-01', periodEnd: '2026-04-30', label: 'Apr 26', usageAmount: 498, unit: 'kWh', cost: 88, priorYearUsage: 470 },
    { periodStart: '2026-05-01', periodEnd: '2026-05-31', label: 'May 26', usageAmount: 570, unit: 'kWh', cost: 101, priorYearUsage: 540 },
    { periodStart: '2026-06-01', periodEnd: '2026-06-30', label: 'Jun 26', usageAmount: 630, unit: 'kWh', cost: 113, priorYearUsage: 600 },
  ],
  statistics: {
    averageMonthly: 648,
    peakMonth: 'Jul 25',
    peakUsage: 812,
    lowestMonth: 'Apr 26',
    lowestUsage: 498,
    ytdTotal: 3890,
  },
};

export const mockServiceDetails: ServiceDetails = {
  serviceId: 'SVC-001',
  serviceType: 'ELECTRIC',
  status: 'ACTIVE',
  ratePlanCode: 'RS-1',
  ratePlanName: 'Residential Standard (RS-1)',
  serviceStartDate: '2023-03-15',
  premiseNumber: 'PRM-001234',
  meterNumber: 'MTR-88291034',
  meterType: 'Smart AMI',
  serviceAddress: '123 Main Street, Springfield, IL 62701',
};

export const mockServiceOrders: ServiceOrdersResponse = {
  orders: [
    {
      orderId: 'ORD-2026001',
      orderType: 'General Inquiry',
      description: 'Questions about billing cycle',
      status: 'COMPLETED',
      priority: 'LOW',
      scheduledDate: '2026-06-05',
      completedDate: '2026-06-05',
      createdAt: '2026-06-03T09:00:00Z',
      timeline: [
        { status: 'Order created', description: '', timestamp: '2026-06-03T09:00:00Z', completed: true },
        { status: 'Assigned to support agent', description: '', timestamp: '2026-06-03T10:00:00Z', completed: true },
        { status: 'Resolved', description: '', timestamp: '2026-06-05T11:00:00Z', completed: true },
      ],
    },
    {
      orderId: 'ORD-2026002',
      orderType: 'Meter Issue',
      description: 'Smart meter reading discrepancy',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      scheduledDate: '2026-06-18',
      createdAt: '2026-06-15T09:32:00Z',
      timeline: [
        { status: 'Order created', description: '', timestamp: '2026-06-15T09:32:00Z', completed: true },
        { status: 'Assigned to field technician', description: '', timestamp: '2026-06-15T14:14:00Z', completed: true },
        { status: 'In progress — technician on site', description: '', timestamp: '2026-06-18T10:00:00Z', completed: false },
        { status: 'Awaiting completion', description: 'Est. Jun 19, 2026', timestamp: '', completed: false },
      ],
    },
    {
      orderId: 'ORD-2026003',
      orderType: 'Outage Report',
      description: 'Power outage on street block',
      status: 'PENDING',
      priority: 'CRITICAL',
      scheduledDate: '2026-06-23',
      createdAt: '2026-06-20T08:00:00Z',
    },
    {
      orderId: 'ORD-2026004',
      orderType: 'General Inquiry',
      description: 'Rate plan comparison request',
      status: 'COMPLETED',
      priority: 'LOW',
      scheduledDate: '2026-04-10',
      completedDate: '2026-04-11',
      createdAt: '2026-04-08T09:00:00Z',
    },
    {
      orderId: 'ORD-2026005',
      orderType: 'New Connection',
      description: 'Garage sub-panel connection',
      status: 'CANCELLED',
      priority: 'NORMAL',
      scheduledDate: '2026-02-20',
      createdAt: '2026-02-15T09:00:00Z',
    },
  ],
  pagination: { page: 1, pageSize: 10, totalRecords: 5, totalPages: 1 },
};
