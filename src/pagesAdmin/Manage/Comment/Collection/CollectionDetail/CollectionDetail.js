import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import Pagination from '~/components/Pagination';
import { BsFillStarFill } from 'react-icons/bs';

function CollectionDetail() {
    const [datas, setDatas] = useState([]);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [star, setStar] = useState(0);
    const [percentStar, setPercentStar] = useState(0);

    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/collection/getSingle/${id}`);


            if (res.data.success) {
                setDatas(res.data.collection);

                let starTemp = res.data.collection.comment.reduce((btt, gtht, index) => {
                    return btt + gtht.star * 1;
                }, 0);

                starTemp = (starTemp / res.data.collection.comment.length).toFixed(1);

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
            <div className="bg-[#fff] mx-[20px] box-shadow-card-service py-[30px] px-[40px] rounded-[2px] grid grid-cols-3">
                <div className="flex justify-center">
                    <div className="w-[300px] h-[300px] border-[1px] border-solid border-[#bab5b5] overflow-hidden rounded-[2px]">
                        <img className="w-full h-full object-cover" alt={`toc_viet_${datas.name}`} src={datas.images && datas.images[0]} />
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
                    </div>
                </div>
            </div>
            <div className="bg-[#fff] box-shadow-card-service mx-[20px] mt-[10px] py-[20px] px-[40px] rounded-[2px]">
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

export default CollectionDetail;
