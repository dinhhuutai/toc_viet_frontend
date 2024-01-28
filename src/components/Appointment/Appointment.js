import { BsFillTelephoneFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { introduceSelector } from '~/redux/selectors';
import modalBookSlice from '~/redux/slices/modalBookSlice';

function Appointment() {
    const dispatch = useDispatch();
    const data = useSelector(introduceSelector);

    return (
        <div className="bg-[#333333] text-[#fff] py-[14px] px-[24px] rounded-[10px]">
            <div className="flex items-center">
                <div>
                    <div>
                        <p className="font-[650] text-[16px] uppercase text-[#f5d580]">Đặt lịch mọi lúc mọi nơi</p>
                    </div>
                    <div>
                        <p className="text-[14px]">Làm đẹp không ngần ngại</p>
                    </div>
                </div>
                <div
                    onClick={() => dispatch(modalBookSlice.actions.openModalBook())}
                    className="ml-[20px] lg:ml-[40px] text-[#000] px-[6px] lg:px-[14px] py-[8px] linearMain rounded-[4px] cursor-pointer"
                >
                    <p className="font-[620] text-[12px] lg:text-[14px] uppercase">Đặt lịch ngay</p>
                </div>
            </div>
            <div className="mt-[10px]">
                <p className="flex items-center">
                    Gọi{' '}
                    <div className='flex flex-col items-center'>
                        <a
                            href={`tel:${data.introduce.phone}`}
                            className="text-[#8b8bed] underline flex items-center mx-[8px]"
                        >
                            <div className="text-[10px] mr-[2px]">
                                <BsFillTelephoneFill />
                            </div>
                            {data.introduce.phone}
                        </a>
                        <p className='text-[12px]'>hoặc</p>
                        <a
                            href={`tel:${data.introduce.phone1}`}
                            className="text-[#8b8bed] underline flex items-center mx-[8px]"
                        >
                            <div className="text-[10px] mr-[2px]">
                                <BsFillTelephoneFill />
                            </div>
                            {data.introduce.phone1}
                        </a>
                    </div>{' '}
                    để được tư vấn nhanh nhất
                </p>
            </div>
        </div>
    );
}

export default Appointment;
