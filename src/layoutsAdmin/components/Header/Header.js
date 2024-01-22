import HeaderLogo from './HeaderLogo';
import HeaderSearch from './HeaderSearch';
import HeaderNotice from './HeaderNotice';
import HeaderInfo from './HeaderInfo';

function Header() {
    return (
        <div className="shadow-lg shadow-indigo-500/10 h-full w-full flex justify-between items-center">
            <HeaderLogo />

            <div className='lg:hidden block px-[24px] lg:px-[0px]'>
                <HeaderInfo />
            </div>

            <div className="flex-1 lg:flex hidden justify-between items-center px-[24px]">
                <HeaderSearch />
                <div className="flex items-center">
                    <HeaderNotice />
                    <div className="w-[1.5px] h-[28px] hidden lg:block bg-[#DEE2E6] mx-[20px]"></div>
                    <HeaderInfo />
                </div>
            </div>
        </div>
    );
}

export default Header;
