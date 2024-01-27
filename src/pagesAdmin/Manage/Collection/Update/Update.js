import { useEffect, useState } from 'react';
import uploadFiles from '~/utils/uploadFiles';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector, userSelector } from '~/redux/selectors';
import { BsArrowRepeat } from 'react-icons/bs';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Alert from '~/components/Alert';

let setTimeoutTmp;

function UpdateCollection() {
    const [notChangeImg, setNoChangeImg] = useState(true);
    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);

    const [data, setData] = useState();

    const [files, setFiles] = useState();
    const [title, setTitle] = useState('');

    const [loadingCreate, setLoadingCreate] = useState(false);

    const dispatch = useDispatch();

    const notice = useSelector(noticeAdminSelector);

    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    function handleImage(e) {
        try {
            setNoChangeImg(false);
            setFiles(e.target.files);
        } catch (error) {}
    }

    const { id } = useParams();

    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/collection/getSingle/${id}`);

        if (res.data.success) {
            setTitle(res.data.collection.name);
            setFiles(res.data.collection?.images);
            setData(res.data.collection);
        }
    };

    const handleUpdate = async () => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đang cập nhật lại colection'));
            setLoadingCreate(true);

            let resImage;
            if(!notChangeImg) {
                resImage = await uploadFiles(files, user.login.accessToken);
            }


            const formData = {
                name: title,
                images: resImage,
            };

            const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/collection/update/${id}`, formData);

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Cập nhật colection thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                setTitle(res.data.collection.name);
                setFiles(res.data.collection?.images);
                setData(res.data.collection);

                setTimeout(() => {
                    setLoadingCreate(false);
                }, 1000);
            } else {
                dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);
            }
        } catch (error) {
            setTimeout(() => {
                setLoadingCreate(false);
            }, 1000);
        }
    };

    const handleDeleteImage = async (path) => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đang xóa image.'));
            setLoadingCreate(true);

            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/collection/deleteSingleImage?id=${id}&path=${path}`,
            );

            if (res.data.success) {
                setTitle(res.data.collection.name);
                setFiles(res.data.collection?.images);
                setData(res.data.collection);

                dispatch(noticeAdminSlice.actions.successNotice('Xóa image thành công.'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);
            } else {
                dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Không thể xóa.'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);
            }
        } catch (error) {
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Không thể xóa.'));

            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [10000]);
        }
    };

    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                Chỉnh sửa bộ sưu tập
            </div>
            <div className="min-h-screen bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] py-[10px]">
                <div className="mt-[30px] flex items-end">
                    <label>Tiêu đề:</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-[1px] border-solid border-[#a9a5a5] flex-1 ml-[14px] rounded-[2px] outline-none text-[14px] px-[6px] py-[2px]"
                        type="text"
                        placeholder="Tiêu đề"
                    />
                </div>
                <div className="flex mt-[24px]">
                    <div className="w-full">
                        <label>
                            Image Collection: <span className="text-[red] text-[14px] font-[700]">*</span>
                        </label>
                        <div className="mt-[6px] w-full">
                            <input
                                onChange={(e) => handleImage(e)}
                                multiple
                                type="file"
                                className="border-[1px] border-solid border-[#a9a5a5] w-full rounded-[2px] text-[14px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-[40px]">
                    <Alert
                        funcHandle={() => handleUpdate()}
                        title="Cập nhật"
                        content={`Bạn có chắc chắn muốn cập nhật lại không?`}
                    >
                        <button
                            disabled={loadingCreate || notice.state}
                            className={`${
                                loadingCreate || notice.state ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                            } w-[120px] h-[30px] flex justify-center items-center bg-[#259d23] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                        >
                            {loadingCreate || notice.state ? (
                                <div className="text-[20px] animate-loading">
                                    <BsArrowRepeat />
                                </div>
                            ) : (
                                'Cập nhật'
                            )}
                        </button>
                    </Alert>
                </div>

                <div className="grid lg:grid-cols-4 grid-cols-2 gap-[20px] mt-[50px] pb-[50px]">
                    {data?.images?.map((img, index) => (
                        <div className="box-shadow-card-service-2 rounded-[4px] overflow-hidden bg-[#db3535d8]">
                            <img
                                className="box-shadow-card-service-2 object-cover h-[300px] w-full"
                                src={img}
                                alt="toc_viet"
                                key={index}
                            />
                            <Alert
                                funcHandle={() => handleDeleteImage(img)}
                                title="Xóa ảnh"
                                content={`Bạn có chắc chắn muốn xóa ảnh này không?`}
                            >
                                <div className="text-center py-[10px] text-[#fff] cursor-pointer">Xóa</div>
                            </Alert>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UpdateCollection;
