import { BsStarFill, BsExclamationLg, BsArrowRepeat, BsStar } from 'react-icons/bs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Alert from '~/components/Alert';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector } from '~/redux/selectors';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import noteNewCommentAndOrderSlice from '~/redux/slices/noteNewCommentAndOrderSlice';

let setTimeoutTmp;

function Child({ id, data, getDataComment }) {
    const [valueFeedback, setValueFeedback] = useState('');
    const [loadingCreate, setLoadingCreate] = useState(false);

    const dispatch = useDispatch();

    const notice = useSelector(noticeAdminSelector);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            if (data.feedback) {
                setValueFeedback(data.feedback);
            }
        } catch (error) {}
    };

    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const handleUpdate = async () => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đang cập nhật lại phản hồi'));
            setLoadingCreate(true);
            const res = await axios.put(
                `${process.env.REACT_APP_API_URL}/v1/collection/updateComment/${id}/${data._id}`,
                { feedback: valueFeedback },
            );

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Cập nhật phản hồi thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                getDataComment();
                setValueFeedback(res.data.feedback);
                setLoadingCreate(false);
                getNoteNew();
            }
        } catch (error) {
            setLoadingCreate(false);
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [10000]);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/collection/deleteComment/${id}/${data._id}`
            );

            if (res.data.success) {
                getDataComment();
                getNoteNew();
            }
        } catch (error) {}
    };

    
    const getNoteNew = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/notice/getNotice`);

            if(res.data.success){
                dispatch(noteNewCommentAndOrderSlice.actions.setValue({
                    commentCollectionLength: res.data.commentCollectionLength,
                    commentProductLength: res.data.commentProductLength,
                    commentServiceLength: res.data.commentServiceLength,
                    orderNewLength: res.data.orderNewLength,
                }))
            }

        } catch (error) {
            
        }
    }

    return (
        <div>
            <div>
                <div className="flex items-center">
                    <div className="border-[1px] border-solid border-[#9a9696] rounded-[50%] overflow-hidden h-[40px] w-[40px]">
                        <img className="w-full h-full" alt={data.name} src={data.image} />
                    </div>
                    <div className="ml-[14px] flex-1">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-[14px] font-[500]">{data.name}</span>
                            </div>
                            {data.feedback ? (
                                <div></div>
                            ) : (
                                <div className="p-[4px] bg-[red] rounded-[50%] text-[#fff] text-[18px]">
                                    <BsExclamationLg />
                                </div>
                            )}
                        </div>
                        <div className="flex mt-[2px] items-center">
                            <div className={`text-[#b97e3b] w-fit`}>
                                <div className="flex gap-[2px]">
                                    <div className="text-[14px] text-[#c9e056] cursor-pointer">
                                        {data.star * 1 < 1 ? <BsStar /> : <BsStarFill className="" />}
                                    </div>
                                    <div className="text-[14px] text-[#c9e056] cursor-pointer">
                                        {data.star * 1 < 2 ? <BsStar /> : <BsStarFill className="" />}
                                    </div>
                                    <div className="text-[14px] text-[#c9e056] cursor-pointer">
                                        {data.star * 1 < 3 ? <BsStar /> : <BsStarFill className="" />}
                                    </div>
                                    <div className="text-[14px] text-[#c9e056] cursor-pointer">
                                        {data.star * 1 < 4 ? <BsStar /> : <BsStarFill className="" />}
                                    </div>
                                    <div className="text-[14px] text-[#c9e056] cursor-pointer">
                                        {data.star * 1 < 5 ? <BsStar /> : <BsStarFill className="" />}
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
            <div className="mt-[10px] px-[54px]">
                <div className="">
                    <label className="text-[12px] font-[500]">Gửi phản hồi:</label>
                    <textarea
                        value={valueFeedback}
                        onChange={(e) => setValueFeedback(e.target.value)}
                        className="border-[1px] border-solid border-[#929090] outline-none py-[2px] px-[6px] h-[60px] rounded-[2px] w-full"
                    ></textarea>
                </div>
                <div className="flex gap-[20px] mt-[10px]">
                    <Alert
                        funcHandle={() => handleDelete()}
                        title="Xóa bình luận"
                        content={`Bạn có chắc chắn muốn xóa bình luận này không?`}
                    >
                        <button className="px-[8px] py-[2px] rounded-[2px] cursor-pointer bg-[#e93838] text-[#fff]">
                            Xóa bình luận
                        </button>
                    </Alert>

                    <Alert
                        funcHandle={() => handleUpdate()}
                        title="Cập nhật phản hồi"
                        content={`Bạn có chắc chắn muốn cập nhật lại phản hồi này không?`}
                    >
                        <button
                            disabled={loadingCreate || notice.state}
                            className="px-[8px] py-[2px] rounded-[2px] cursor-pointer bg-[#7776d0] text-[#fff]"
                        >
                            {loadingCreate || notice.state ? (
                                <div className="text-[20px] animate-loading">
                                    <BsArrowRepeat />
                                </div>
                            ) : (
                                'Lưu phản hồi'
                            )}
                        </button>
                    </Alert>
                </div>
            </div>
        </div>
    );
}

export default Child;
