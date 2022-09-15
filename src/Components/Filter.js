import React from 'react';

const Filter = () => {
    return (
        <div className='border min-h-full rounded-md p-2 '>
            <h2 >Filter</h2><hr className='mb-2' />
            {/* range filter */}

            <h5>Range</h5>
            <div className='border rounded-md p-2 mt-1'>
                <div className='flex justify-between items-center mb-2'>
                    <p>Min: </p>
                    <input className='border outline-none rounded-md'></input>
                </div>
                <div className='flex justify-between items-center'>
                    <p>Max: </p>
                    <input className='border outline-none rounded-md'></input>
                </div>

            </div>


            {/* type */}
            <h5 className='mt-2'>Type</h5>
            <div className='border rounded-md p-2 mt-1 grid  gap-y-2'>
                <div className='flex items-center'>
                    <input type="checkbox" className="checkbox checkbox-xs"/>
                    <span className='ml-2'>Income</span>
                </div>
                <div className='flex items-center'>
                    <input type="checkbox" className="checkbox checkbox-xs"/>
                    <span className='ml-2'>Expense</span>
                </div>
            </div>


            {/* category */}
            <h5 className='mt-2'>Category</h5>
            <div className='border rounded-md p-2 mt-1 grid  gap-y-2'>
                <div className='flex items-center'>
                    <input type="checkbox" className="checkbox checkbox-xs"/>
                    <span className='ml-2'>Food</span>
                </div>
                <div className='flex items-center'>
                    <input type="checkbox" className="checkbox checkbox-xs"/>
                    <span className='ml-2'>Travel</span>
                </div>
                <div className='flex items-center'>
                    <input type="checkbox" className="checkbox checkbox-xs"/>
                    <span className='ml-2'>Salary</span>
                </div>
                <div className='flex items-center'>
                    <input type="checkbox" className="checkbox checkbox-xs"/>
                    <span className='ml-2'>Utilities</span>
                </div>
                <div className='flex items-center'>
                    <input type="checkbox" className="checkbox checkbox-xs"/>
                    <span className='ml-2'>Medical</span>
                </div>
                <div className='flex items-center'>
                    <input type="checkbox" className="checkbox checkbox-xs"/>
                    <span className='ml-2'>Personal</span>
                </div>
            </div>


        </div>
    );
};

export default Filter;