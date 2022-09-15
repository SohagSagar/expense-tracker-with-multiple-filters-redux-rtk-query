import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTransactionsQuery } from '../features/api/apiSlice';
import AddModal from './AddModal';
import Transaction from './Transaction';
import TransactionsHeader from './TransactionsHeader';


const Transactions = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(true);
    const { searchedText, dataSorted, minRange, maxRange, type: typedFilter, category: filterCategory } = useSelector(state => state.filter)


    let queryString = '';
    if (typedFilter.length > 0) {
        queryString += `${typedFilter.length > 0 && typedFilter.map(t => `type=${t}`).join('&') + '&'}`
    }
    if (filterCategory.length > 0) {
        queryString += `${filterCategory.length > 0 && filterCategory.map(c => `category=${c}`).join('&') + '&'}`
    }

    const { data: transactions, isError, isLoading, error } = useGetTransactionsQuery(queryString) || {};


    // filter data
    const searchFilter = (val) => {
        if (!searchedText) {
            return val;
        } else if (val.descriptions.toLowerCase().includes(searchedText.toLowerCase())
        ) {
            return val;
        }
    }

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

    const dataSort = (a, b) => dataSorted ? 1 : -1


    // decide what to render
    let content = null;
    if (isLoading) content = <div>Loading...</div>
    if (!isLoading && isError) content = <div className='text-red-600 border w-full mt-3 text-center py-3 rounded-md'>{error}</div>
    if (!isLoading && !isError && transactions?.length === 0) content = <div className='border w-full mt-3 text-center py-3 rounded-md'>No Transaction Found</div>
    if (!isLoading && !isError && transactions?.length > 0) content =
        [...transactions]
            ?.reverse()
            ?.sort(dataSort)
            ?.filter(searchFilter)
            ?.filter(filterByMinValue)
            ?.filter(filterByMaxValue)
            ?.map(transaction => <Transaction key={transaction?.id} transaction={transaction} setIsAddModalOpen={setIsAddModalOpen} />)


    return (
        <div >
            <TransactionsHeader setIsAddModalOpen={setIsAddModalOpen} />
            <div className='max-h-[500px] overflow-y-auto'>
                {content?.length === 0 ?
                    <div className='border w-full mt-3 text-center py-3 rounded-md'>No Transaction Found</div> : content

                }
            </div>

            {isAddModalOpen && <AddModal setIsAddModalOpen={setIsAddModalOpen} />}
            {/* {isUpdateModalOpen && <UpdateModal setIsUpdateModalOpen={setIsUpdateModalOpen}/>} */}

        </div>
    );
};

export default Transactions;