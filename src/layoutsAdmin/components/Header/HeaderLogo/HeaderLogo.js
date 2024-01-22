import { useState } from 'react';
import { BsList } from 'react-icons/bs';

import logo from '~/assets/images/logo_salon_toc_viet.jpg';
import Sidebar from '../../Sidebar';

function HeaderLogo() {
    const [openMenuMobi, setOpenMenuMobi] = useState(false);

    return (
        <div className="flex justify-between items-center px-[24px] lg:w-[var(--admin-width-sidebar)] h-full">
            <div className="lg:block hidden">
                <img alt="logo" src={logo} className="h-[50px]" />
            </div>
            <div onClick={() => setOpenMenuMobi((prev) => !prev)} className="text-[26px] text-[#3e5cb1] cursor-pointer">
                <BsList />
            </div>

            {openMenuMobi && (
                <div onClick={() => setOpenMenuMobi(false)} className="fixed top-[var(--admin-height-header)] bottom-0 left-0 right-0 z-[999999] bg-[#3e3c3c5f]">
                    <div onClick={e => e.stopPropagation()} className='bg-white bottom-0 fixed left-0 top-[var(--admin-height-header)] z-[9999999] box-shadow-card-service'>
                        <Sidebar setOpenMenuMobi={setOpenMenuMobi} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HeaderLogo;
