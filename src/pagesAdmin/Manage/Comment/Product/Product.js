import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardNoticeComment from '~/components/CardNoticeComment';
import Pagination from '~/components/Pagination';
import config from '~/config';


function Product() {
    const [datas, setDatas] = useState([]);
    const [totalProduct, setTotalProduct] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [show, setShow] = useState(10);

    useEffect(() => {
        getData();
    }, [currentPage]);

    const getData = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/v1/product/getAdminComment?limit=${show}&skip=${
                    show * currentPage
                }`,
            );


            if (res.data.success) {
                setDatas(res.data.products);
                setTotalProduct(res.data.totalProduct);
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
                Bình luận sản phẩm
            </div>
            <div className="min-h-screen bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] pt-[20px] pb-[60px]">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-[12px]'>
                    {
                        datas.map((data, index) => 
                            <Link to={`${config.routes.adminCommentProductDetail}/${data._id}`} className='mt-[4px]' key={index}>
                                <CardNoticeComment data={data} />
                            </Link>
                        )
                    }
                </div>
                
                <Pagination
                    setCurrentPage={setCurrentPage}
                    show={show}
                    currentPage={currentPage}
                    totalItems={totalProduct}
                />
            </div>
        </div>
    );
}

export default Product;