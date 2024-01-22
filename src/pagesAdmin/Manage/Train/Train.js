import { useEffect, useRef, useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Alert from '~/components/Alert';
import { BsArrowRepeat } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector } from '~/redux/selectors';
import axios from 'axios';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import uploadImage from '~/utils/uploadImage';

let setTimeoutTmp;

function Train() {
    const [id, setId] = useState('');
    const [content, setContent] = useState('');

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
    
    const [notChangeImg2, setNoChangeImg2] = useState(true);
    const [image2, setImage2] = useState('');
    const [imageLocal2, setImageLocal2] = useState('');
    var imageMain2 = useRef();
    function handleImage2(e) {
        setNoChangeImg2(false);
        try {
            const check = e.target.files[0];
            const urlImg = URL.createObjectURL(check);
            setImageLocal2(e);

            setImage2(urlImg);
            imageMain2.current.style.zIndex = '10';
        } catch (error) {}
    }
    
    
    const [notChangeImg3, setNoChangeImg3] = useState(true);
    const [image3, setImage3] = useState('');
    const [imageLocal3, setImageLocal3] = useState('');
    var imageMain3 = useRef();
    function handleImage3(e) {
        setNoChangeImg3(false);
        try {
            const check = e.target.files[0];
            const urlImg = URL.createObjectURL(check);
            setImageLocal3(e);

            setImage3(urlImg);
            imageMain3.current.style.zIndex = '10';
        } catch (error) {}
    }
    
    
    const [notChangeImg4, setNoChangeImg4] = useState(true);
    const [image4, setImage4] = useState('');
    const [imageLocal4, setImageLocal4] = useState('');
    var imageMain4 = useRef();
    function handleImage4(e) {
        setNoChangeImg4(false);
        try {
            const check = e.target.files[0];
            const urlImg = URL.createObjectURL(check);
            setImageLocal4(e);

            setImage4(urlImg);
            imageMain4.current.style.zIndex = '10';
        } catch (error) {}
    }


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

    const handleUpdate = async () => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đang cập nhật.'));
            setLoadingCreate(true);

            let resLinkImg1;
            if (!notChangeImg1) {
                resLinkImg1 = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                    uploadImage(imageLocal1),
                );
            }
            
            let resLinkImg2;
            if (!notChangeImg2) {
                resLinkImg2 = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                    uploadImage(imageLocal2),
                );
            }
            
            let resLinkImg3;
            if (!notChangeImg3) {
                resLinkImg3 = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                    uploadImage(imageLocal3),
                );
            }
            
            let resLinkImg4;
            if (!notChangeImg4) {
                resLinkImg4 = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                    uploadImage(imageLocal4),
                );
            }


            const formData = {
                image1: !notChangeImg1 ? resLinkImg1.data.link : image1,
                image2: !notChangeImg2 ? resLinkImg2.data.link : image2,
                image3: !notChangeImg3 ? resLinkImg3.data.link : image3,
                image4: !notChangeImg4 ? resLinkImg4.data.link : image4,
                content,
            };

            let res;
            if (id) {
                res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/train/update/${id}`, formData);
            } else {
                res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/train/create`, formData);
            }

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Cập nhật thành công.'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                setId(res.data.train._id);
                setContent(res.data.train.content);

                setImage1(res.data.train.image1);
                setImage2(res.data.train.image2);
                setImage3(res.data.train.image3);
                setImage4(res.data.train.image4);

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

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/train/get`);

        console.log(res.data);
        if (res.data.length === 1) {
            setId(res.data.train._id);
            setContent(res.data.train.content);

            setImage1(res.data.train.image1);
            setImage2(res.data.train.image2);
            setImage3(res.data.train.image3);
            setImage4(res.data.train.image4);
        }
    };

    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                Đào tạo
            </div>
            <div className="min-h-screen bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] pt-[20px] pb-[60px]">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-[10px]">
                    <div className="flex flex-col items-end lg:items-start">
                        <label>Image 1:</label>
                        <div className="mt-[6px] flex justify-center">
                            <div className="relative w-[210px] h-[210px] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
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
                    </div>
                    <div className="flex flex-col items-end lg:items-start">
                        <label>Image 2:</label>
                        <div className="mt-[6px] flex justify-center">
                            <div className="relative w-[210px] h-[210px] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
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
                    </div>
                    <div className="flex flex-col items-end lg:items-start">
                        <label>Image 3:</label>
                        <div className="mt-[6px] flex justify-center">
                            <div className="relative w-[210px] h-[210px] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
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
                    </div>
                    <div className="flex flex-col items-end lg:items-start">
                        <label>Image 4:</label>
                        <div className="mt-[6px] flex justify-center">
                            <div className="relative w-[210px] h-[210px] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
                                <input
                                    onChange={(e) => handleImage4(e)}
                                    accept="image/png, image/jpeg"
                                    type="file"
                                    className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-[100]"
                                />
                                <div className="absolute top-0 left-0 w-full h-full text-[#877575] flex flex-col items-center justify-center text-[14px]">
                                    <AiOutlineFileAdd className="text-[50px]" />
                                    <p className="mt-[20px]">Upload a image</p>
                                </div>
                                <img
                                    ref={imageMain4}
                                    src={image4}
                                    alt=""
                                    className="absolute top-0 left-0 w-full h-full outline-none border-none cursor-pointer z-[10]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-[40px]'>
                    <div className="flex flex-col gap-[4px]">
                        <label>Giới thiệu đào tạo:</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            config={{
                                placeholder: 'Giới thiệu salon',
                            }}
                            onChange={(e, editor) => setContent(editor.getData())}
                            onReady={(editor) => {
                                editor.editing.view.change((write) => {
                                    write.setStyle('height', '260px', editor.editing.view.document.getRoot());
                                });
                            }}
                        />
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

export default Train;
