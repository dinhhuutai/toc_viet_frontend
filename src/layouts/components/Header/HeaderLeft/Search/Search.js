import { BsSearch } from 'react-icons/bs';

function Search() {
    return (
        <div className="flex">
            <select className="px-[4px] bg-[#edefe9c4] text-[#000] text-[12px] border-[1px] border-solid border-[#b97e3b] rounded-[4px] outline-none cursor-pointer">
                <option className="py-[4px]">Sản phẩm</option>
                <option className="py-[4px]">Dịch vụ tóc nam</option>
                <option className="py-[4px]">Dịch vụ tóc nữ</option>
            </select>
            <div className="flex items-center ml-[6px] text-[13px] border-[1px] w-[400px] border-solid border-[#b97e3b] rounded-[2px] overflow-hidden">
                <input placeholder="Nhập từ khóa cần tìm..." className="outline-none w-full px-[8px] py-[3px]" />
                <div className="bg-[#b97e3b] h-full px-[10px] border-[1px] border-solid border-[#b97e3b] flex items-center text-[#fff] cursor-pointer">
                    <BsSearch />
                </div>
            </div>
        </div>
    );
}

export default Search;
