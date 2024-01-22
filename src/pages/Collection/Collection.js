import { useEffect, useState } from 'react';
import bannerCollection from '~/assets/images/banner_collection.jpg';
import CartService from '~/components/CartService';
import Appointment from '~/components/Appointment';
import Address from '../Home/Address';

import axios from 'axios';



function Collection() {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/collection/getAll`);

            if(res.data.success) {
                setDatas(res.data.colections);
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
        <div className="pb-[50px]">
            <div>
                <img alt="toc_viet" src={bannerCollection} className="w-[100%] lg:h-[300px] h-[200px] object-fill" />
            </div>
            <div className="lg:px-[80px] px-[10px] mt-[40px]">
                <Address />
            </div>
            <div className="lg:px-[80px] px-[10px] mt-[40px]">
                <h1 className="text-[20px] uppercase font-[650] text-linear w-fit border-l-[5px] border-solid border-l-[#b97e3b] pl-[20px]">
                    Bộ sưu tập
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] mt-[20px]">
                    {datas.map((data, i) => (
                        <div key={i}>
                            <CartService data={data} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-[100px]">
                <Appointment />
            </div>
        </div>
    );
}

export default Collection;