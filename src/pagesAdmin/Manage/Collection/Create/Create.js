import { useEffect, useState } from 'react';
import uploadFiles from '~/utils/uploadFiles';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector, userSelector } from '~/redux/selectors';
import { BsArrowRepeat } from 'react-icons/bs';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import axios from 'axios';

let setTimeoutTmp;

function CreateCollection() {
    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);


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
            setFiles(e.target.files);
        } catch (error) {}
    }

    const handleCreate = async () => {
        try {
            if (!files) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng thêm hình ảnh'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            }

            dispatch(noticeAdminSlice.actions.processingNotice('Đang thêm colection'));
            setLoadingCreate(true);

            const resImage = await uploadFiles(files, user.login.accessToken);

            const formData = {
                name: title,
                images: resImage,
            };

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/collection/create`, formData);

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Thêm colection thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                setFiles("");
                setTitle("");

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

    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                Thêm bộ sưu tập
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

                <div className="flex justify-center mt-[50px]">
                    <button
                        disabled={loadingCreate || notice.state}
                        onClick={handleCreate}
                        className={`${
                            loadingCreate || notice.state ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                        } w-[120px] h-[30px] flex justify-center items-center bg-[#259d23] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                    >
                        {loadingCreate || notice.state ? (
                            <div className="text-[20px] animate-loading">
                                <BsArrowRepeat />
                            </div>
                        ) : (
                            'Thêm'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateCollection;
