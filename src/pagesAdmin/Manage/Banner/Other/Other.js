import { useEffect, useRef, useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector } from '~/redux/selectors';
import { BsArrowRepeat, BsCheck2 } from 'react-icons/bs';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import axios from 'axios';
import uploadImage from '~/utils/uploadImage';
import Alert from '~/components/Alert';

let setTimeoutTmp;

function Other() {
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
    

    const [image1, setImage1] = useState('');
    const [imageLocal1, setImageLocal1] = useState('');
    var imageMain1 = useRef();
    function handleImage1(e) {
        try {
            const check = e.target.files[0];
            const urlImg = URL.createObjectURL(check);
            setImageLocal1(e);

            setImage1(urlImg);
            imageMain1.current.style.zIndex = '10';
        } catch (error) {}
    }

    const [image2, setImage2] = useState('');
    const [imageLocal2, setImageLocal2] = useState('');
    var imageMain2 = useRef();
    function handleImage2(e) {
        try {
            const check = e.target.files[0];
            const urlImg = URL.createObjectURL(check);
            setImageLocal2(e);

            setImage2(urlImg);
            imageMain2.current.style.zIndex = '10';
        } catch (error) {}
    }

    const [image3, setImage3] = useState('');
    const [imageLocal3, setImageLocal3] = useState('');
    var imageMain3 = useRef();
    function handleImage3(e) {
        try {
            const check = e.target.files[0];
            const urlImg = URL.createObjectURL(check);
            setImageLocal3(e);

            setImage3(urlImg);
            imageMain3.current.style.zIndex = '10';
        } catch (error) {}
    }



    const [dataBannerProduct, setDataBannerProduct] = useState([]);
    const [dataBannerCollection, setDataBannerCollection] = useState([]);
    const [dataBannerTrain, setDataBannerTrain] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/bannerProduct/getAll`);
            const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/v1/bannerCollection/getAll`);
            const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/v1/bannerTrain/getAll`);

            if (res.data.success && res1.data.success && res2.data.success) {
                setDataBannerProduct(res.data.bannerProduct[0]);
                setImage1(res.data.bannerProduct[0].image);
                
                setDataBannerCollection(res1.data.bannerCollection[0]);
                setImage2(res1.data.bannerCollection[0].image);
                
                setDataBannerTrain(res2.data.bannerTrain[0]);
                setImage3(res2.data.bannerTrain[0].image);
            }
        } catch (error) {}
    };

    const handleUpdateBannerProduct = async () => {
        try {
            if (!image1) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng thêm hình ảnh sản phẩm'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            }

            dispatch(noticeAdminSlice.actions.processingNotice('Đang thêm hình ảnh'));
            setLoadingCreate(true);

            const resLinkImg = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                uploadImage(imageLocal1),
            );

            const formData = {
                image: resLinkImg.data.link,
            };


            let res;
            if(dataBannerProduct){
                res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/bannerProduct/update/${dataBannerProduct._id}`, formData);
            } else {
                res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/bannerProduct/create`, formData);
            }


            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Thêm hình ảnh thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                getData();

                setTimeout(() => {
                    setLoadingCreate(false);
                }, 1000);
            }
        } catch (error) {}
    };

    

    const handleUpdateBannerCollection = async () => {
        try {
            if (!image2) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng thêm hình ảnh sản phẩm'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            }

            dispatch(noticeAdminSlice.actions.processingNotice('Đang thêm hình ảnh'));
            setLoadingCreate(true);

            const resLinkImg = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                uploadImage(imageLocal2),
            );

            const formData = {
                image: resLinkImg.data.link,
            };


            let res;
            if(dataBannerCollection){
                res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/bannerCollection/update/${dataBannerCollection._id}`, formData);
            } else {
                res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/bannerCollection/create`, formData);
            }


            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Thêm hình ảnh thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                getData();

                setTimeout(() => {
                    setLoadingCreate(false);
                }, 1000);
            }
        } catch (error) {}
    };

    

    const handleUpdateBannerTrain = async () => {
        try {
            if (!image3) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng thêm hình ảnh sản phẩm'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            }

            dispatch(noticeAdminSlice.actions.processingNotice('Đang thêm hình ảnh'));
            setLoadingCreate(true);

            const resLinkImg = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                uploadImage(imageLocal3),
            );

            const formData = {
                image: resLinkImg.data.link,
            };


            let res;
            if(dataBannerTrain){
                res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/bannerTrain/update/${dataBannerTrain._id}`, formData);
            } else {
                res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/bannerTrain/create`, formData);
            }


            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Thêm hình ảnh thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                getData();

                setTimeout(() => {
                    setLoadingCreate(false);
                }, 1000);
            }
        } catch (error) {}
    };


    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                Banner Các trang khác
            </div>
            <div className="min-h-screen bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] pt-[20px] pb-[60px]">
                <div className="flex flex-col items-start">
                    <label className='font-[500]'>Trang sản phẩm</label>
                    <div className="mt-[4px] flex justify-center w-full">
                        <div className="relative w-full h-[180px] lg:h-[280px] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
                            <input
                                onChange={(e) => handleImage1(e)}
                                accept="image/png, image/jpeg"
                                type="file"
                                className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-[100]"
                            />
                            <div className="absolute top-0 left-0 w-full h-full text-[#877575] flex flex-col items-center justify-center text-[14px]">
                                <AiOutlineFileAdd className="text-[50px]" />
                                <p className="mt-[20px]">Upload a image</p>
                            </div>
                            <img
                                ref={imageMain1}
                                src={image1}
                                alt=""
                                className="absolute top-0 left-0 w-full h-full outline-none border-none cursor-pointer z-[10]"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-[10px]">
                        <Alert
                            funcHandle={() => handleUpdateBannerProduct()}
                            title="Cập nhật banner"
                            content={`Bạn có chắc chắn muốn cập nhật lại banner không?`}
                        >
                            <button
                                disabled={loadingCreate || notice.state}
                                className={`${
                                    loadingCreate || notice.state
                                        ? 'opacity-[.7] hover:opacity-[.7]'
                                        : 'hover:opacity-[.9]'
                                } w-[120px] h-[30px] text-[20px] flex justify-center items-center bg-[#259d23] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                            >
                                {loadingCreate || notice.state ? (
                                    <div className="text-[20px] animate-loading">
                                        <BsArrowRepeat />
                                    </div>
                                ) : (
                                    <BsCheck2 />
                                )}
                            </button>
                        </Alert>
                    </div>
                </div>

                
                <div className="flex flex-col items-start mt-[30px]">
                    <label className='font-[500]'>Trang bộ sưu tập</label>
                    <div className="mt-[4px] flex justify-center w-full">
                        <div className="relative w-full h-[180px] lg:h-[280px] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
                            <input
                                onChange={(e) => handleImage2(e)}
                                accept="image/png, image/jpeg"
                                type="file"
                                className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-[100]"
                            />
                            <div className="absolute top-0 left-0 w-full h-full text-[#877575] flex flex-col items-center justify-center text-[14px]">
                                <AiOutlineFileAdd className="text-[50px]" />
                                <p className="mt-[20px]">Upload a image</p>
                            </div>
                            <img
                                ref={imageMain2}
                                src={image2}
                                alt=""
                                className="absolute top-0 left-0 w-full h-full outline-none border-none cursor-pointer z-[10]"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-[10px]">
                        <Alert
                            funcHandle={() => handleUpdateBannerCollection()}
                            title="Cập nhật banner"
                            content={`Bạn có chắc chắn muốn cập nhật lại banner không?`}
                        >
                            <button
                                disabled={loadingCreate || notice.state}
                                className={`${
                                    loadingCreate || notice.state
                                        ? 'opacity-[.7] hover:opacity-[.7]'
                                        : 'hover:opacity-[.9]'
                                } w-[120px] h-[30px] text-[20px] flex justify-center items-center bg-[#259d23] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                            >
                                {loadingCreate || notice.state ? (
                                    <div className="text-[20px] animate-loading">
                                        <BsArrowRepeat />
                                    </div>
                                ) : (
                                    <BsCheck2 />
                                )}
                            </button>
                        </Alert>
                    </div>
                </div>

                
                
                <div className="flex flex-col items-start mt-[30px]">
                    <label className='font-[500]'>Trang đào tạo</label>
                    <div className="mt-[4px] flex justify-center w-full">
                        <div className="relative w-full h-[180px] lg:h-[280px] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
                            <input
                                onChange={(e) => handleImage3(e)}
                                accept="image/png, image/jpeg"
                                type="file"
                                className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-[100]"
                            />
                            <div className="absolute top-0 left-0 w-full h-full text-[#877575] flex flex-col items-center justify-center text-[14px]">
                                <AiOutlineFileAdd className="text-[50px]" />
                                <p className="mt-[20px]">Upload a image</p>
                            </div>
                            <img
                                ref={imageMain3}
                                src={image3}
                                alt=""
                                className="absolute top-0 left-0 w-full h-full outline-none border-none cursor-pointer z-[10]"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-[10px]">
                        <Alert
                            funcHandle={() => handleUpdateBannerTrain()}
                            title="Cập nhật banner"
                            content={`Bạn có chắc chắn muốn cập nhật lại banner không?`}
                        >
                            <button
                                disabled={loadingCreate || notice.state}
                                className={`${
                                    loadingCreate || notice.state
                                        ? 'opacity-[.7] hover:opacity-[.7]'
                                        : 'hover:opacity-[.9]'
                                } w-[120px] h-[30px] text-[20px] flex justify-center items-center bg-[#259d23] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                            >
                                {loadingCreate || notice.state ? (
                                    <div className="text-[20px] animate-loading">
                                        <BsArrowRepeat />
                                    </div>
                                ) : (
                                    <BsCheck2 />
                                )}
                            </button>
                        </Alert>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Other;
