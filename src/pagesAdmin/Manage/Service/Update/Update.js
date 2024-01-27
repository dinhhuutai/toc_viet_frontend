import { useEffect, useRef, useState } from 'react';
import uploadFiles from '~/utils/uploadFiles';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector, userSelector } from '~/redux/selectors';
import { BsArrowRepeat } from 'react-icons/bs';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import axios from 'axios';
import { AiOutlineFileAdd } from 'react-icons/ai';
import uploadImage from '~/utils/uploadImage';
import { useParams } from 'react-router-dom';
import Alert from '~/components/Alert';

let setTimeoutTmp;

function UpdateService() {
    const [notChangeImg, setNoChangeImg] = useState(true);
    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);

    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [sex, setSex] = useState(true);
    const [image, setImage] = useState('');
    const [imageLocal, setImageLocal] = useState('');

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

    var imageMain = useRef();
    function handleImage(e) {
        setNoChangeImg(false);
        try {
            const check = e.target.files[0];
            const urlImg = URL.createObjectURL(check);
            setImageLocal(e);

            setImage(urlImg);
            imageMain.current.style.zIndex = '10';
        } catch (error) {}
    }

    const { id } = useParams();

    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/service/getSingle/${id}`);

        if (res.data.success) {
            setName(res.data.service?.name);
            setSex(res.data.service?.sex);
            setPrice(res.data.service?.price);
            setImage(res.data.service?.image);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!name) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập tên dịch vụ'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            } else if (!image) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng thêm hình ảnh dịch vụ'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            } else if (!price) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng thêm giá dịch vụ'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            }

            dispatch(noticeAdminSlice.actions.processingNotice('Đang cập nhật lại dịch vụ'));
            setLoadingCreate(true);

            let resLinkImg;

            if (!notChangeImg) {
                resLinkImg = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                    uploadImage(imageLocal),
                );
            }

            const formData = {
                name,
                sex,
                price,
                image: !notChangeImg ? resLinkImg.data.link : image,
            };

            const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/service/update/${id}`, formData);

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Cập nhật dịch vụ thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                setName(res.data.service.name);
                setSex(res.data.service.sex);
                setPrice(res.data.service.price);
                setImage(res.data.service.image);

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
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [10000]);
        }
    };

    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                Chỉnh sửa dịch vụ
            </div>
            <div className="min-h-screen bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] py-[10px]">
                <div className="mt-[30px] flex items-end">
                    <label className="min-w-[60px]">Tiêu đề:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-[1px] border-solid border-[#a9a5a5] flex-1 ml-[14px] rounded-[2px] outline-none text-[14px] px-[6px] py-[2px]"
                        type="text"
                        placeholder="Tiêu đề"
                    />
                </div>
                <div className="mt-[30px] flex items-end gap-[30px]">
                    <div onClick={() => setSex((prev) => !prev)} className="flex items-center gap-[6px]">
                        <input type="radio" checked={sex} />
                        <label className="min-w-[60px]">Dịch vụ nam</label>
                    </div>
                    <div onClick={() => setSex((prev) => !prev)} className="flex items-center gap-[6px]">
                        <input type="radio" checked={!sex} />
                        <label className="min-w-[60px]">Dịch vụ nữ</label>
                    </div>
                </div>
                <div className="mt-[30px] flex items-end">
                    <label className="min-w-[60px]">Giá:</label>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border-[1px] border-solid border-[#a9a5a5] flex-1 ml-[14px] rounded-[2px] outline-none text-[14px] px-[6px] py-[2px]"
                        type="number"
                        placeholder="Giá"
                    />
                </div>
                <div className="mt-[30px]">
                    <label>Image:</label>
                    <div className="mt-[6px] flex justify-center">
                        <div className="relative w-[210px] h-[210px] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
                            <input
                                onChange={(e) => handleImage(e)}
                                accept="image/png, image/jpeg"
                                type="file"
                                className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-[100]"
                            />
                            <div className="absolute top-0 left-0 w-full h-full text-[#877575] flex flex-col items-center justify-center text-[14px]">
                                <AiOutlineFileAdd className="text-[50px]" />
                                <p className="mt-[20px]">Upload a image</p>
                            </div>
                            <img
                                ref={imageMain}
                                src={image}
                                alt=""
                                className="absolute top-0 left-0 w-full h-full outline-none border-none cursor-pointer z-[10]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-[50px]">
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
            </div>
        </div>
    );
}

export default UpdateService;
