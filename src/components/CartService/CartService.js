import { useEffect, useState } from 'react';

import { BsChevronRight, BsFillStarFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import config from '~/config';

function CartService({ data, type }) {
    const [polish, setPolish] = useState(false);
    const [star, setStar] = useState(0);
    const [percentStar, setPercentStar] = useState(0);

    useEffect(() => {
        const timePolish = setTimeout(() => {
            setPolish(true);
            setTimeout(() => {
                setPolish(false);
            }, 800);
        }, 5000);

        return () => {
            clearTimeout(timePolish);
        };
    }, [polish]);

    useEffect(() => {
        let starTemp = data.comment.reduce((btt, gtht, index) => {
            return btt + gtht.star * 1;
        }, 0);

        starTemp = (starTemp / data.comment.length).toFixed(1);

        setStar(starTemp);
        setPercentStar((starTemp / 5).toFixed(2) * 100);
    }, []);

    return (
        <div
            className={`bg-[#fff] pb-[10px] rounded-[20px] ${
                type === 'product' ? 'box-shadow-card-service-2' : 'box-shadow-card-service'
            } hover:translate-y-[-6px] transition-all linear duration-[.4s]`}
        >
            <Link
                to={`${
                    type !== 'service' && type !== 'product'
                        ? `${config.routes.collectionDetail}/${data._id}`
                        : type === 'service'
                        ? `${config.routes.serviceDetail}/${data._id}`
                        : type === 'product'
                        ? `${config.routes.productDetail}/${data._id}`
                        : ''
                }`}
                className={`w-full ${
                    type === 'service' ? 'h-[240px]' : type === 'product' ? 'h-[220px]' : 'h-[350px]'
                } overflow-hidden rounded-t-[10px] cursor-pointer relative block`}
            >
                <img
                    className="hover:scale-[1.1] transition-all linear duration-[.4s] w-full h-full object-cover"
                    alt="toc_viet"
                    src={`${type !== 'service' && type !== 'product' ? data.images[0] : data.image}`}
                />
                <div
                    className={`${
                        polish ? 'animate-polish' : ''
                    } absolute top-[0] left-[-85%] z-[10] block w-[50%] h-[100%] polish`}
                ></div>
            </Link>
            <Link
                to={`${
                    type !== 'service' && type !== 'product'
                        ? `${config.routes.collectionDetail}/${data._id}`
                        : type === 'service'
                        ? `${config.routes.serviceDetail}/${data._id}`
                        : type === 'product'
                        ? `${config.routes.productDetail}/${data._id}`
                        : ''
                }`}
                className={`hover:text-[#b97e3b] ${
                    type === 'service'
                        ? 'pt-[10px] block'
                        : type === 'product'
                        ? 'dotThreeHiddenText h-[40px] overflow-hidden leading-[20px] mt-[10px]'
                        : 'py-[10px] dotThreeHiddenText h-[40px] overflow-hidden leading-[20px] mt-[10px]'
                } px-[16px] text-[14px] font-[650] uppercase cursor-pointer w-fit`}
            >
                {data.name}
            </Link>
            {type !== 'service' && type !== 'product' && (
                <div className="px-[16px] pb-[4px]">
                    <div className="flex justify-between">
                        {data.comment.length ? (
                            <div className="flex justify-between items-center">
                                <p className="text-[14px] font-[600]">{star}</p>
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
                        ) : (
                            <span className="text-[14px] font-[450] text-[#999292]">Chưa có bình luận</span>
                        )}
                        <Link
                            to={`${config.routes.collectionDetail}/${data._id}`}
                            className="flex justify-between items-center cursor-pointer text-[#b97e3b] hover:underline"
                        >
                            Bình luận
                            <div className="text-[10px] ml-[4px] mt-[2px]">
                                <BsChevronRight />
                            </div>
                        </Link>
                    </div>
                </div>
            )}
            {type === 'product' && (
                <div className="px-[16px] mt-[6px] pb-[4px]">
                    <div>
                        <p className="text-[red] font-[600] text-[14px]">{`${data.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} vnđ`}</p>
                    </div>
                    <div className="flex lg:flex-row lg:gap-[0px] gap-[4px] lg;mt-[0px] mt-[4px] flex-col-reverse justify-between">
                        {data.comment.length ? (
                            <div className="flex justify-between items-center">
                                <p className="text-[14px] font-[600]">{star}</p>
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
                        ) : (
                            <span className="text-[14px] font-[450] text-[#999292]">Chưa có bình luận</span>
                        )}
                        <Link
                            to={`${config.routes.productDetail}/${data._id}`}
                            className="hidden lg:flex justify-between items-center cursor-pointer text-[#b97e3b] hover:underline"
                        >
                            Bình luận
                            <div className="text-[10px] ml-[4px] mt-[2px]">
                                <BsChevronRight />
                            </div>
                        </Link>
                    </div>
                </div>
            )}
            {type === 'service' && (
                <div className="px-[16px] mt-[4px] pb-[4px]">
                    <div className="flex justify-between">
                        <p>{`Giá từ ${data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} vnđ`}</p>
                        <div className="flex justify-between items-center cursor-pointer text-[#b97e3b] hover:underline">
                            Đặt lịch
                            <div className="text-[10px] ml-[4px] mt-[2px]">
                                <BsChevronRight />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-[4px]">
                        <div className="flex justify-between items-center">
                            <p className="text-[14px] font-[600]">{star}</p>
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
                        <Link
                            to={`${config.routes.serviceDetail}/${data._id}`}
                            className="flex justify-between items-center cursor-pointer text-[#b97e3b] hover:underline"
                        >
                            Đánh giá
                            <div className="text-[10px] ml-[4px] mt-[2px]">
                                <BsChevronRight />
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartService;
