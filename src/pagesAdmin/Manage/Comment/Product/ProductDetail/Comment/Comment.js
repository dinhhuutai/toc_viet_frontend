
import Child from './Child';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Comment({ totalComment, setTotalCommentBy, currentPage, id }) {
    const [comments, setComments] = useState([]);

    const [valueRadio, setValueRadio] = useState(true);

    useEffect(() => {
        try {
            getDataComment();
        } catch (error) {}
    }, [id, currentPage, valueRadio]);

    const getDataComment = async () => {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/v1/product/${valueRadio ? 'findComment' : 'findCommentByNotFeedback'}/${id}?limit=${currentPage}`,
        );

        if (res.data.success) {
            setComments(res.data.comment);
            setTotalCommentBy(res.data.commentLength);
        }
    };

    return (
        <div className="">
            <div className="flex flex-col lg:flex-row lg:items-center gap-[6px] lg:gap-[0px] justify-between border-b-[1px] border-solid border-[#b5aeae] pb-[10px]">
                <span className="text-[16px] font-[500]"> {totalComment === 0 ? "Chưa có đánh giá" : "Đánh giá của khách hàng"}</span>
                {
                    totalComment !== 0 &&
                    <div className='flex gap-[20px] items-center'>
                        <div className='flex gap-[4px] items-center'>
                            <input onClick={() => setValueRadio(prev => !prev)} id='inputAll' name='inputRadio' type='radio' checked={valueRadio} />
                            <label for="inputAll">Tất cả</label>
                        </div>
                        <div className='flex gap-[4px] items-center'>
                            <input onClick={() => setValueRadio(prev => !prev)} id='inputOther' name='inputRadio' type='radio' checked={!valueRadio} />
                            <label for="inputOther">Chưa phản hồi</label>
                        </div>
                    </div>
                }
            </div>
            <div>
                {comments?.map((data) => (
                    <div
                        className="lg:px-[18px] px-[10px] border-t-[1px] border-solid border-[#b5aeae] pt-[16px] pb-[16px]"
                        key={data._id}
                    >
                        <Child getDataComment={getDataComment} id={id} data={data} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comment;
