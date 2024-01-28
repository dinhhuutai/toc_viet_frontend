import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { BsArrowRepeat } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '~/components/Alert';
import { noticeAdminSelector } from '~/redux/selectors';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import uploadImage from '~/utils/uploadImage';

let setTimeoutTmp;

function OpinionCustomer() {
    var imageMain = useRef();
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

    const [valueName1, setValueName1] = useState('');
    const [valueName2, setValueName2] = useState('');

    const [valueContent1, setValueContent1] = useState('');
    const [valueContent2, setValueContent2] = useState('');

    const [notChangeImg, setNoChangeImg] = useState(true);
    const [image, setImage] = useState('');
    const [imageLocal, setImageLocal] = useState('');
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

    const [notChangeImg1, setNoChangeImg1] = useState(true);
    const [image1, setImage1] = useState('');
    const [imageLocal1, setImageLocal1] = useState('');
    var imageMain1 = useRef();
    function handleImage1(e) {
        setNoChangeImg1(false);
        try {
            const check = e.target.files[0];
            const urlImg = URL.createObjectURL(check);
            setImageLocal1(e);

            setImage1(urlImg);
            imageMain1.current.style.zIndex = '10';
        } catch (error) {}
    }

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/opinion/getAll`);

            if (res.data.opinions.length >= 1) {
                setDatas(res.data.opinions);
                setImage(res.data.opinions[0].image);
                setValueName1(res.data.opinions[0].name);
                setValueContent1(res.data.opinions[0].content);
            }

            if (res.data.opinions.length === 2) {
                setImage1(res.data.opinions[1].image);
                setValueName2(res.data.opinions[1].name);
                setValueContent2(res.data.opinions[1].content);
            }
        } catch (error) {}
    };

    const dispatch = useDispatch();
    const [loadingCreate1, setLoadingCreate1] = useState(false);

    const handleUpdate1 = async () => {
        try {
            if (!image) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng thêm hình ảnh'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            } else if (!valueName1) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập tên khách hàng 1.'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            } else if (!valueContent1) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập nội dung khách hàng 1.'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            }

            dispatch(noticeAdminSlice.actions.processingNotice('Đang cập nhật.'));
            setLoadingCreate1(true);

            let resLinkImg;
            if (!notChangeImg) {
                resLinkImg = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                    uploadImage(imageLocal),
                );
            }

            const formData = {
                image: !notChangeImg ? resLinkImg.data.link : image,
                name: valueName1,
                content: valueContent1,
            };

            let res;
            if (datas.length >= 1) {
                res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/opinion/update/${datas[0]._id}`, formData);
            } else {
                res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/opinion/create`, formData);
            }

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Cập nhật thành công.'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                getData();

                setTimeout(() => {
                    setLoadingCreate1(false);
                }, 1000);
            }
        } catch (error) {
            setTimeout(() => {
                setLoadingCreate1(false);
            }, 1000);
        }
    };

    const [loadingCreate2, setLoadingCreate2] = useState(false);
    const handleUpdate2 = async () => {
        try {
            if (!image1) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng thêm hình ảnh'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            } else if (!valueName2) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập tên khách hàng 2.'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            } else if (!valueContent2) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập nội dung khách hàng 2.'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            }

            dispatch(noticeAdminSlice.actions.processingNotice('Đang cập nhật.'));
            setLoadingCreate2(true);

            let resLinkImg;
            if (!notChangeImg1) {
                resLinkImg = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                    uploadImage(imageLocal1),
                );
            }

            const formData = {
                image: !notChangeImg1 ? resLinkImg.data.link : image1,
                name: valueName2,
                content: valueContent2,
            };

            let res;
            if (datas.length === 2) {
                res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/opinion/update/${datas[1]._id}`, formData);
            } else {
                res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/opinion/create`, formData);
            }

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Cập nhật thành công.'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                getData();

                setTimeout(() => {
                    setLoadingCreate2(false);
                }, 1000);
            }
        } catch (error) {
            setTimeout(() => {
                setLoadingCreate2(false);
            }, 1000);
        }
    };

    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                Tạo ý kiến khách hàng
            </div>
            <div className="lg:min-h-screen relative grid grid-cols-1 lg:grid-cols-2 gap-[50px] bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] pt-[20px] pb-[60px]">
                <div className="lg:hidden block h-[1px] w-[60%] absolute top-[50%] bg-[#c4bdbd] left-[50%] translate-x-[-50%]"></div>
                <div className="mt-[6px] flex flex-col items-center">
                    <label className="mb-[20px] font-[600]">Khách hàng 1</label>
                    <div className="relative w-[80px] h-[80px] overflow-hidden rounded-[50%] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
                        <input
                            onChange={(e) => handleImage(e)}
                            accept="image/png, image/jpeg"
                            type="file"
                            className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-[100]"
                        />
                        <div className="absolute top-0 left-0 w-full h-full text-[#877575] flex flex-col items-center justify-center text-[14px]">
                            <AiOutlineFileAdd className="text-[50px]" />
                        </div>
                        <img
                            ref={imageMain}
                            src={image}
                            alt=""
                            className="absolute object-cover top-0 left-0 w-full h-full outline-none border-none cursor-pointer z-[10]"
                        />
                    </div>
                    <div className="w-full mt-[14px]">
                        <input
                            value={valueName1}
                            onChange={(e) => setValueName1(e.target.value)}
                            className="w-full px-[4px] outline-none py-[2px] border-[1px] border-solid border-[#7b7a7a] rounded-[2px]"
                            placeholder="Tên khách hàng"
                        />
                    </div>
                    <div className="w-full mt-[14px]">
                        <textarea
                            value={valueContent1}
                            onChange={(e) => setValueContent1(e.target.value)}
                            className="w-full px-[4px] outline-none py-[2px] h-[100px] border-[1px] border-solid border-[#7b7a7a] rounded-[2px]"
                            placeholder="Nội dung"
                        ></textarea>
                    </div>
                    <div className="mt-[20px]">
                        <Alert
                            funcHandle={() => handleUpdate1()}
                            title="Cập nhật"
                            content={`Bạn có chắc chắn muốn cập nhật lại không?`}
                        >
                            <button
                                disabled={loadingCreate1 || notice.state}
                                className={`${
                                    loadingCreate1 || notice.state
                                        ? 'opacity-[.7] hover:opacity-[.7]'
                                        : 'hover:opacity-[.9]'
                                } w-[120px] h-[30px] flex justify-center items-center bg-[#259d23] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                            >
                                {loadingCreate1 || notice.state ? (
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

                <div className="mt-[6px] flex flex-col items-center">
                    <label className="mb-[20px] font-[600]">Khách hàng 2</label>
                    <div className="relative w-[80px] h-[80px] overflow-hidden rounded-[50%] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
                        <input
                            onChange={(e) => handleImage1(e)}
                            accept="image/png, image/jpeg"
                            type="file"
                            className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-[100]"
                        />
                        <div className="absolute top-0 left-0 w-full h-full text-[#877575] flex flex-col items-center justify-center text-[14px]">
                            <AiOutlineFileAdd className="text-[50px]" />
                        </div>
                        <img
                            ref={imageMain1}
                            src={image1}
                            alt=""
                            className="absolute object-cover top-0 left-0 w-full h-full outline-none border-none cursor-pointer z-[10]"
                        />
                    </div>
                    <div className="w-full mt-[14px]">
                        <input
                            value={valueName2}
                            onChange={(e) => setValueName2(e.target.value)}
                            className="w-full px-[4px] outline-none py-[2px] border-[1px] border-solid border-[#7b7a7a] rounded-[2px]"
                            placeholder="Tên khách hàng"
                        />
                    </div>
                    <div className="w-full mt-[14px]">
                        <textarea
                            value={valueContent2}
                            onChange={(e) => setValueContent2(e.target.value)}
                            className="w-full px-[4px] outline-none py-[2px] h-[100px] border-[1px] border-solid border-[#7b7a7a] rounded-[2px]"
                            placeholder="Nội dung"
                        ></textarea>
                    </div>
                    <div className="mt-[20px]">
                        <Alert
                            funcHandle={() => handleUpdate2()}
                            title="Cập nhật"
                            content={`Bạn có chắc chắn muốn cập nhật lại không?`}
                        >
                            <button
                                disabled={loadingCreate2 || notice.state}
                                className={`${
                                    loadingCreate2 || notice.state
                                        ? 'opacity-[.7] hover:opacity-[.7]'
                                        : 'hover:opacity-[.9]'
                                } w-[120px] h-[30px] flex justify-center items-center bg-[#259d23] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                            >
                                {loadingCreate2 || notice.state ? (
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
        </div>
    );
}

export default OpinionCustomer;
