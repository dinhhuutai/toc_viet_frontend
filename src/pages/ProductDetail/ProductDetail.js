import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';
import Comment from './Comment';
import Pagination from '~/components/Pagination';

function ProductDetail() {
    const [datas, setDatas] = useState([]);
    const [star, setStar] = useState(0);
    const [percentStar, setPercentStar] = useState(0);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [hiddenInfo, setHiddenInfo] = useState(true);

    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/product/getSingle/${id}`);

            if (res.data.success) {
                setDatas(res.data.product);

                let starTemp = res.data.product.comment.reduce((btt, gtht, index) => {
                    return btt + gtht.star * 1;
                }, 0);

                starTemp = (starTemp / res.data.product.comment.length).toFixed(1);

                setStar(starTemp);
                setPercentStar((starTemp / 5).toFixed(2) * 100);
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
        <div className="bg-[#f5f5f5] w-full min-h-screen py-[20px]">
            <div className="bg-[#fff] mx-[80px] py-[30px] px-[40px] rounded-[2px] grid grid-cols-3">
                <div className="flex justify-center">
                    <div className="w-[300px] h-[300px] border-[1px] border-solid border-[#bab5b5] overflow-hidden rounded-[2px]">
                        <img className="w-full h-full object-cover" alt={`toc_viet_${datas.name}`} src={datas.image} />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="ml-[20px]">
                        <div>
                            <span className="text-[20px] font-[600] uppercase">{datas.name}</span>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <p className="text-[18px] text-[#b97e3b] font-[450]">{star !== 'NaN' ? star : ''}</p>
                                <div className={`ml-[6px] text-[#b97e3b] w-fit`}>
                                    <div
                                        className={`flex overflow-hidden 
                                ${
                                    percentStar > 0 && percentStar <= 10
                                        ? 'w-[10%]'
                                        : percentStar > 10 && percentStar <= 20
                                        ? 'w-[20%]'
                                        : percentStar > 20 && percentStar <= 30
                                        ? 'w-[30%]'
                                        : percentStar > 30 && percentStar <= 40
                                        ? 'w-[40%]'
                                        : percentStar > 40 && percentStar <= 50
                                        ? 'w-[50%]'
                                        : percentStar > 50 && percentStar <= 60
                                        ? 'w-[60%]'
                                        : percentStar > 60 && percentStar <= 70
                                        ? 'w-[70%]'
                                        : percentStar > 70 && percentStar <= 80
                                        ? 'w-[80%]'
                                        : percentStar > 80 && percentStar <= 90
                                        ? 'w-[90%]'
                                        : 'w-[100%]'
                                }`}
                                    >
                                        <BsFillStarFill className="w-[14px] shrink-0" />
                                        <BsFillStarFill className="w-[14px] shrink-0" />
                                        <BsFillStarFill className="w-[14px] shrink-0" />
                                        <BsFillStarFill className="w-[14px] shrink-0" />
                                        <BsFillStarFill className="w-[14px] shrink-0" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-[1px] h-[20px] bg-[#ccc] mx-[20px]"></div>
                            <div className="flex items-center">
                                <span className="text-[18px] font-[450]">{datas.comment?.length}</span>
                                <p className="ml-[6px]">Đánh Giá</p>
                            </div>
                        </div>
                        <div className="flex mt-[20px] items-center">
                            <div className="flex text-[red] items-center">
                                <p className="text-[14px] underline">đ</p>
                                <p className="text-[20px] font-[400] ml-[2px]">
                                    {datas.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                </p>
                            </div>
                            <div className="ml-[60px]">
                                <button className="px-[60px] py-[10px] rounded-[2px] cursor-pointer uppercase bg-[#f67441] text-[#fff]">
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <label>Mô tả dịch vụ:</label>
                            <div className={`${hiddenInfo ? 'h-[100px] overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[30px] after:linearInfo' : 'h-fit'} relative`}>
                                <p dangerouslySetInnerHTML={{ __html: datas.description }}></p>
                            </div>
                            <div className="flex justify-center mt-[20px]">
                                <button onClick={() => setHiddenInfo(prev => !prev)} className="border-[1px] border-solid border-[#8d8989] outline-none rounded-[2px] cursor-pointer px-[16px] py-[4px]">
                                    {hiddenInfo ? 'Xem thêm' : 'Ẩn bớt'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#fff] mx-[80px] mt-[10px] py-[20px] px-[40px] rounded-[2px]">
                <Comment getData={getData} currentPage={currentPage} id={id} star={star} percentStar={percentStar} />
                {datas.comment?.length ? (
                    <Pagination
                        setCurrentPage={setCurrentPage}
                        show={10}
                        currentPage={currentPage}
                        totalItems={datas.comment?.length}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
