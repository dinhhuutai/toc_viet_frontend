import { BsPersonFill, BsFillStarFill } from 'react-icons/bs';
import Child from './Child';
import Create from './Create';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Comment({ getData, currentPage, id, star, percentStar }) {
    const [closedCreate, setClosedCreate] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentsLength, setCommentsLength] = useState([]);

    useEffect(() => {
        try {
            getDataComment();
        } catch (error) {}
    }, [id, currentPage]);

    const getDataComment = async () => {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/v1/collection/findComment/${id}?limit=${currentPage}`,
        );

        if (res.data.success) {
            setComments(res.data.comment);
            setCommentsLength(res.data.commentLength);
        }
    };

    return (
        <div className="">
            <div className="border-b-[1px] border-solid border-[#b5aeae] pb-[10px]">
                <span className="text-[16px] font-[500]">Đánh giá của khách hàng</span>
            </div>
            <div className="flex items-center justify-between mt-[10px] mb-[16px]">
                <div className='flex-1'>
                    {commentsLength ? (
                        <div className="flex items-center">
                            <p className="text-[24px] text-[#b97e3b] font-[450]">{star} <span className='text-[16px]'>/ 5</span></p>
                            <div className={`ml-[10px] text-[#b97e3b] w-fit`}>
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
                                }
                            `}
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
                        <span className='text-[14px] font-[450] text-[#999292]'>Bạn hãy là người đầu tiền bình luận về kiểu tóc này!</span>
                    )}
                    <div className="flex items-center mt-[4px]">
                        <span className="text-[14px]">{commentsLength}</span>
                        <div className="ml-[6px]">
                            <BsPersonFill />
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => setClosedCreate(false)}
                        className="bg-[#928e9e] px-[10px] py-[6px] cursor-pointer rounded-[2px] text-[#fff] text-[14px]"
                    >
                        Viết đánh giá
                    </button>
                </div>
            </div>
            <div
                className={`${closedCreate ? 'animate-commentCreateUp' : 'animate-commentCreateDown'} overflow-hidden`}
            >
                <div className="px-[18px] border-t-[1px] border-solid border-[#b5aeae] p-[16px]">
                    <Create getDataComment={getDataComment} getData={getData} setComments={setComments} id={id} setClosedCreate={setClosedCreate} />
                </div>
            </div>
            <div>
                {comments?.map((data) => (
                    <div
                        className="px-[18px] border-t-[1px] border-solid border-[#b5aeae] pt-[16px] pb-[16px]"
                        key={data._id}
                    >
                        <Child data={data} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comment;
