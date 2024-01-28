import { useEffect, useRef, useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector } from '~/redux/selectors';
import { BsArrowRepeat, BsXCircle } from 'react-icons/bs';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import axios from 'axios';
import uploadImage from '~/utils/uploadImage';
import Alert from '~/components/Alert';

let setTimeoutTmp;

function TocViet() {
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

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/bannerTocViet/getAll`);

            if (res.data.success) {
                setDatas(res.data.images);
            }
        } catch (error) {}
    };

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

    const handleCreate = async () => {
        try {
            if (!image1) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng thêm hình ảnh'));

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

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/bannerTocViet/create`, formData);

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Thêm hình ảnh thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                setImage1('');
                getData();

                setTimeout(() => {
                    setLoadingCreate(false);
                }, 1000);
            }
        } catch (error) {}
    };

    const handleDelete = async (id) => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đang xóa hình ảnh'));
            setLoadingCreate(true);


            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/bannerTocViet/delete`, {id});

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Xóa hình ảnh thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                getData();

                setTimeout(() => {
                    setLoadingCreate(false);
                }, 1000);
            }
            
        } catch (error) {
            
        }
    };

    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                Banner trang tóc việt
            </div>
            <div className="min-h-screen bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] pt-[20px] pb-[60px]">
                <div className='flex flex-col gap-[24px]'>
                    {datas.map((data) => (
                        <div className="flex flex-col items-center" key={data._id}>
                            <div className="w-full h-[180px] lg:h-[280px] border-[1px] border-solid border-[#333] rounded-[2px] overflow-hidden">
                                <img className="w-full h-full object-cover" alt="banner_toc_viet" src={data.image} />
                            </div>

                            <Alert
                                funcHandle={() => handleDelete(data._id)}
                                title="Xóa banner"
                                content={`Bạn có chắc chắn muốn xóa không?`}
                            >
                                <button className="p-[6px] mt-[4px] cursor-pointer text-[20px] text-[#fff] rounded-[50%] bg-[#d22323]">
                                    <BsXCircle />
                                </button>
                            </Alert>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-end lg:items-start mt-[20px] pt-[20px] border-t-[1px] border-solid border-[#333]">
                    <div className="mt-[6px] flex justify-center w-full">
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
                                className="absolute top-0 left-0 w-full h-full outline-none border-none cursor-pointer z-[-1]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center w-full mt-[20px]">
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
        </div>
    );
}

export default TocViet;
