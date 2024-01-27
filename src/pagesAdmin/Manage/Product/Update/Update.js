import { useEffect, useRef, useState } from 'react';
import uploadFiles from '~/utils/uploadFiles';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector, userSelector } from '~/redux/selectors';
import { BsArrowRepeat } from 'react-icons/bs';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import axios from 'axios';
import { AiOutlineFileAdd } from 'react-icons/ai';
import uploadImage from '~/utils/uploadImage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CrudCategory from '../CrudCategory';
import { useParams } from 'react-router-dom';
import Alert from '~/components/Alert';

let setTimeoutTmp;

function Update() {
    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    const [openCrudCategory, setOpenCrudCategory] = useState(false);

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

    const [notChangeImg, setNoChangeImg] = useState(true);
    const [image1, setImage1] = useState('');
    const [imageLocal1, setImageLocal1] = useState('');
    var imageMain1 = useRef();
    function handleImage1(e) {
        setNoChangeImg(false);
        try {
            const check = e.target.files[0];
            const urlImg = URL.createObjectURL(check);
            setImageLocal1(e);

            setImage1(urlImg);
            imageMain1.current.style.zIndex = '10';
        } catch (error) {}
    }

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [idCategory, setIdCategory] = useState('');
    const [description, setDescription] = useState('');

    const { id } = useParams();

    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/product/getSingle/${id}`);

        if (res.data.success) {
            setName(res.data.product?.name);
            setPrice(res.data.product?.price);
            setImage1(res.data.product?.image);
            setDescription(res.data.product?.description);
            setIdCategory(res.data.product?.idCategory);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!name) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập tên sản phẩm'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            } else if (!image1) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng thêm hình ảnh sản phẩm'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            } else if (!price) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng thêm giá sản phẩm'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            }

            dispatch(noticeAdminSlice.actions.processingNotice('Đang Cập nhật sản phẩm'));
            setLoadingCreate(true);

            let resLinkImg;

            if (!notChangeImg) {
                resLinkImg = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                    uploadImage(imageLocal1),
                );
            }

            const formData = {
                name,
                price,
                idCategory,
                image: !notChangeImg ? resLinkImg.data.link : image1,
                description,
            };

            const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/product/update/${id}`, formData);

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Cập nhật sản phẩm thành công'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                setName(res.data.product.name);
                setPrice(res.data.product.price);
                setImage1(res.data.product.image);
                setDescription(res.data.product.description);
                setIdCategory(res.data.product.idCategory);

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

    const [listIdCategory, setListIdCategory] = useState([]);
    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/category/getAll`);

            if (res.data.success) {
                setListIdCategory(res.data.categories);
            }
        } catch (error) {}
    };

    console.log(idCategory)

    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                Chỉnh sửa sản phẩm
            </div>
            <div className="min-h-screen bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] py-[10px]">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-[20px]">
                    <div className="flex flex-col gap-[20px] items-center col-span-2">
                        <div className="flex flex-col items-end lg:items-start">
                            <div className="mt-[6px] flex justify-center">
                                <div className="relative w-[280px] h-[280px] border-[2px] border-dashed border-[#989494] cursor-pointer bg-[#fff]">
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
                    </div>
                    <div className="col-span-3">
                        <div className="flex flex-col">
                            <label>Tên sản phẩm</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-[1px] mt-[4px] border-solid border-[#333] px-[10px] py-[2px] rounded-[2px] outline-none"
                                placeholder="Tên sản phẩm"
                            />
                        </div>
                        <div className="flex flex-col mt-[20px]">
                            <label>Giá sản phẩm</label>
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="border-[1px] mt-[4px] border-solid border-[#333] px-[10px] py-[2px] rounded-[2px] outline-none"
                                placeholder="Giá sản phẩm"
                            />
                        </div>
                        <div className="flex flex-col mt-[20px]">
                            <label>Loại sản phẩm</label>
                            <select
                                onChange={(e) => setIdCategory(e.target.value)}
                                className="border-[1px] mt-[4px] border-solid border-[#333] px-[10px] py-[2px] rounded-[2px] outline-none"
                            >
                                {listIdCategory.map((cate, index) => (
                                    <option key={index} selected={cate._id === idCategory} value={cate._id}>
                                        {cate.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col mt-[20px]">
                            <label>Mô tả sản phẩm</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={description}
                                config={{
                                    placeholder: 'Mô tả sản phẩm',
                                }}
                                onChange={(e, editor) => setDescription(editor.getData())}
                                onReady={(editor) => {
                                    editor.editing.view.change((write) => {
                                        write.setStyle('height', '140px', editor.editing.view.document.getRoot());
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

export default Update;
