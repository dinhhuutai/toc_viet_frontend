import { useEffect, useState } from 'react';
import { BsFacebook, BsFillTelephoneFill, BsChevronBarUp } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { introduceSelector } from '~/redux/selectors';

function Contact() {
    const handleUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const data = useSelector(introduceSelector);

    const [up, setUp] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;

            // Thực hiện các thao tác kiểm tra dựa trên chiều Y ở đây
            if (scrollTop >= 400) {
                setUp(true);
            } else {
                setUp(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // useEffect chỉ chạy một lần khi component được mount

    return (
        <div className="flex flex-col gap-[56px] items-center">
            <a href={data.introduce.linkFb} target="_blank">
                <div className="relative justify-center items-center flex mb-[20px]">
                    <div className="h-[56px] w-[56px] absolute animate-vibrate rounded-[50%] cursor-pointer bg-[#0000008b]"></div>
                    <div className="h-[40px] w-[40px] absolute animate-vibrate2 rounded-[50%] border-[1.4px] border-solid border-[#000] cursor-pointer bg-transparent"></div>
                    <div className="h-[40px] w-[40px] absolute border-solid border-[4px] border-[#000] flex justify-center items-center rounded-[50%] cursor-pointer bg-[#fff] text-[#333]">
                        <div className="text-[20px]">
                            <BsFacebook />
                        </div>
                    </div>
                </div>
            </a>
            <a href={`tel:${data.introduce.phone}`}>
                <div className="relative justify-center items-center flex">
                    <div className="h-[56px] w-[56px] absolute animate-vibrate rounded-[50%] cursor-pointer bg-[#0000008b]"></div>
                    <div className="h-[40px] w-[40px] absolute animate-vibrate2 rounded-[50%] border-[1.4px] border-solid border-[#000] cursor-pointer bg-transparent"></div>
                    <div className="h-[40px] w-[40px] absolute border-solid border-[4px] border-[#000] flex justify-center items-center rounded-[50%] cursor-pointer bg-[#fff] text-[#333]">
                        <div className="text-[20px]">
                            <BsFillTelephoneFill />
                        </div>
                    </div>
                </div>
            </a>
            {up ? (
                <div
                    onClick={handleUp}
                    className="h-[40px] w-[40px] flex justify-center items-center rounded-[6px] cursor-pointer bg-[#0000008b] text-[#fff]"
                >
                    <div className="text-[30px]">
                        <BsChevronBarUp />
                    </div>
                </div>
            ) : (
                <div className="h-[40px] w-[40px]"></div>
            )}
        </div>
    );
}

export default Contact;
