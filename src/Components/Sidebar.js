import React from 'react';
import Filter from './Filter';
import Transactions from './Transactions';

const Sidebar = () => {
    return (
        <div className=''>
            <div className="drawer drawer-mobile top-100">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content pr-0 pt-4">
                    {/* <!-- Page content here --> */}
                    <label htmlFor="my-drawer-2" className=" cursor-pointer drawer-button lg:hidden font-semibold">
                        <img className='inline' src={"https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/32/000000/external-hamburger-basic-ui-jumpicon-glyph-jumpicon-glyph-ayub-irawan-2.png"} alt="" srcset="" />Filters</label>
                    <Transactions/>

                    

                </div>
                <div className="drawer-side -z-100">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className=" pr-4 pt-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        
                        <Filter/>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;