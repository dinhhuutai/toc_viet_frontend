import logoFb from '~/assets/images/logo_fb.png';
import logoTt from '~/assets/images/logo_tt.png';
import logoZalo from '~/assets/images/logo_zalo.png';
import logoYt from '~/assets/images/logo_yt.png';
import { useSelector } from 'react-redux';
import { introduceSelector } from '~/redux/selectors';


function FooterTop() {
    
    const data = useSelector(introduceSelector);

    return (
        <div className="lg:px-[80px] lg:py-[50px] px-[20px] py-[20px]">
            <div className="grid lg:grid-cols-4 grid-cols-1">
                <div className='lg:px-[20px]'>
                    <h1 className="uppercase text-[14px] font-[620]">tocviet hair salon</h1>
                    <div className='h-[2px] w-[40px] bg-[#f5d580] lg:my-[12px] my-[2px]'></div>
                    <ul className='text-[13px]'>
                        <li>
                            <p><span className='font-[700]'>Địa chỉ:</span> {data.introduce.address}</p>
                        </li>
                    </ul>
                </div>
                <div className='lg:px-[20px] mt-[14px] lg:mt-[0px]'>
                    <h1 className="uppercase text-[14px] font-[620]">Thời gian làm việc</h1>
                    <div className='h-[2px] w-[40px] bg-[#f5d580] lg:my-[12px] my-[2px]'></div>
                    <ul className='text-[13px]'>
                        <li>
                            <p><span className='font-[700]'>Giờ mở cửa:</span> {data.introduce.openHour}</p>
                        </li>
                        <li>
                            <p><span className='font-[700]'>Hotline:</span> {data.introduce.phone}</p>
                        </li>
                        <li>
                            <p><span className='font-[700]'>Email:</span> {data.introduce.email}</p>
                        </li>
                    </ul>
                </div>
                <div className='lg:px-[20px] mt-[14px] lg:mt-[0px]'>
                    <h1 className="uppercase text-[14px] font-[620]">Thống kê truy cập</h1>
                    <div className='h-[2px] w-[40px] bg-[#f5d580] lg:my-[12px] my-[2px]'></div>
                    <ul className='text-[13px]'>
                        <li>
                            <p><span className='font-[700]'>Online:</span> 99</p>
                        </li>
                        <li>
                            <p><span className='font-[700]'>Truy cập tháng:</span> 9999</p>
                        </li>
                        <li>
                            <p><span className='font-[700]'>Tổng truy cập:</span> 99999</p>
                        </li>
                    </ul>
                </div>
                <div className='lg:px-[20px] mt-[14px] lg:mt-[0px]'>
                    <h1 className="uppercase text-[14px] font-[620]">Kết nối với tóc việt</h1>
                    <div className='h-[2px] w-[40px] bg-[#f5d580] lg:my-[12px] my-[2px]'></div>
                    <ul className="grid grid-cols-2 text-[13px] lg:mt-[0px] mt-[4px]">
                        <li>
                            <a target='_blank' href={data.introduce.linkFb} className='flex items-center cursor-pointer'>
                                <img className='h-[24px] w-[24px]' alt="Facebook_Toc_Viet" src={logoFb} />
                                <p className='ml-[6px]'>999K</p>
                            </a>
                        </li>
                        <li>
                            <a target='_blank' href={data.introduce.linkTiktok} className='flex items-center cursor-pointer'>
                                <img className='h-[24px] w-[24px]' alt="Tiktok_Toc_viet" src={logoTt} />
                                <p className='ml-[6px]'>999K</p>
                            </a>
                        </li>
                        <li className='mt-[24px]'>
                            <a target='_blank' href={data.introduce.linkZalo} className='flex items-center cursor-pointer'>
                                <img className='h-[24px] w-[24px]' alt="Zalo_Toc_Viet" src={logoZalo} />
                                <p className='ml-[6px]'>999K</p>
                            </a>
                        </li>
                        <li className='mt-[24px]'>
                            <a target='_blank' href={data.introduce.linkYoutube} className='flex items-center cursor-pointer'>
                                <img className='h-[24px] w-[24px]' alt="Youtube_Toc_Viet" src={logoYt} />
                                <p className='ml-[6px]'>999K</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FooterTop;