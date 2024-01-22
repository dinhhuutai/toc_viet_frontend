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
        if (type === 'service') {
            let starTemp = data.comment.reduce((btt, gtht, index) => {
                return btt + gtht.star;
            }, 0);

            starTemp = starTemp / data.comment.length;

            setStar(starTemp);
            setPercentStar((starTemp / 5) * 100);
        }
    }, []);

    return (
        <div className={`bg-[#fff] pb-[10px] rounded-[20px] ${type === "product" ? 'box-shadow-card-service-2' : 'box-shadow-card-service'} hover:translate-y-[-6px] transition-all linear duration-[.4s]`}>
            <Link to={`${(type !== 'service' && type !== 'product') ? `${config.routes.collectionDetail}/${data._id}` : ''}`}
                className={`w-full ${
                    type === 'service' ? 'h-[240px]' : type === 'product' ? 'h-[220px]' : 'h-[350px]'
                } overflow-hidden rounded-t-[10px] cursor-pointer relative block`}
            >
                <img
                    className="hover:scale-[1.1] transition-all linear duration-[.4s] w-full h-full object-cover"
                    alt="toc_viet"
                    src={`${(type !== 'service' && type !== 'product') ? data.images[0] : data.image}`}
                />
                <div
                    className={`${
                        polish ? 'animate-polish' : ''
                    } absolute top-[0] left-[-85%] z-[10] block w-[50%] h-[100%] polish`}
                ></div>
            </Link>
            <div
                className={`hover:text-[#b97e3b] ${
                    type === 'service'
                        ? 'pt-[10px]'
                        : type === 'product'
                        ? 'dotThreeHiddenText h-[40px] overflow-hidden leading-[20px] mt-[10px]'
                        : 'py-[10px] dotThreeHiddenText h-[40px] overflow-hidden leading-[20px] mt-[10px]'
                } px-[16px] text-[14px] font-[650] uppercase cursor-pointer w-fit`}
            >
                {data.name}
            </div>
            {
                type === 'product' && (
                    <div className="px-[16px] mt-[6px] pb-[4px]">
                        <p className='text-[red] font-[600] text-[14px]'>{`${data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} vnđ`}</p>
                    </div>
                )
            }
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
                                <div className={`flex overflow-hidden w-[${percentStar}%]`}>
                                    <BsFillStarFill className="w-[14px] shrink-0" />
                                    <BsFillStarFill className="w-[14px] shrink-0" />
                                    <BsFillStarFill className="w-[14px] shrink-0" />
                                    <BsFillStarFill className="w-[14px] shrink-0" />
                                    <BsFillStarFill className="w-[14px] shrink-0" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center cursor-pointer text-[#b97e3b] hover:underline">
                            Đánh giá
                            <div className="text-[10px] ml-[4px] mt-[2px]">
                                <BsChevronRight />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartService;
