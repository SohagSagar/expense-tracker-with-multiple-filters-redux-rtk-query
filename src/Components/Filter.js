import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryRemoved, categorySelected, maxValue, minValue, typedRemoved, typedSelected } from '../features/filterSlice/filterSlice';

const Filter = () => {
    const { minRange, maxRange, type: filterType,category:filterCategory } = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const [minInput, setMinInput] = useState(minRange);
    const [maxInput, setMaxInput] = useState(maxRange);

    

    useEffect(() => {
        if (minInput > 0) {
            dispatch(minValue(+minInput))
        } if (!minInput) {
            dispatch(minValue(0))
        }
    }, [minInput, dispatch])

    useEffect(() => {
        if (maxInput > 0) {
            dispatch(maxValue(+maxInput))
        } if (!maxInput) {
            dispatch(maxValue(0))
        }
    }, [maxInput, dispatch])


    const typeIncome = (type) => {
        if (filterType.includes(type)) {
            dispatch(typedRemoved(type))

        } else {
            dispatch(typedSelected(type));
        }

    }
    const category = (category) =>{
        if(filterCategory.includes(category)){
            dispatch(categoryRemoved(category))
        }else{
            dispatch(categorySelected(category))
        }
    }


    return (
        <div className='border min-h-full rounded-md p-2 '>
            <h2 >Filter</h2><hr className='mb-2' />
            {/* range filter */}

            <h5>Range</h5>
            <div className='border rounded-md p-2 mt-1'>
                <div className='flex justify-between items-center mb-2'>
                    <p>Min: </p>
                    <input onChange={e => setMinInput(e.target.value)} value={minInput ? minInput : ''} className='border outline-none rounded-md p-1'></input>
                </div>
                <div className='flex justify-between items-center'>
                    <p>Max: </p>
                    <input onChange={e => setMaxInput(e.target.value)} value={maxInput ? maxInput : ''} className='border outline-none rounded-md p-1'></input>
                </div>

            </div>


            {/* type */}
            <h5 className='mt-2'>Type</h5>

            <div className='border rounded-md p-2 mt-1 grid  gap-y-2'>
                <div onClick={() => typeIncome('income')} className='flex items-center'>

                    <li className={`h-4 w-4 border border-gray-500 hover:border-gray-400 rounded-full cursor-pointer ${filterType.includes('income') && 'bg-gray-400'}  `}
                    ></li>

                    <span className='ml-2'>Income</span>
                </div>
                <div onClick={() => typeIncome('expense')} className='flex items-center'>

                    <li className={`h-4 w-4 border border-gray-500 hover:border-gray-400 rounded-full cursor-pointer  ${filterType.includes('expense') && 'bg-gray-400'} `}
                    ></li>

                    <span className='ml-2'>Expense</span>
                </div>
            </div>


            {/* category */}
            <h5 className='mt-2'>Category</h5>
            <div className='border rounded-md p-2 mt-1 grid  gap-y-2'>

                <div onClick={() => category('food')} className='flex items-center'>
                    <li className={`h-4 w-4 border border-gray-500 hover:border-gray-400 rounded-full cursor-pointer ${filterCategory.includes('food') && 'bg-gray-400'}  `}
                    ></li>
                    <span className='ml-2'>Food</span>
                </div>

                <div onClick={() => category('travel')} className='flex items-center'>
                    <li className={`h-4 w-4 border border-gray-500 hover:border-gray-400 rounded-full cursor-pointer ${filterCategory.includes('travel') && 'bg-gray-400'}  `}
                    ></li>
                    <span className='ml-2'>Travel</span>
                </div>

                <div onClick={() => category('salary')} className='flex items-center'>
                    <li className={`h-4 w-4 border border-gray-500 hover:border-gray-400 rounded-full cursor-pointer ${filterCategory.includes('salary') && 'bg-gray-400'}  `}
                    ></li>
                    <span className='ml-2'>Salary</span>
                </div>

                <div onClick={() => category('utilities')} className='flex items-center'>
                    <li className={`h-4 w-4 border border-gray-500 hover:border-gray-400 rounded-full cursor-pointer ${filterCategory.includes('utilities') && 'bg-gray-400'}  `}
                    ></li>
                    <span className='ml-2'>Utilities</span>
                </div>

                <div onClick={() => category('medical')} className='flex items-center'>
                    <li className={`h-4 w-4 border border-gray-500 hover:border-gray-400 rounded-full cursor-pointer ${filterCategory.includes('medical') && 'bg-gray-400'}  `}
                    ></li>
                    <span className='ml-2'>Medical</span>
                </div>

                <div onClick={() => category('personal')} className='flex items-center'>
                    <li className={`h-4 w-4 border border-gray-500 hover:border-gray-400 rounded-full cursor-pointer ${filterCategory.includes('personal') && 'bg-gray-400'}  `}
                    ></li>
                    <span className='ml-2'>Personal</span>
                </div>

            </div>


        </div>
    );
};

export default Filter;