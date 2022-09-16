import React from 'react';
import { useGetTransactionsQuery } from '../features/api/apiSlice';

const Header = () => {
    const {data:transactions} =useGetTransactionsQuery();

    let income=0;
    let expense=0;
    transactions?.map(transaction=> {
        if(transaction?.type==='income'){
            
            income=income+(parseInt(transaction.amount));
        }else{
            expense+=parseInt(transaction.amount)
        }
    })
    return (
        <div className=' border rounded-md py-2 mt-2 sticky top-2 z-100 '>
            <h2 className='text-center text-xl font-semibold my-1'>Personal Expense Tracker</h2>
            <div className='flex justify-center items-center gap-x-9 text-lg font-semibold'>
                <h3 className='text-green-600'>Income: {income ? income : 0}</h3>
                <h3 className='text-red-600'>Expense: {expense ? expense : 0}</h3>
            </div>
        </div>
    );
};

export default Header;