import { useEffect, useState } from 'react';
import { BsX } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import modalBookSlice from '~/redux/slices/modalBookSlice';

function Book() {
    const dispatch = useDispatch();

    const [dayCurrent, setDayCurrent] = useState('');
    const [valueDay, setValueDay] = useState('');

    useEffect(() => {
        const currentDate = new Date();
    
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0, nên cần cộng thêm 1.
        const day = currentDate.getDate();

        setDayCurrent(`${year}-${month}-${day}`);

    }, []);

    const formatInputDate = (e) => {

        if (e.target.value) {
            const [year, month, day] = e.target.value.split('-');
            const formattedDate = `${year}-${month}-${day}`;
            console.log(formattedDate);
            setValueDay(formattedDate);
          }
    }


    return (
        <div onClick={(e) => e.stopPropagation()} className="w-[400px] mb-[50px] lg:w-[460px] animate-slideOpenModalBook min-h-[200px] bg-[#fff] rounded-[2px] boxShadownHeader px-[20px] py-[10px] relative">
            <div onClick={() => dispatch(modalBookSlice.actions.closeModalBook())} className="absolute text-[26px] rounded-[2px] top-[4px] right-[4px] p-[4px] cursor-pointer hover:bg-[#ff0000d9] hover:text-[#fff]">
                <BsX />
            </div>
            <div className="text-center border-b-[1px] border-solid border-b-[#333]">
                <h1 className="uppercase pb-[6px] text-[18px] font-[640]">Đặt lịch giữ chỗ</h1>
            </div>
            <div>
                <div className="text-center mt-[10px]">
                    <p>Thời gian làm việc: T2 - CN (9h00 - 21h00)</p>
                </div>
                <div className="grid grid-cols-2 gap-[16px] mt-[14px]">
                    <input
                        className="border-[1px] border-solid border-[#333] rounded-[2px] outline-none px-[8px] py-[4px] w-full"
                        placeholder="Họ và tên (*)"
                    />
                    <input
                        className="border-[1px] border-solid border-[#333] rounded-[2px] outline-none px-[8px] py-[4px] w-full"
                        placeholder="Số điện thoại (*)"
                    />
                </div>
                <div className="mt-[14px]">
                    <select className="border-[1px] border-solid border-[#333] rounded-[2px] outline-none px-[8px] py-[4px] w-full">
                        <option>Chọn dịch vụ (*)</option>
                        <option>Cắt</option>
                        <option>Gội</option>
                        <option>Nhuộm</option>
                        <option>Uốn</option>
                        <option>Ép</option>
                        <option>High Light</option>
                        <option>Hấp</option>
                        <option>Sấy</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-[16px] mt-[14px]">
                    <input
                        className="border-[1px] border-solid border-[#333] rounded-[2px] outline-none px-[8px] py-[4px] w-full"
                        type="date"
                        value={valueDay}
                        onChange={formatInputDate}
                    />
                    <select className="border-[1px] border-solid border-[#333] rounded-[2px] outline-none px-[8px] py-[4px] w-full">
                        <option>Chọn giờ (*)</option>
                        <option>09h00</option>
                        <option>09h30</option>
                        <option>10h00</option>
                        <option>10h30</option>
                        <option>11h00</option>
                        <option>11h30</option>
                        <option>12h00</option>
                        <option>12h30</option>
                    </select>
                </div>
                <div className="mt-[14px]">
                    <textarea
                        className="border-[1px] h-[100px] border-solid border-[#333] rounded-[2px] outline-none px-[8px] py-[4px] w-full"
                        placeholder="Ghi chú..."
                    ></textarea>
                </div>
            </div>
            <div className="flex justify-center mt-[14px] pb-[12px]">
                <button className="border-[1px] border-solid border-[#000] bg-[#000] text-[#fff] font-[600] uppercase rounded-[2px] py-[6px] px-[26px]">
                    Đặt lịch ngay
                </button>
            </div>
        </div>
    );
}

export default Book;
