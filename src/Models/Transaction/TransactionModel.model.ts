import { ExpenseTypes, TransactionMode } from "./expenseTypes.model"

export interface TransactionListModel {
    id: number,
    title: string,
    description: string,
    amount: number,
    transactionType: ExpenseTypes,
    dateCreated: Date | any,
    category: Category,
    mode: TransactionMode
}

interface Category {
    id: number,
    name: string,
    icon: string
}