import React, { useEffect, useState } from 'react';
import sortImg from '../resourses/icons8-sort-58.png'
import plusImg from '../resourses/icons8-plus-64.png';
import { useDispatch, useSelector } from 'react-redux';
import { search, sorted } from '../features/filterSlice/filterSlice';

const TransactionsHeader = ({ setIsAddModalOpen }) => {
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



    
    return (
        <div className='flex justify-between gap-x-2 '>
            <div className='flex  gap-x-2'>
                <div>
                    <input onChange={e => setSearchInput(e.target.value)} type="text" placeholder="Search Transactions" className="input input-bordered w-full max-w-xs !outline-none " />
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative left-[280px] top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> */}
                </div>

                <div onClick={handleSort}>
                    <button  className="btn btn-square "><img className='h-6 w-6' alt='' src={sortImg}></img></button>

                </div>

                <div className="btn-group ">
                    <button className="btn">«</button>
                    <button className="btn">Page 22</button>
                    <button className="btn">»</button>
                </div>

            </div>

            <div>
                <label onClick={() => setIsAddModalOpen(pre => true)} htmlFor="add-modal" className="btn btn-square modal-button"><img className='h-6 w-6' alt='' src={plusImg}></img></label>
            </div>

        </div>
    );
};

export default TransactionsHeader;