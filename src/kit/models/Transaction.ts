import BaseModel from "./BaseModel";

export interface TransactionType extends BaseModel {
    amount: number
    transactionType: string
    status: string
    date: string
}