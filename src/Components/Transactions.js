import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTransactionsQuery } from '../features/api/apiSlice';
import AddModal from './AddModal';
import Transaction from './Transaction';
import TransactionsHeader from './TransactionsHeader';
import UpdateModal from './UpdateModal';


const Transactions = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(true);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(true);
    const { data: transactions, isError, isLoading, error } = useGetTransactionsQuery() || {};

    const { searchedText,dataSorted } = useSelector(state => state.filter)

    // filter data
    const searchFilter = (val) => {
        if (!searchedText) {
            return val;
        } else if (val.descriptions.toLowerCase().includes(searchedText.toLowerCase())
        ) {
            return val;
        }
    }

    const dataSort=(a, b) =>  dataSorted ? -1 : 1


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
            .map(transaction => <Transaction key={transaction?.id} transaction={transaction} setIsAddModalOpen={setIsAddModalOpen} />)


    return (
        <div >
            <TransactionsHeader setIsAddModalOpen={setIsAddModalOpen} />
            <div className='max-h-[500px] overflow-y-auto'>
                {content}
            </div>

            {isAddModalOpen && <AddModal setIsAddModalOpen={setIsAddModalOpen} />}
            {/* {isUpdateModalOpen && <UpdateModal setIsUpdateModalOpen={setIsUpdateModalOpen}/>} */}

        </div>
    );
};

export default Transactions;