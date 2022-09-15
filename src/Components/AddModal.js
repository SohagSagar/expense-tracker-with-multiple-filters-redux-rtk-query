import React, { useEffect, useState } from 'react';
import { useAddTransactionMutation } from '../features/api/apiSlice';


const AddModal = ({ setIsAddModalOpen }) => {
    const [addTransaction,{isLoading,isError,isSuccess}] =useAddTransactionMutation()
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const reset = () => {
        setType('')
        setCategory('')
        setAmount('')
        setDescriptions('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            type,
            category,
            amount,
            descriptions
        }
        addTransaction(data)
        
        reset();

    }
    useEffect(()=>{
        if(isSuccess){
            setIsAddModalOpen(pre => false);
        }
    },[isSuccess,setIsAddModalOpen])
    return (
        <div className=''>
            <input type="checkbox" id="add-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="add-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-center">Add Transaction</h3><hr className=' mb-3' />
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-center gap-x-3'>
                            <input onChange={e => setType(e.target.value)} value={'income'} type="radio" name="radio-6" className="radio checked:bg-black-500" checked={type === 'income'} />Income
                            <input onChange={e => setType(e.target.value)} value={'expense'} type="radio" name="radio-6" className="radio checked:bg-black-500" checked={type === 'expense'} /> Expense
                        </div>

                        <div className="form-control w-full max-w-xs mx-auto  ">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select onChange={e => setCategory(e.target.value)} className="select select-bordered">
                                <option hidden></option>
                                <option value={'food'} >Food</option>
                                <option value={'travel'}>Travel</option>
                                <option value={'salary'}>Salary</option>
                                <option value={'utilities'}>Utilities</option>
                                <option value={'medical'}>Medical</option>
                                <option value={'personal'}>Personal</option>
                            </select>

                        </div>

                        <div className="form-control w-full max-w-xs mx-auto  ">
                            <label className="label">
                                <span className="label-text">Amount</span>
                            </label>
                            <input onChange={e => setAmount(e.target.value)} value={amount} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs  " />
                        </div>

                        <div className="form-control w-full max-w-xs mx-auto  ">
                            <label className="label">
                                <span className="label-text">Descriptions</span>
                            </label>
                            <textarea onChange={e => setDescriptions(e.target.value)} value={descriptions} className="textarea textarea-bordered" placeholder="Bio"></textarea>
                        </div>



                        <div className='max-w-xs mx-auto mt-4'>
                            <button disabled={isLoading} type='submit' className="btn w-[48%] mx-1">{isLoading ? 'Loading' : 'Add'}</button>
                            <button onClick={()=>setIsAddModalOpen(pre => false)} className="btn  btn-error w-[48%] ">Close</button>
                        </div>







                    </form>
                </div>
            </div >
        </div >

    );
};

export default AddModal;