import axios from 'axios';
import { useEffect, useState } from 'react';
import CartService from '~/components/CartService';


function ProSer() {

    const [datas, setDatas] = useState([]);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        getData();
    }, [check]);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/service/${check ? 'getAllFemale' : 'getAllMale'}`);
            if(res.data.success) {
                setDatas(res.data.services);
            }
        } catch (error) {
            
        }
    }


    return (
        <div className='bg-[#EFEFEF] lg:px-[80px] px-[10px] pt-[30px] pb-[80px] mt-[50px]'>
            <div className='flex justify-between items-center'>
                <h1 className="text-[20px] uppercase font-[650] text-linear w-fit border-l-[5px] border-solid border-l-[#b97e3b] pl-[20px]">Dịch vụ tóc</h1>
                <div className='flex gap-[20px]'>
                    <div className='flex items-center'>
                        <input id="inputFemale" type="radio" name="sex" checked={!check} onClick={() => setCheck(prev => !prev)} />
                        <label for="inputFemale" className='ml-[4px] text-[15px] font-[600] text-[#b97e3b]'>Nữ</label>
                    </div>
                    <div className='flex items-center'>
                        <input id="inputMale" type="radio" name="sex" checked={check} onClick={() => setCheck(prev => !prev)} />
                        <label for="inputMale" className='ml-[4px] text-[15px] font-[600] text-[#b97e3b]'>Nam</label>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-[20px] mt-[20px]">
                {
                    datas.map((data, i) => (
                        <div key={i}>
                            <CartService data={data} type='service' />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ProSer;