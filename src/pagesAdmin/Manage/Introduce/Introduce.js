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

function Introduce() {
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [linkFb, setLinkFb] = useState('');
    const [linkZalo, setLinkZalo] = useState('');
    const [linkTiktok, setLinkTiktok] = useState('');
    const [linkYoutube, setLinkYoutube] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [openHour, setOpenHour] = useState('');
    const [introduce, setIntroduce] = useState('');

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

    const [notChangeImgFanpage, setNoChangeImgFanpage] = useState(true);
    const [imageFanpage, setImageFanpage] = useState('');
    const [imageFanpageLocal, setImageFanpageLocal] = useState('');

    var imageFanpageMain = useRef();
    function handleImageFanpage(e) {
        setNoChangeImgFanpage(false);
        try {
            const check = e.target.files[0];
            const urlImg = URL.createObjectURL(check);
            setImageFanpageLocal(e);

            setImageFanpage(urlImg);
            imageFanpageMain.current.style.zIndex = '10';
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

            let resLinkImg;
            if (!notChangeImg) {
                resLinkImg = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                    uploadImage(imageLocal),
                );
            }

            let resLinkImgFanpage;
            if (!notChangeImgFanpage) {
                resLinkImgFanpage = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                    uploadImage(imageFanpageLocal),
                );
            }

            const formData = {
                logo: !notChangeImg ? resLinkImg.data.link : image,
                imageFanpage: !notChangeImgFanpage ? resLinkImgFanpage.data.link : imageFanpage,
                address,
                linkFb,
                linkZalo,
                linkTiktok,
                linkYoutube,
                phone,
                email,
                openHour,
                introduce,
            };

            let res;
            if (id) {
                res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/introduce/update/${id}`, formData);
            } else {
                res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/introduce/create`, formData);
            }

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Cập nhật thành công.'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                setId(res.data.introduce._id);
                setAddress(res.data.introduce.address);
                setLinkFb(res.data.introduce.linkFb);
                setLinkZalo(res.data.introduce.linkZalo);
                setLinkTiktok(res.data.introduce.linkTiktok);
                setLinkYoutube(res.data.introduce.linkYoutube);
                setPhone(res.data.introduce.phone);
                setEmail(res.data.introduce.email);
                setOpenHour(res.data.introduce.openHour);
                setIntroduce(res.data.introduce.introduce);

                setImage(res.data.introduce.logo);
                setImageFanpage(res.data.introduce.imageFanpage);

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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/introduce/get`);

        console.log(res.data)
        if (res.data.length === 1) {
            setId(res.data.salon._id);
            setAddress(res.data.salon.address);
            setLinkFb(res.data.salon.linkFb);
            setLinkZalo(res.data.salon.linkZalo);
            setLinkTiktok(res.data.salon.linkTiktok);
            setLinkYoutube(res.data.salon.linkYoutube);
            setPhone(res.data.salon.phone);
            setEmail(res.data.salon.email);
            setOpenHour(res.data.salon.openHour);
            setIntroduce(res.data.salon.introduce);

            setImage(res.data.salon.logo);
            setImageFanpage(res.data.salon.imageFanpage);
        }
    };

    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                Giới thiệu
            </div>
            <div className="min-h-screen bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] pt-[20px] pb-[60px]">
                <div className="flex lg:flex-row flex-col lg:gap-[80px] gap-[40px]">
                    <div className="">
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
                    <div className="w-full">
                        <div className="flex items-end">
                            <label className="min-w-[100px]">Địa chỉ:</label>
                            <input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border-[1px] border-solid border-[#a9a5a5] flex-1 ml-[14px] rounded-[2px] outline-none text-[14px] px-[6px] py-[2px]"
                                type="text"
                                placeholder="Địa chỉ"
                            />
                        </div>
                        <div className="mt-[30px] flex items-end">
                            <label className="min-w-[100px]">Link facebook:</label>
                            <input
                                value={linkFb}
                                onChange={(e) => setLinkFb(e.target.value)}
                                className="border-[1px] border-solid border-[#a9a5a5] flex-1 ml-[14px] rounded-[2px] outline-none text-[14px] px-[6px] py-[2px]"
                                type="text"
                                placeholder="Link facebook"
                            />
                        </div>
                        <div className="mt-[30px] flex items-end">
                            <label className="min-w-[100px]">Link zalo:</label>
                            <input
                                value={linkZalo}
                                onChange={(e) => setLinkZalo(e.target.value)}
                                className="border-[1px] border-solid border-[#a9a5a5] flex-1 ml-[14px] rounded-[2px] outline-none text-[14px] px-[6px] py-[2px]"
                                type="text"
                                placeholder="Link zalo"
                            />
                        </div>
                        <div className="mt-[30px] flex items-end">
                            <label className="min-w-[100px]">Link tiktok:</label>
                            <input
                                value={linkTiktok}
                                onChange={(e) => setLinkTiktok(e.target.value)}
                                className="border-[1px] border-solid border-[#a9a5a5] flex-1 ml-[14px] rounded-[2px] outline-none text-[14px] px-[6px] py-[2px]"
                                type="text"
                                placeholder="Link tiktok"
                            />
                        </div>
                        <div className="mt-[30px] flex items-end">
                            <label className="min-w-[100px]">Link youtube:</label>
                            <input
                                value={linkYoutube}
                                onChange={(e) => setLinkYoutube(e.target.value)}
                                className="border-[1px] border-solid border-[#a9a5a5] flex-1 ml-[14px] rounded-[2px] outline-none text-[14px] px-[6px] py-[2px]"
                                type="text"
                                placeholder="Link youtube"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-[30px] flex items-end">
                    <label className="min-w-[100px]">Số điện thoại:</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border-[1px] border-solid border-[#a9a5a5] flex-1 ml-[14px] rounded-[2px] outline-none text-[14px] px-[6px] py-[2px]"
                        type="text"
                        placeholder="Số điện thoại"
                    />
                </div>
                <div className="mt-[30px] flex items-end">
                    <label className="min-w-[100px]">Email:</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-[1px] border-solid border-[#a9a5a5] flex-1 ml-[14px] rounded-[2px] outline-none text-[14px] px-[6px] py-[2px]"
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div className="mt-[30px] flex items-end">
                    <label className="min-w-[100px]">Giờ mở cửa:</label>
                    <input
                        value={openHour}
                        onChange={(e) => setOpenHour(e.target.value)}
                        className="border-[1px] border-solid border-[#a9a5a5] flex-1 ml-[14px] rounded-[2px] outline-none text-[14px] px-[6px] py-[2px]"
                        type="text"
                        placeholder="Giờ mở cửa"
                    />
                </div>
                <div className="flex flex-col lg:flex-row mt-[40px] lg:gap-[80px] gap-[40px]">
                    <div className="">
                        <label>Image Fanpage:</label>
                        <div className="mt-[6px] flex justify-center">
                            <div className="relative w-[210px] h-[210px] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
                                <input
                                    onChange={(e) => handleImageFanpage(e)}
                                    accept="image/png, image/jpeg"
                                    type="file"
                                    className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-[100]"
                                />
                                <div className="absolute top-0 left-0 w-full h-full text-[#877575] flex flex-col items-center justify-center text-[14px]">
                                    <AiOutlineFileAdd className="text-[50px]" />
                                    <p className="mt-[20px]">Upload a image Fanpage</p>
                                </div>
                                <img
                                    ref={imageFanpageMain}
                                    src={imageFanpage}
                                    alt=""
                                    className="absolute top-0 left-0 w-full h-full outline-none border-none cursor-pointer z-[10]"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col gap-[4px]">
                            <label>Giới thiệu salon:</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={introduce}
                                config={{
                                    placeholder: 'Giới thiệu salon',
                                }}
                                onChange={(e, editor) => setIntroduce(editor.getData())}
                                onReady={(editor) => {
                                    editor.editing.view.change((write) => {
                                        write.setStyle('height', '174px', editor.editing.view.document.getRoot());
                                    });
                                }}
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

export default Introduce;
