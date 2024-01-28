import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsChevronRight, BsFillStarFill } from 'react-icons/bs';
import Comment from './Comment';
import Pagination from '~/components/Pagination';

function ServiceDDetail() {
    const [datas, setDatas] = useState([]);
    const [star, setStar] = useState(0);
    const [percentStar, setPercentStar] = useState(0);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/service/getSingle/${id}`);

            if (res.data.success) {
                setDatas(res.data.service);

                let starTemp = res.data.service.comment.reduce((btt, gtht, index) => {
                    return btt + gtht.star * 1;
                }, 0);

                starTemp = (starTemp / res.data.service.comment.length).toFixed(1);

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
            <div className="bg-[#fff] boxShadownHeader lg:mx-[80px] mx-[10px] lg:py-[30px] py-[20px] px-[10px] lg:px-[40px] rounded-[2px] grid grid-cols-1 lg:grid-cols-3">
                <div className="flex justify-center">
                    <div className="w-[300px] h-[300px] border-[1px] border-solid border-[#bab5b5] overflow-hidden rounded-[2px]">
                        <img className="w-full h-full object-cover" alt={`toc_viet_${datas.name}`} src={datas.image} />
                    </div>
                </div>
                <div className="col-span-2 lg:mt-[0px] mt-[10px]">
                    <div className="ml-[20px]">
                        <div>
                            <span className="text-[20px] font-[600] uppercase">{datas.name}</span>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <p className="text-[18px] text-[#b97e3b] font-[450]">{star}</p>
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
                        <div className="mt-[10px]">
                            <label className='font-[600]'>Mô tả dịch vụ:</label>
                            <span>{datas.description}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#fff] boxShadownHeader lg:mx-[80px] mx-[10px] mt-[10px] lg:py-[20px] py-[10px] px-[10px] lg:px-[40px] rounded-[2px]">
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

export default ServiceDDetail;
