import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTransactionQuery, useUpdateTransactionMutation } from '../features/api/apiSlice';

const UpdateModal = ({ setIsUpdateModalOpen }) => {
    const [UpdateTransaction, { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess, error: updateErrorMessage }] = useUpdateTransactionMutation();
    const { updateTransactionID: id } = useSelector(state => state.filter);
    const [isUpdateId, setIsupdateId] = useState(true)
    const { data:transaction , isLoading, isError, error } = useGetTransactionQuery(1, {
        skip: isUpdateId
    });


    useEffect(() => {
        if (transaction.id) {
            setIsupdateId(false)
        }
    }, [transaction])

    // const transaction={

    // }

    // const { type: updateType, category: updateCategory, amount: updateAmount, descriptions: updateDescriptions } = transaction;


    

    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [descriptions, setDescriptions] = useState('');




    // reset form
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
        UpdateTransaction({ id, data })
        reset();

    }

    useEffect(() => {
        if (updateSuccess) {
            setIsUpdateModalOpen(pre => false);
        }
    }, [updateSuccess, setIsUpdateModalOpen]);

    // decide what to render

    let content = null;
    if (isLoading) content = <div>Loading...</div>
    if (!isLoading && isError) content = <div>{error}</div>
    if (!isLoading && isError && transaction.length === 0) content=<div>Something went wrong</div>
    if (!isLoading && isError && transaction.length > 0) 
        <div className=''>
            <input type="checkbox" id="update-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="update-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
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
                                <option value={'food'} checked={category === 'food'}>Food</option>
                                <option value={'travel'} checked={category === 'travel'}>Travel</option>
                                <option value={'salary'} checked={category === 'salary'}>Salary</option>
                                <option value={'utilities'} checked={category === 'utilities'}>Utilities</option>
                                <option value={'medical'} checked={category === 'medical'}>Medical</option>
                                <option value={'personal'} checked={category === 'personal'}>Personal</option>
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
                            <button disabled={updateLoading} type='submit' className="btn w-[48%] mx-1">{updateLoading ? 'Loading' : 'Update'}</button>
                            <button onClick={() => setIsUpdateModalOpen(pre => false)} className="btn  btn-error w-[48%] ">Close</button>
                        </div>







                    </form>
                </div>
            </div >
        </div >


    return (

        {content}
    );
};

export default UpdateModal;