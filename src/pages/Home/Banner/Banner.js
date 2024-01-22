import { useEffect, useState } from 'react';
import banner1 from '~/assets/images/banner_1.jpg';
import banner2 from '~/assets/images/banner_2.jpg';
import banner3 from '~/assets/images/banner_3.jpg';
import banner4 from '~/assets/images/banner_4.jpg';
import banner5 from '~/assets/images/banner_5.jpg';

const datas = [
    {
        img: banner1,
    },
    {
        img: banner2,
    },
    {
        img: banner3,
    },
    {
        img: banner4,
    },
    {
        img: banner5,
    },
];

function Banner() {
    const [data, setData] = useState([]);
    const [lengthImg, setLengthImg] = useState(0);
    const [index, setIndex] = useState(0);
    const [pos, setPos] = useState(0);

    useEffect(() => {
        setData(datas);
        setLengthImg(datas.length);
    }, []);

    useEffect(() => {
        const slide = setTimeout(() => {
            if (index < lengthImg - 1) {
                setPos(pos + 100);
                setIndex(index + 1);
            } else {
                setPos(0);
                setIndex(0);
            }
        }, 5000);

        return () => {
            clearTimeout(slide);
        };
    }, [index || data]);

    const handleSlider = (i) => {
        if (i !== index) {
            setPos(i * 100);
            setIndex(i);
        }
    };

    return (
        <div className="overflow-hidden w-[100%] flex justify-center">
            <div className="relative w-[100%] lg:h-[300px] h-[200px]">
                {data.map((e, i) => (
                    <div
                        key={i}
                        className={`w-[100%] shrink-0 absolute transition-all ease-linear duration-[.8s] ${
                            index === i ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img className="w-[100%] lg:h-[300px] h-[200px] object-fill" alt="toc_viet" src={e.img} />
                    </div>
                ))}
                <div className="absolute z-[10] flex bottom-[20px] gap-[20px] left-[50%] translate-x-[-50%]">
                    {data.map((e, i) => (
                        <div
                            key={i}
                            onClick={() => handleSlider(i)}
                            className={`h-[10px] w-[10px] rounded-[50%] cursor-pointer hover:bg-[#b97e3bb6] ${
                                index === i ? 'bg-[#b97e3bb6]' : 'bg-[#1f1e1e9a]'
                            }`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Banner;
