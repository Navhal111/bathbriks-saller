import BaseModel from "./BaseModel";

export interface WalletType extends BaseModel {
    amount: number
    transactionType: string
    status: string
    date: string
}