import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTransactionsQuery } from '../features/api/apiSlice';
import { useGetTransactions } from '../Hooks/useGetTransactions';
import AddModal from './AddModal';
import Transaction from './Transaction';
import TransactionsHeader from './TransactionsHeader';


const Transactions = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(true);
    const { searchedText, dataSorted, minRange, maxRange, type: typedFilter, category: filterCategory } = useSelector(state => state.filter)

    // data for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);


    let queryString = `_page=${currentPage}&_limit=${postsPerPage}&`;



    if (typedFilter.length > 0) {
        queryString += `${typedFilter.length > 0 && typedFilter.map(t => `type=${t}`).join('&') + '&'}`
    }
    if (filterCategory.length > 0) {
        queryString += `${filterCategory.length > 0 && filterCategory.map(c => `category=${c}`).join('&') + '&'}`
    }
    if(searchedText){
        queryString+=`&descriptions_like=${searchedText+'&'}`
    }
    

    const { data: transactions, isError, isLoading, error } = useGetTransactionsQuery(queryString) || {};
    const {transactions:t_length} =useGetTransactions() || {};
    

    // get total page
    let totalPage= 0;
    totalPage = Math.ceil(t_length?.length / postsPerPage);

 
    const filterByMinValue = (val) => {
        if (!minRange) {
            return val;
        } else if (minRange > 0) {
            return val.amount >= minRange
        }
    }
    const filterByMaxValue = (val) => {
        if (!maxRange) {
            return val;
        } else if (maxRange > minRange) {
            return val.amount <= maxRange
        }
    }
    const dataSort = (a, b) => dataSorted ? -1 : 1;

    


    // decide what to render
    let content = null;
    if (isLoading) content = <div>Loading...</div>
    if (!isLoading && isError) content = <div className='text-red-600 border w-full mt-3 text-center py-3 rounded-md'>{error}</div>
    if (!isLoading && !isError && transactions?.length === 0) content = <div className='border w-full mt-3 text-center py-3 rounded-md'>No Transaction Found</div>
    if (!isLoading && !isError && transactions?.length > 0) content =
        [...transactions]
            ?.reverse()
            ?.sort(dataSort)
            ?.filter(filterByMinValue)
            ?.filter(filterByMaxValue)
            ?.map(transaction => <Transaction key={transaction?.id} transaction={transaction} setIsAddModalOpen={setIsAddModalOpen} />)


    return (
        <div >
            <TransactionsHeader setIsAddModalOpen={setIsAddModalOpen} currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage}/>
            <div className='max-h-[500px] overflow-y-auto'>
                {content?.length === 0 ?
                    <div className='border w-full mt-3 text-center py-3 rounded-md'>No Transaction Found</div> : content 

                }
            </div>

            {isAddModalOpen && <AddModal setIsAddModalOpen={setIsAddModalOpen} />}

        </div>
    );
};

export default Transactions;