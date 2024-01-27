import { BsStarFill, BsChevronDown, BsChevronUp, BsStar } from 'react-icons/bs';
import moment from 'moment';
import { useEffect, useState } from 'react';

function Child({ data }) {
    const [feedback, setFeedback] = useState(false);


    return (
        <div>
            <div>
                <div className="flex items-center">
                    <div className="border-[1px] border-solid border-[#9a9696] rounded-[50%] overflow-hidden h-[40px] w-[40px]">
                        <img className="w-full h-full" alt={data.name} src={data.image} />
                    </div>
                    <div className="ml-[14px]">
                        <div>
                            <span className="text-[14px] font-[500]">{data.name}</span>
                        </div>
                        <div className="flex mt-[2px] items-center">
                            <div className={`text-[#b97e3b] w-fit`}>
                                <div className="flex gap-[2px]">
                                    <div
                                        className="text-[14px] text-[#c9e056] cursor-pointer"
                                    >
                                        {data.star*1 < 1 ? <BsStar /> : <BsStarFill className="" />}
                                    </div>
                                    <div
                                        className="text-[14px] text-[#c9e056] cursor-pointer"
                                    >
                                        {data.star*1 < 2 ? <BsStar /> : <BsStarFill className="" />}
                                    </div>
                                    <div
                                        className="text-[14px] text-[#c9e056] cursor-pointer"
                                    >
                                        {data.star*1 < 3 ? <BsStar /> : <BsStarFill className="" />}
                                    </div>
                                    <div
                                        className="text-[14px] text-[#c9e056] cursor-pointer"
                                    >
                                        {data.star*1 < 4 ? <BsStar /> : <BsStarFill className="" />}
                                    </div>
                                    <div
                                        className="text-[14px] text-[#c9e056] cursor-pointer"
                                    >
                                        {data.star*1 < 5 ? <BsStar /> : <BsStarFill className="" />}
                                    </div>
                                </div>
                            </div>
                            <div className="ml-[20px]">
                                <span>{moment(data.createDate).format('DD/MM/YYYY HH:mm')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[10px]">
                    <p className="ml-[54px] text-[14px]">{data.content}</p>
                </div>
            </div>
            {data.feedback && (
                <div>
                    <div
                        onClick={() => setFeedback((prev) => !prev)}
                        className="flex justify-end mt-[10px] items-center cursor-pointer text-[#887ed7]"
                    >
                        <button className="flex items-center">
                            <span>Phản hồi của tóc việt</span>
                            <div className="flex items-end ml-[2px] text-[18px]">
                                {feedback ? <BsChevronUp /> : <BsChevronDown />}
                            </div>
                        </button>
                    </div>
                    {feedback && (
                        <div className="bg-[#f4f3f3] px-[14px] py-[10px] mx-[54px] mt-[6px]">
                            <span>{data.feedback}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Child;
