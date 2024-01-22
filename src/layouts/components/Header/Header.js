import { Link } from 'react-router-dom';
import config from '~/config';

import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import { useSelector } from 'react-redux';
import { introduceSelector } from '~/redux/selectors';
import { BsList } from 'react-icons/bs';
import { useState } from 'react';
import MenuMobile from './MenuMobile';
import { BsX } from 'react-icons/bs';


function Header() {
    const data = useSelector(introduceSelector);
    const [openMenuMobi, setOpenMenuMobi] = useState(false);

    return (
        <div className="lg:px-[80px] px-[20px] h-full flex items-center justify-between">
            <div onClick={() => setOpenMenuMobi(true)} className="text-[26px] lg:hidden block">
                <BsList />
                {openMenuMobi && (
                    <div onClick={() => setOpenMenuMobi(false)} className="top-[0px] left-0 bottom-0 right-0 fixed z-10000 bg-[#3e3c3c5f]">
                        <MenuMobile setOpenMenuMobi={setOpenMenuMobi} openMenuMobi={openMenuMobi} />
                    </div>
                )}
            </div>
            <div className="h-[60px] w-[60px] cursor-pointer border-[1px] border-solid border-[#333] rounded-[50%] overflow-hidden">
                <Link to={config.routes.home}>
                    <img className="" src={data.introduce.logo} alt="Hair Salon Tóc Việt" />
                </Link>
            </div>
            <div className="lg:flex flex-col flex-1 justify-center items-center ml-[30px] hidden">
                <HeaderLeft />
            </div>
            <div>
                <HeaderRight />
            </div>
        </div>
    );
}

export default Header;
