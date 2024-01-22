import { useEffect } from "react";
import { useSelector } from "react-redux";
import { introduceSelector } from "~/redux/selectors";

function Contact() {

    
    const data = useSelector(introduceSelector);

    
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);


    return (
        <div className="pb-[80px]">
            <div className="">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d692.5420591626203!2d107.39922713671078!3d10.917284486046356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317453e462629719%3A0x6d352dec2018cc42!2zOTEgSMO5bmcgVsawxqFuZywgVFQuIEdpYSBSYXksIFh1w6JuIEzhu5ljLCDEkOG7k25nIE5haSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1704815144279!5m2!1svi!2s"
                    width="100%"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="lg:px-[80px] px-[10px] mt-[40px]">
                <div className="flex justify-center">
                    <div className="flex flex-col items-center text-linear w-fit">
                        <p className="font-[700] text-center text-[20px] uppercase">
                            BẠN CẦN TƯ VẤN HAY ĐẶT LỊCH LÀM ĐẸP VÀ CHĂM SÓC TÓC
                        </p>
                        <p className="font-[700] text-[20px] uppercase">HÃY KẾT NỐI VỚI CHÚNG TÔI</p>
                    </div>
                </div>
                <div className="mt-[14px]">
                    <p className="text-[14px] text-center">
                        {
                            `
                            Địa chỉ: ${data.introduce.address} (Hotline: ${data.introduce.phone})
                            `
                        }
                    </p>
                    <div className="mt-[20px]">
                        <div className="grid grid-cols-2 gap-[16px]">
                            <input
                                className="border-[1px] outline-none border-solid border-[#bda4a4] rounded-[4px] py-[4px] px-[8px] text-[14px]"
                                placeholder="Họ và tên (*)"
                            />
                            <input
                                className="border-[1px] outline-none border-solid border-[#bda4a4] rounded-[4px] py-[4px] px-[8px] text-[14px]"
                                placeholder="Số điện thoại (*)"
                            />
                        </div>
                        <div className="grid grid-cols-1 mt-[14px]">
                            <textarea
                                className="border-[1px] h-[150px] outline-none border-solid border-[#bda4a4] rounded-[4px] py-[4px] px-[8px] text-[14px]"
                                placeholder="Nội dung cần tư vấn..."
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-[20px]">
                        <div className="py-[6px] px-[16px] uppercase text-[14px] font-[600] text-[#fff] bg-[#b97e3b] rounded-[4px] cursor-pointer">
                            Liên hệ ngay
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
