import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteTransactionMutation, useUpdateTransactionMutation } from '../features/api/apiSlice';
import { updateId } from '../features/filterSlice/filterSlice';


const Transaction = ({ transaction, setIsUpdateModalOpen }) => {
    const { id, type, category, amount, descriptions } = transaction || {};
    const style = type === 'income' ? `text-green-600 font-semibold` : 'text-red-600 font-semibold';
    const [deleteTransaction, { isLoading, isError, error }] = useDeleteTransactionMutation();
    const [editMode, setEditMode] = useState(false);
    const [UpdateTransaction, { isLoading: updateLoading, isError: updateError, error: updateErrorMessage, isSuccess }] = useUpdateTransactionMutation()

    const handleDelete = () => {
        deleteTransaction(id);
    }

    // form data
    const [updateType, setType] = useState(type);
    const [updateCategory, setCategory] = useState(category);
    const [updateAmount, setAmount] = useState(amount);
    const [updateDescriptions, setDescriptions] = useState(descriptions);

    const handleEdit = () => {
        const data = {
            type: updateType,
            category: updateCategory,
            amount: updateAmount,
            descriptions: updateDescriptions
        }
        UpdateTransaction({ id, data })
    }
    useEffect(() => {
        if (isSuccess) {
            setEditMode(false)
        }
    }, [isSuccess])



    const handleEditMode = () => {
        setEditMode(true);
    }


    // decide what to render based on edit mode
    const descriptionsItem = editMode ? <input onChange={e => setDescriptions(e.target.value)} type="text" placeholder="Type here" value={updateDescriptions} className="input input-bordered input-sm max-w-xs !outline-none " /> : descriptions;

    const categoryItem = editMode ?
        <select onChange={e => setCategory(e.target.value)} className="select select-bordered select-sm max-w-xs !outline-none">
            <option hidden></option>
            <option value={'food'} selected={updateCategory === 'food'}>Food</option>
            <option value={'travel'} selected={updateCategory === 'travel'}>Travel</option>
            <option value={'salary'} selected={updateCategory === 'salary'}>Salary</option>
            <option value={'utilities'} selected={updateCategory === 'utilities'}>Utilities</option>
            <option value={'medical'} selected={updateCategory === 'medical'}>Medical</option>
            <option value={'personal'} selected={updateCategory === 'personal'}>Personal</option>
        </select> : category

    const amountItem = editMode ?
        <input onChange={e => setAmount(e.target.value)} value={updateAmount} type="text" placeholder="Type here" className="input input-bordered input-sm max-w-xs !outline-none" /> : amount;

    const expenseType =
        <div className='mt-2 inline'>
            <div className='flex gap-x-3'>
                <div className='flex items-center'>
                    <input onChange={e => setType('income')} value={updateType} type="radio" name={id} className="radio checked:bg-black-500 h-4 w-4 mr-1 !outline-none" checked={updateType !== 'expense'} /><span>Income</span>
                </div>
                <div className='flex items-center'>
                    <input onChange={e => setType('expense')} value={updateType} type="radio" name={id} className="radio checked:bg-black-500  h-4 w-4 mr-1 !outline-none" checked={updateType === 'expense'} /> <span>Expense</span>
                </div>
            </div>
        </div>



    return (
        <div className={`border ${type === 'income' ? 'border-green-400' : 'border-red-400'} rounded-md p-2 mt-2 flex justify-between items-center`}>

            <div className='w-[90%]'>
                <p><span className='font-semibold inline !text-justify'>Descriptions: </span> {descriptionsItem}</p>

                <p><span className='font-semibold'>Category: </span> {categoryItem}</p>

                <p><span className='font-semibold'>Amount: </span>
                    {
                        editMode ?
                            <span>{amountItem}</span>
                            :
                            <span className={`${style}`}>{type === 'income' ? '+' : '-'} {amountItem}</span>

                    }
                </p>

                {
                    editMode &&
                    <p className='flex items-center justify-start '>
                        <span className='font-semibold'>Type:  </span>
                        <span className='mt-1 ml-1'>{expenseType}</span>
                    </p>


                }

            </div>

            <div className='flex items-center gap-x-2'>

                {
                    editMode ?
                        <>
                            <button disabled={updateLoading} onClick={handleEdit}>
                                <img className='h-8 w-8 cursor-pointer' src="https://img.icons8.com/color/48/000000/checked-2--v1.png" alt="" srcSet="" />
                            </button>
                            <button onClick={() => setEditMode(false)}>
                                <img className='h-8 w-8 cursor-pointer' src="https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png" alt="" srcSet="" />
                            </button>
                        </> :

                        <>
                            <button disabled={isLoading} onClick={() => handleEditMode(true)}>
                                <img className='h-6 w-6 cursor-pointer' src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/48/000000/external-edit-user-interface-tanah-basah-detailed-outline-tanah-basah.png" alt="" srcSet="" />
                            </button>

                            <button disabled={isLoading} onClick={handleDelete}>
                                <img className='h-6 w-6 cursor-pointer' src="https://img.icons8.com/wired/64/000000/filled-trash.png" alt="" srcSet="" />
                            </button>
                        </>


                }


            </div>

        </div >
    );
};

export default Transaction;