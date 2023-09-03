import { TransactionListModel } from "./TransactionModel.model";

export interface YearlyTransactionList {
    monthNumber: number,
    expense: number,
    income: number,
    transactions : TransactionListModel[]
}


