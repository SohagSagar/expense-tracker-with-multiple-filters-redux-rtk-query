import { useGetTransactionsQuery } from "../features/api/apiSlice";


export const useGetTransactions = () =>{
    const { data: transactions, isLoading } = useGetTransactionsQuery();


    return {transactions, isLoading}
}