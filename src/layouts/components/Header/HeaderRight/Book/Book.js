import { BsCalendar2WeekFill } from "react-icons/bs";
import modalBookSlice from '~/redux/slices/modalBookSlice';
import { useDispatch } from "react-redux";

function Book() {

    const dispatch = useDispatch()


    return (
        <div onClick={() => dispatch(modalBookSlice.actions.openModalBook())} className="lg:flex hidden bg-[#000] rounded-[4px] px-[12px] py-[6px] cursor-pointer">
            <div className="uppercase text-[#fff] text-[12px] font-[600]">Đặt lịch</div>
            <div className="ml-[8px] text-[#fff] flex items-center"><BsCalendar2WeekFill /></div>
        </div>
    );
}

export default Book;
