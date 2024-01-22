import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CartService from '~/components/CartService';
import config from '~/config';


function Hot() {

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/collection/get`);

            if(res.data.success) {
                setDatas(res.data.colections);
            }
        } catch (error) {
            
        }
    }


    return (
        <div className="">
            <h1 className="text-[20px] uppercase font-[650] text-linear w-fit border-l-[5px] border-solid border-l-[#b97e3b] pl-[20px]">những mẫu tóc hot</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] mt-[20px]">
                {
                    datas.map((data, i) => (
                        <div key={i}>
                            <CartService data={data} />
                        </div>
                    ))
                }
            </div>
            <Link to={config.routes.collection} className='mt-[30px] flex justify-center'>
                <div className='py-[8px] px-[50px] bg-black text-[#fff] rounded-[4px] text-[14px] font-[600] cursor-pointer'>Xem tất cả</div>
            </Link>
        </div>
    );
}

export default Hot;