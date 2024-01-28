import axios from 'axios';
import { useEffect, useState } from 'react';

function Banner() {
    const [data, setData] = useState([]);
    const [lengthImg, setLengthImg] = useState(0);
    const [index, setIndex] = useState(0);
    const [pos, setPos] = useState(0);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/bannerTocViet/getAll`);

            if (res.data.success) {
                setData(res.data.images);
                setLengthImg(res.data.images.length);
            }
        } catch (error) {}
    };

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
            <div className="relative w-[100%] lg:h-[300px] h-[250px]">
                {data.map((e, i) => (
                    <div
                        key={i}
                        className={`w-[100%] shrink-0 absolute transition-all ease-linear duration-[.8s] ${
                            index === i ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img className="w-[100%] lg:h-[300px] h-[250px] object-fill" alt="toc_viet" src={e.image} />
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
