import axios from 'axios';
import { useState } from 'react';
import { BsArrowLeft, BsArrowRepeat, BsStarFill, BsStar, BsX } from 'react-icons/bs';
import uploadImage from '~/utils/uploadImage';

function Create({ getDataComment, getData, setComments, id, setClosedCreate }) {
    const [image, setImage] = useState(
        'https://res.cloudinary.com/duqn7oauj/image/upload/v1706185892/salon_hair_toc_viet/bg-login_ncc1h8.jpg',
    );
    const [imageLocal, setImageLocal] = useState('');
    const [star, setStar] = useState(0);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const [imageDefault, setImageDefault] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(false);

    function handleImage(e) {
        try {
            setImageDefault(false);
            const check = e.target.files[0];
            const urlImg = URL.createObjectURL(check);
            setImageLocal(e);

            setImage(urlImg);
        } catch (error) {}
    }

    const handleSendComment = async () => {
        try {
            setLoadingCreate(true);

            let imageOther;
            if (!imageDefault) {
                imageOther = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/cloudinary/uploadimg`,
                    uploadImage(imageLocal),
                );
            }

            const formData = {
                star,
                name,
                content,
                image: imageDefault ? image : imageOther.data.link,
            };

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/collection/createComment/${id}`, formData);

            if (res.data.success) {
                setComments(res.data.comment);

                setName('');
                setContent('');

                getData();
                getDataComment();

                setLoadingCreate(false);
            }
        } catch (error) {}
    };

    return (
        <div className="relative">
            <div onClick={() => setClosedCreate(true)} className="absolute top-0 right-0 text-[24px] cursor-pointer">
                <BsX />
            </div>
            <div className="flex">
                <div className="w-[90px]">
                    <div className="h-[100px] w-[90px] overflow-hidden rounded-[2px] border-[1px] border-solid border-[#b0acac]">
                        <img className="w-full h-full" alt="avatar" src={image} />
                    </div>
                    <div className="grid grid-cols-1 gap-[10px] mt-[10px]">
                        <div className="bg-[#1b1bab] relative text-[#fff] cursor-pointer py-[4px] text-[18px] flex justify-center rounded-[2px]">
                            <BsArrowRepeat />
                            <input
                                onChange={(e) => handleImage(e)}
                                accept="image/png, image/jpeg"
                                type="file"
                                className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                            />
                        </div>
                        <div
                            onClick={() => {
                                if (!imageDefault) {
                                    setImage(
                                        'https://res.cloudinary.com/duqn7oauj/image/upload/v1706185892/salon_hair_toc_viet/bg-login_ncc1h8.jpg',
                                    );
                                    setImageDefault(true);
                                }
                            }}
                            className={`${
                                imageDefault ? 'opacity-[0.5] cursor-default' : 'opacity-[1] cursor-pointer'
                            } bg-[#1b951b] text-[#fff] py-[4px] text-[18px] flex justify-center rounded-[2px]`}
                        >
                            <BsArrowLeft />
                        </div>
                    </div>
                </div>
                <div className="ml-[50px] w-full">
                    <div className="flex gap-[10px]">
                        <div onClick={() => setStar(1)} className="text-[20px] text-[#c9e056] cursor-pointer">
                            {star < 1 ? <BsStar /> : <BsStarFill className="" />}
                        </div>
                        <div onClick={() => setStar(2)} className="text-[20px] text-[#c9e056] cursor-pointer">
                            {star < 2 ? <BsStar /> : <BsStarFill className="" />}
                        </div>
                        <div onClick={() => setStar(3)} className="text-[20px] text-[#c9e056] cursor-pointer">
                            {star < 3 ? <BsStar /> : <BsStarFill className="" />}
                        </div>
                        <div onClick={() => setStar(4)} className="text-[20px] text-[#c9e056] cursor-pointer">
                            {star < 4 ? <BsStar /> : <BsStarFill className="" />}
                        </div>
                        <div onClick={() => setStar(5)} className="text-[20px] text-[#c9e056] cursor-pointer">
                            {star < 5 ? <BsStar /> : <BsStarFill className="" />}
                        </div>
                    </div>
                    <div className="mt-[14px] w-full">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-b-[1px] border-solid border-[#b4afaf] w-full outline-none px-[8px] py-[2px]"
                            placeholder="Tên khách hàng"
                            name="name"
                        />
                    </div>
                    <div className="mt-[24px] w-full">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="border-b-[1px] border-solid border-[#b4afaf] w-full h-[40px] outline-none px-[8px] py-[2px]"
                            placeholder="Bình luận. . ."
                            name="name"
                        />
                    </div>
                    <div className="flex justify-center mt-[14px]">
                        <button
                            disabled={loadingCreate}
                            onClick={handleSendComment}
                            className={`${loadingCreate ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'} py-[4px] px-[12px] rounded-[2px] bg-[#6675c1] text-[#fff]`}
                        >
                        {loadingCreate ? (
                            <div className="text-[20px] animate-loading">
                                <BsArrowRepeat />
                            </div>
                        ) : (
                            'Gửi đánh giá'
                        )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
