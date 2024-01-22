import { BsSearch, BsChevronDown } from "react-icons/bs";



function HeaderSearch() {
    return (
        <div className="lg:flex hidden items-center h-full">
            <div className="text-[#3e5cb1] text-[20px] rotate p-[10px] rotateZ-90deg bg-[#EBECED] rounded-[50%] cursor-pointer"><BsSearch /></div>
            <div className="flex items-center cursor-pointer ml-[24px]">
                <span className="text-[12px] text-[#fff] flex justify-center items-center font-[600] h-[20px] w-[20px] rounded-[50%] bg-[#D92550]">4</span>
                <span className="text-[14px] px-[6px] text-[#6d6f71]">Settings</span>
                <span className="text-[14px] text-[#979A9E]"><BsChevronDown /></span>
            </div>
        </div>
    );
}

export default HeaderSearch;