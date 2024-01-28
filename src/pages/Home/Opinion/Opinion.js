import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';

function Opinion() {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/opinion/getAll`);

            if (res.data.success) {
                setDatas(res.data.opinions);
            }
        } catch (error) {}
    };

    return (
        <div className="">
            <h1 className="text-[20px] uppercase font-[650] text-linear w-fit border-l-[5px] border-solid border-l-[#b97e3b] pl-[20px]">
                ý kiến khách hàng
            </h1>

            <div className="grid relative grid-cols-1 lg:grid-cols-2 gap-[50px] mt-[30px] lg:mt-[40px]">
                <div className="lg:hidden block h-[1px] w-[40%] absolute top-[50%] bg-[#c4bdbd] left-[50%] translate-x-[-50%]"></div>
                {datas.map((data) => (
                    <div key={data._id} className="lg:gap-[8px] gap-[10px] flex flex-col items-center">
                        <div className="h-[80px] w-[80px] border-[1px] rounded-[50%] overflow-hidden">
                            <img className="w-full h-full object-cover" alt={data.name} src={data.image} />
                        </div>
                        <div className={`text-[#b97e3b] w-fit`}>
                            <div className={`flex overflow-hidden w-[100%]`}>
                                <BsFillStarFill className="w-[18px] text-[16px] shrink-0" />
                                <BsFillStarFill className="w-[18px] text-[16px] shrink-0" />
                                <BsFillStarFill className="w-[18px] text-[16px] shrink-0" />
                                <BsFillStarFill className="w-[18px] text-[16px] shrink-0" />
                                <BsFillStarFill className="w-[18px] text-[16px] shrink-0" />
                            </div>
                        </div>
                        <div>
                            <p className="text-[16px] font-[700]">{data.name}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[14px] text-[#000]">{data.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Opinion;
