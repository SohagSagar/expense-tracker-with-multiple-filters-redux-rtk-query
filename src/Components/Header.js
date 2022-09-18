import React from 'react';
import { useGetTransactionsQuery } from '../features/api/apiSlice';
import { useGetTransactions } from '../Hooks/useGetTransactions';
import { numberWithCommas } from '../utility/thousandSeperator';

const Header = () => {
    const {transactions, isLoading} =useGetTransactions()

    let income = 0;
    let expense = 0;
    transactions?.map(transaction => {
        if (transaction?.type === 'income') {

            income = income + (parseInt(transaction.amount));
        } else {
            expense += parseInt(transaction.amount)
        }
    })
    const newIncome = numberWithCommas(income);
    const newExpense = numberWithCommas(expense);

    // decide what to render
    let content = null;
    if (isLoading) content = <div>Loading...</div>
    if (!isLoading && transactions.length >= 0) content = <>
        <h3 className='text-green-600'>Income: {newIncome ? newIncome : 0}</h3>
        <h3 className='text-red-600'>Expense: {newExpense ? newExpense : 0}</h3>
    </>

    return (
        <div className=' border rounded-md py-2 mt-2  top-2 '>
            <h2 className='text-center text-xl font-semibold my-1'>Personal Expense Tracker</h2>
            <div className='flex justify-center items-center gap-x-9 text-lg font-semibold'>
                {
                    content
                }


            </div>
        </div>
    );
};

export default Header;