import { useEffect, useState } from 'react';
import CartService from '~/components/CartService';
import Appointment from '~/components/Appointment';
import axios from 'axios';
import BottomTableAdmin from '~/components/BottomTableAdmin';


function Product() {
    const [datas, setDatas] = useState([]);
    
    const [bannerImage, setBannerImage] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const [show, setShow] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);

    const getData = async () => {
        try {
            
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/v1/product/getAll?limit=${show}&skip=${
                    show * currentPage
                }`,
            );


            if(res.data.success) {
                setDatas(res.data.products);
                setTotalProduct(res.data.totalProduct);
            }

            
            const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/v1/bannerProduct/getAll`);

            if (res1.data.success) {
                setBannerImage(res1.data.bannerProduct[0]);
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
                <img alt="toc_viet" src={bannerImage.image} className="w-[100%] lg:h-[300px] h-[200px] object-fill" />
            </div>
            <div className="lg:px-[80px] px-[10px] mt-[40px]">
                <h1 className="text-[20px] uppercase font-[650] text-linear w-fit border-l-[5px] border-solid border-l-[#b97e3b] pl-[20px]">
                    Sản phẩm
                </h1>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[20px]">
                    {datas.map((data, i) => (
                        <div key={i}>
                            <CartService data={data} type="product" />
                        </div>
                    ))}
                </div>
                <BottomTableAdmin
                    setCurrentPage={setCurrentPage}
                    show={show}
                    currentPage={currentPage}
                    totalItems={totalProduct}
                />
            </div>
            <div className="flex justify-center mt-[100px]">
                <Appointment />
            </div>
        </div>
    );
}

export default Product;
