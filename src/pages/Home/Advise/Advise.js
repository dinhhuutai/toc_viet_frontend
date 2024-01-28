import { useSelector } from 'react-redux';
import { introduceSelector } from '~/redux/selectors';


function Advise() {
    const data = useSelector(introduceSelector);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px]">
            <div>
                <h1 className="text-[20px] font-[650] uppercase text-linear w-fit border-b-[2px] border-solid border-b-[#b97e3b]">Bạn cần tư vấn</h1>
                <div className="mt-[20px]">
                    <p className="text-[14px]">Hãy để lại số điện thoại để nhận được tư vấn miễn phí từ Tóc Việt Salon.</p>
                    <div className="mt-[20px]">
                        <div className="grid grid-cols-2 gap-[16px]">
                            <input className="border-[1px] outline-none border-solid border-[#bda4a4] rounded-[4px] py-[4px] px-[8px] text-[14px]" placeholder="Họ và tên (*)" />
                            <input className="border-[1px] outline-none border-solid border-[#bda4a4] rounded-[4px] py-[4px] px-[8px] text-[14px]" placeholder="Số điện thoại (*)" />
                        </div>
                        <div className="grid grid-cols-1 mt-[14px]">
                            <textarea className="border-[1px] h-[150px] outline-none border-solid border-[#bda4a4] rounded-[4px] py-[4px] px-[8px] text-[14px]" placeholder="Nội dung cần tư vấn..." />
                        </div>
                    </div>
                    <div className="flex justify-center mt-[20px]">
                        <div className="py-[6px] px-[16px] uppercase text-[14px] font-[600] text-[#fff] bg-[#b97e3b] rounded-[4px] cursor-pointer">Tư vấn ngay</div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-[20px] font-[650] uppercase text-linear w-fit border-b-[2px] border-solid border-b-[#b97e3b]">fanpage salon tóc việt</h1>
                <div className="mt-[20px]">
                    <a href={data.introduce.linkFb} target='_blank'>
                        <img className='border-[1px] border-solid border-[#b97e3b] rounded-[6px]' alt="toc_viet" src={data.introduce.imageFanpage} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Advise;