import React, { useEffect, useState } from 'react';
import sortImg from '../resourses/icons8-sort-58.png'
import plusImg from '../resourses/icons8-plus-64.png';
import { useDispatch, useSelector } from 'react-redux';
import { search, sorted } from '../features/filterSlice/filterSlice';

const TransactionsHeader = ({ setIsAddModalOpen, currentPage, totalPage, setCurrentPage }) => {
    const { searchedText } = useSelector(state => state.filter)
    const [searchInput, setSearchInput] = useState(searchedText);
    const [isSorted, setIsSorted] = useState(false);
    const dispatch = useDispatch();

    function debounce(fn, delay) {
        let timer;
        return (() => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(), delay);
        })();

    };

    // usage
    function searched() {
        dispatch(search(searchInput))

    };

    useEffect(() => {
        debounce(searched, 1500);
    }, [searchInput]);


    const handleSort = () => {
        setIsSorted(pre => !pre)
    }
    useEffect(() => {
        dispatch(sorted(isSorted))
    }, [isSorted, dispatch])

    useEffect(() => {
        if (!searchedText) {
            setSearchInput('')
        }
    }, [searchedText])

    console.log(currentPage,totalPage);
    
    return (
        <div className='flex justify-between gap-x-2 '>
            <div className='flex  gap-x-2'>
                <div>
                    <input onChange={e => setSearchInput(e.target.value)} value={searchInput} type="text" placeholder="Search Transactions" className="input input-bordered xs:input-sm lg:input-md w-full lg:max-w-xs xs:max-w-[140px] !outline-none" />
                </div>

                <div onClick={handleSort}>
                    <button className="btn lg:btn-md xs:btn-sm  "><img className='h-6 w-6 xs:h-4 xs:w-4' alt='' src={sortImg}></img></button>
                </div>
                
                <div className="btn-group ">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="btn xs:btn-sm lg:btn-md xs:w-3">«</button>
                    <button className="btn lg:btn-md xs:btn-sm xs:w-10 lg:w-20 normal-case lg:text-md xs:text-[12px]">Page {currentPage}/{totalPage || 1}</button>
                    <button disabled={currentPage === totalPage || 1} onClick={() => setCurrentPage(currentPage + 1)} className="btn xs:btn-sm lg:btn-md xs:w-3">»</button>
                </div>

            </div>


            <div onClick={() => setIsAddModalOpen(pre => true)}>
                <label  htmlFor="add-modal" className="btn modal-button lg:btn-md xs:btn-sm "><img className='lg:h-6 lg:w-6 xs:h-4 xs:w-4' alt='' src={plusImg}></img></label>
            </div>

        </div>
    );
};

export default TransactionsHeader;