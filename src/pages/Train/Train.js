import bannerTrain from '~/assets/images/banner_train.jpg';
import Appointment from '~/components/Appointment';

import { useEffect, useState } from 'react';
import axios from 'axios';


function Train() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/train/get`);

            if(res.data.success) {
                setData(res.data.train);
            }
        } catch (error) {
            
        }
    }
    
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div>
            <div className="pb-[50px]">
                <div>
                    <img alt="toc_viet" src={bannerTrain} className="w-[100%] lg:h-[300px] h-[200px] object-fill" />
                </div>
                <div className="lg:px-[80px] px-[10px] mt-[40px]">
                    <h1 className="text-[20px] uppercase font-[650] text-linear w-fit border-l-[5px] border-solid border-l-[#b97e3b] pl-[20px]">
                        Đào tạo
                    </h1>
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-[14px] mt-[20px]'>
                        <div className='w-full h-[300px] box-shadow-card-service'>
                            <img className='h-full w-full object-cover' alt="toc_viet" src={data.image1} />
                        </div>
                        <div className='w-full h-[300px] box-shadow-card-service'>
                            <img className='h-full w-full object-cover' alt="toc_viet" src={data.image2} />
                        </div>
                        <div className='w-full h-[300px] box-shadow-card-service'>
                            <img className='h-full w-full object-cover' alt="toc_viet" src={data.image3} />
                        </div>
                        <div className='w-full h-[300px] box-shadow-card-service'>
                            <img className='h-full w-full object-cover' alt="toc_viet" src={data.image4} />
                        </div>
                    </div>
                    <div className="mt-[30px]">
                        <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
                    </div>
                </div>
                <div className="flex justify-center mt-[60px]">
                    <Appointment />
                </div>
            </div>
        </div>
    );
}

export default Train;
