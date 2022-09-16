import React, { useEffect, useState } from 'react';
import sortImg from '../resourses/icons8-sort-58.png'
import plusImg from '../resourses/icons8-plus-64.png';
import { useDispatch, useSelector } from 'react-redux';
import { search, sorted } from '../features/filterSlice/filterSlice';

const TransactionsHeader = ({ setIsAddModalOpen,currentPage,totalPage,setCurrentPage }) => {
    const {searchedText}=useSelector(state=>state.filter)
    const [searchInput, setSearchInput] = useState(searchedText);
    const [isSorted,setIsSorted]=useState(false);
    const dispatch=useDispatch();

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


    const handleSort = () =>{
        setIsSorted(pre=>!pre)
    }
    useEffect(()=>{
        dispatch(sorted(isSorted))
    },[isSorted,dispatch])

    useEffect(()=>{
        if(!searchedText ){
            setSearchInput('')
        }
    },[searchedText])


    
    return (
        <div className='flex justify-between gap-x-2 '>
            <div className='flex  gap-x-2'>
                <div>
                    <input onChange={e => setSearchInput(e.target.value)} value={searchInput} type="text" placeholder="Search Transactions" className="input input-bordered w-full lg:max-w-xs xs:max-w-[150px] xs:input-sm !outline-none " />
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative left-[280px] top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> */}
                </div>

                <div onClick={handleSort}>
                    <button  className="btn btn-square xs:btn-sm xs:w-9"><img className='h-6 w-6 xs:h-4 xs:w-4' alt='' src={sortImg}></img></button>

                </div>

                <div className="btn-group ">
                    <button disabled={currentPage===1} onClick={()=>setCurrentPage(currentPage-1)} className="btn xs:btn-sm xs:w-3">«</button>
                    <button className="btn xs:btn-sm xs:w-10 normal-case xs:text-[12px]">Page {currentPage}/{totalPage || 1}</button>
                    <button disabled={currentPage===totalPage} onClick={()=>setCurrentPage(currentPage+1)} className="btn xs:btn-sm xs:w-3">»</button>
                </div>

            </div>

            <div>
                <label onClick={() => setIsAddModalOpen(pre => true)} htmlFor="add-modal" className="btn btn-square modal-button xs:btn-sm xs:w-9"><img className='h-6 w-6 xs:h-4 xs:w-4' alt='' src={plusImg}></img></label>
            </div>

        </div>
    );
};

export default TransactionsHeader;