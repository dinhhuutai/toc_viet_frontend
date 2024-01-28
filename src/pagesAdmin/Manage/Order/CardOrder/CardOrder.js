import { BsFillTelephoneFill, BsCheck2, BsX } from 'react-icons/bs';
import moment from 'moment';
import Alert from '~/components/Alert';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import { useEffect } from 'react';
import { noticeAdminSelector } from '~/redux/selectors';
import noteNewCommentAndOrderSlice from '~/redux/slices/noteNewCommentAndOrderSlice';

let setTimeoutTmp;

function CardOrder({ getData, data, type }) {
    const dispatch = useDispatch();

    const notice = useSelector(noticeAdminSelector);
    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const handleCancelOrder = async () => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đơn hàng đang được hủy'));
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/order/updateToCancel/${data._id}`);

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Hủy đơn hàng thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                getData();
            }
        } catch (error) {}
    };

    const handleProcessingOrder = async () => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đang xử lý đơn hàng'));

            const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/order/updateToProcessing/${data._id}`);

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Đơn hàng được xử lý thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                getData();
                getNoteNew();
            }
        } catch (error) {}
    };

    const handleSuccessedOrder = async () => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đang xử lý đơn hàng'));
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/order/updateToSuccessed/${data._id}`);

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Đơn hàng đã được giao thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                getData();
            }
        } catch (error) {}
    };

    const getNoteNew = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/notice/getNotice`);

            if (res.data.success) {
                dispatch(
                    noteNewCommentAndOrderSlice.actions.setValue({
                        commentCollectionLength: res.data.commentCollectionLength,
                        commentProductLength: res.data.commentProductLength,
                        commentServiceLength: res.data.commentServiceLength,
                        orderNewLength: res.data.orderNewLength,
                    }),
                );
            }
        } catch (error) {}
    };

    return (
        <div
            className={`py-[4px] px-[6px] border-[1px] border-solid border-[#736f6f] relative rounded-[2px] flex`}
        >
            {
                type === 'successed' &&
                <div className='top-[10px] absolute right-[10px] p-[6px] text-[24px] rounded-[50%] text-[#fff] bg-[#34d632]'>
                    <BsCheck2 />
                </div>
            }
            {
                type === 'cancel' &&
                <div className='top-[10px] absolute right-[10px] p-[6px] text-[24px] rounded-[50%] text-[#fff] bg-[#ed3a3a]'>
                    <BsX />
                </div>
            }
            <div className="flex-1">
                <div className="flex">
                    <div className="h-[100px] w-[100px] overflow-hidden rounded-[2px] border-[1px] border-solid border-[#593f3f]">
                        <img className="w-full h-full" alt={data.idProduct.name} src={data.idProduct.image} />
                    </div>
                    <div className="ml-[12px] flex flex-col">
                        <div className="flex-1">
                            <p className="font-[600] text-[15px]">{data.idProduct.name}</p>
                            <div className="flex text-[red] items-center">
                                <p className="text-[10px] underline">đ</p>
                                <p className="text-[14px] font-[400] ml-[2px]">
                                    {data?.idProduct.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                </p>
                            </div>
                        </div>
                        <div className="">
                            {type === 'wait' ? (
                                <div className="flex gap-[20px]">
                                    <Alert
                                        funcHandle={() => handleCancelOrder()}
                                        title="Thông báo"
                                        content={`Xác nhận hủy đơn hàng này?`}
                                    >
                                        <button className="w-[100px] bg-[#e03636] text-[#fff] uppercase rounded-[2px] py-[4px]">
                                            Hủy đơn
                                        </button>
                                    </Alert>

                                    <Alert
                                        funcHandle={() => handleProcessingOrder()}
                                        title="Thông báo"
                                        content={`Xác nhận bán đơn hàng này?`}
                                    >
                                        <button className="w-[100px] bg-[#279f22] text-[#fff] uppercase rounded-[2px] py-[4px]">
                                            Xác nhận
                                        </button>
                                    </Alert>
                                </div>
                            ) : type === 'processing' ? (
                                <div className="flex gap-[20px]">
                                    <Alert
                                        funcHandle={() => handleCancelOrder()}
                                        title="Thông báo"
                                        content={`Xác nhận hủy đơn hàng này?`}
                                    >
                                        <button className="w-[100px] bg-[#e03636] text-[#fff] uppercase rounded-[2px] py-[4px]">
                                            Hủy đơn
                                        </button>
                                    </Alert>

                                    <Alert
                                        funcHandle={() => handleSuccessedOrder()}
                                        title="Thông báo"
                                        content={`Xác nhận giao thành công đơn hàng này?`}
                                    >
                                        <button className="w-[100px] bg-[#279f22] text-[#fff] uppercase rounded-[2px] py-[4px]">
                                            Đã giao
                                        </button>
                                    </Alert>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex mt-[14px] border-t-[1px] border-solid border-[#cbc6c6] pt-[14px]">
                    <div>
                        <div className="flex lg:flex-row flex-col lg:items-center">
                            <div className="flex items-center">
                                <label>Số điện thoại:</label>
                                <a
                                    href={`tel:${data.phone}`}
                                    className="text-[#8b8bed] underline flex items-center mx-[8px]"
                                >
                                    <div className="text-[10px] mr-[2px]">
                                        <BsFillTelephoneFill />
                                    </div>
                                    {data.phone}
                                </a>
                            </div>
                            <div className="flex items-center lg:ml-[20px] mt-[4px] lg:mt-[0px]">
                                <label>Ngày đặt hàng:</label>
                                <span className="ml-[4px]">{moment(data.createDate).format('DD/MM/YYYY HH:mm')}</span>
                            </div>
                        </div>
                        <div className="flex items-center mt-[6px]">
                            <label>Địa chỉ:</label>
                            <p className="ml-[4px]">{data.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardOrder;
