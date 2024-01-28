import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsChevronRight, BsFillStarFill } from 'react-icons/bs';

function CardNoticeComment({ data }) {
    const [star, setStar] = useState(0);
    const [percentStar, setPercentStar] = useState(0);
    const [quantityCommentNoFeedback, setQuantityCommentNoFeedback] = useState(0);

    useEffect(() => {
        getData();
    }, [data]);

    const getData = async () => {
        try {
            let starTemp = data.comment.reduce((btt, gtht, index) => {
                return btt + gtht.star * 1;
            }, 0);

            const quantityCommentNoFeedbackTemp = data.comment.filter((e) => {
                if (!e.feedback || e.feedback === '') {
                    return e;
                }
            });

            setQuantityCommentNoFeedback(quantityCommentNoFeedbackTemp.length);

            starTemp = (starTemp / data.comment.length).toFixed(1);

            setStar(starTemp);
            setPercentStar((starTemp / 5).toFixed(2) * 100);
        } catch (error) {}
    };

    return (
        <div className="flex items-center border-[1px] border-solid border-[#999595] rounded-[4px] px-[6px] py-[4px]">
            <div className="h-[80px] w-[80px] overflow-hidden rounded-[2px] ">
                <img
                    className="w-full h-full object-cover"
                    alt="toc_viet"
                    src={data.images ? data.images[0] : data.image}
                />
            </div>
            <div className="flex-1 ml-[12px]">
                <div>
                    <span>{data.name}</span>
                </div>
                <div className="flex flex-col mt-[10px]">
                    <div className="flex items-center">
                        <p className="text-[16px] text-[#b97e3b] font-[450]">{star !== 'NaN' ? star : ''}</p>
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
                    <div className="flex lg:items-center items-end">
                        <span className="text-[16px] font-[450]">{data.comment?.length}</span>
                        <p className="ml-[6px]">Đánh Giá</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end justify-between ml-[10px] h-[80px]">
                <div>
                    {quantityCommentNoFeedback !== 0 && (
                        <p className="flex text-[12px] items-center lg:items-end bg-[#e93c3c] rounded-[10px] px-[6px] py-[2px] text-[#fff]">
                            <span className="block mr-[4px] text-[14px]">{quantityCommentNoFeedback}</span>
                            chưa phản hồi
                        </p>
                    )}
                </div>
                <div>
                    <button className="block py-[2px] text-[#7a69bf] underline">Xem tất cả bình luận</button>
                </div>
            </div>
        </div>
    );
}

export default CardNoticeComment;
