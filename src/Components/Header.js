import React from 'react';

const Header = () => {
    return (
        <div className=' border rounded-md py-2 mt-2 sticky top-2 z-100 '>
            <h2 className='text-center text-xl font-semibold my-1'>Personal Expense Tracker</h2>
            <div className='flex justify-center items-center gap-x-9 text-lg'>
                <h3>Income:</h3>
                <h3>Expense:</h3>
            </div>
        </div>
    );
};

export default Header;