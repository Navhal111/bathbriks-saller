import { TransactionType } from "@/kit/models/Transaction";

export const transactionsData: TransactionType[] = [
    {
        id: 0o0265633,
        amount: 200,
        transactionType: 'bank',
        status: 'completed',
        date: '2025-10-01T10:00:00Z',
        createdAt: '2025-09-30T09:00:00Z',
        updatedAt: '2025-10-01T11:00:00Z',
    },
    {
        id: 0o0265634,
        amount: 150,
        transactionType: 'credit_card',
        status: 'pending',
        date: '2025-10-02T15:45:00Z',
        createdAt: '2025-10-01T14:30:00Z',
        updatedAt: '2025-10-02T16:00:00Z',
    },
    {
        id: 265635,
        amount: 300,
        transactionType: 'paypal',
        status: 'cancelled',
        date: '2025-09-28T08:20:00Z',
        createdAt: '2025-09-25T07:30:00Z',
        updatedAt: '2025-09-29T10:00:00Z',
    },
]