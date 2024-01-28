import { useEffect, useState } from 'react';
import CartService from '~/components/CartService';
import Appointment from '~/components/Appointment';
import Address from '../Home/Address';
import { BsArrowRepeat } from 'react-icons/bs';

import axios from 'axios';

function Collection() {
    const [loadingCreate, setLoadingCreate] = useState(false);

    const [datas, setDatas] = useState([]);
    const [end, setEnd] = useState(30);
    const [hiddenBtnViewAdd, setHiddenBtnViewAdd] = useState(false);

    const [bannerImage, setBannerImage] = useState('');

    useEffect(() => {
        getData();
    }, [end]);

    const getData = async () => {
        try {
            setLoadingCreate(true);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/collection/getAll?end=${end}`);

            if (res.data.success) {
                setDatas(res.data.colections);
                if(end >= res.data.totalColection){
                    setHiddenBtnViewAdd(true);
                }

                setLoadingCreate(false);
            }


            
            const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/v1/bannerCollection/getAll`);

            if (res1.data.success) {
                setBannerImage(res1.data.bannerCollection[0]);
            }
        } catch (error) {
            setLoadingCreate(false);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className="pb-[50px]">
            <div>
                <img alt="toc_viet" src={bannerImage.image} className="w-[100%] lg:h-[300px] h-[200px] object-fill" />
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
                {
                    !hiddenBtnViewAdd &&
                    <div className="flex justify-center mt-[40px]">
                        <button
                            disabled={loadingCreate}
                            onClick={() => setEnd((prev) => prev + 30)}
                            className="px-[50px] py-[6px] rounded-[4px] bg-[#6040d6] text-[#fff] cursor-pointer"
                        >
                        {loadingCreate ? (
                            <div className="text-[20px] animate-loading">
                                <BsArrowRepeat />
                            </div>
                        ) : (
                            'Xem thêm'
                        )}
                        </button>
                    </div>
                }
            </div>
            <div className="flex justify-center mt-[60px]">
                <Appointment />
            </div>
        </div>
    );
}

export default Collection;
