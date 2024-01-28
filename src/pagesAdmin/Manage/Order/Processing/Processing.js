import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '~/components/Pagination';
import CardOrder from '../CardOrder';
import { BsBoxSeam } from 'react-icons/bs';

function Processing() {
    const [datas, setDatas] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [show, setShow] = useState(5);

    useEffect(() => {
        getData();
    }, [currentPage]);

    const getData = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/v1/order/getProcessing?limit=${show}&skip=${show * currentPage}`,
            );

            if (res.data.success) {
                setDatas(res.data.orders);
                setTotalOrder(res.data.totalOrder);
            }
        } catch (error) {}
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                Đơn hàng đang xử lí
            </div>
            <div className="min-h-screen bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] pt-[20px] pb-[60px]">
                <div className="grid grid-cols-1 gap-[14px]">
                    {totalOrder !== 0 ? (
                        datas.map((data) => (
                            <div key={data._id}>
                                <CardOrder getData={getData} data={data} type="processing" />
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center mt-[50px]">
                            <div className='flex flex-col gap-[20px] items-center'>
                                <div className='text-[50px] text-[#ccc]'>
                                    <BsBoxSeam />
                                </div>
                                <p className="text-[20px] font-[600] text-[#ccc]">Chưa có đơn hàng</p>
                            </div>
                        </div>
                    )}
                </div>

                {totalOrder !== 0 && (
                    <Pagination
                        setCurrentPage={setCurrentPage}
                        show={show}
                        currentPage={currentPage}
                        totalItems={totalOrder}
                    />
                )}
            </div>
        </div>
    );
}

export default Processing;
