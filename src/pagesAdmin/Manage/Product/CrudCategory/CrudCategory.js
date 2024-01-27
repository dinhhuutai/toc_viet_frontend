import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsX, BsArrowRepeat, BsPencil, BsTrash3, BsCheck2 } from 'react-icons/bs';
import Alert from '~/components/Alert';

function CrudCategory({ getCategory, setOpenCrudCategory }) {
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState('');
    const [loadingCreate, setLoadingCreate] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/category/getAll`);

            if (res.data.success) {
                setCategories(res.data.categories);

                setValue('');
            }
        } catch (error) {}
    };

    const handleAddCategory = async () => {
        try {
            setLoadingCreate(true);
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/category/create`, { name: value });

            if (res.data.success) {
                getData();
                setLoadingCreate(false);
                getCategory();
            }
        } catch (error) {}
    };

    const handleDeleteCategory = async (id) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/category/delete`, { id });

            if (res.data.success) {
                getData();
                getCategory();
            }
        } catch (error) {}
    };

    const [idUpdate, setIdUpdate] = useState('');
    const [valueUpdate, setValueUpdate] = useState('');

    const handleUpdateCategory = async (id) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/category/update/${id}`, { name: valueUpdate });

            if (res.data.success) {
                setIdUpdate("");
                setValueUpdate("");
                getData();
                getCategory();
            }
        } catch (error) {}
    };

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="px-[20px] py-[10px] w-[400px] bg-[#fff] rounded-[2px] boxShadownHeader relative"
        >
            <div
                onClick={() => setOpenCrudCategory(false)}
                className="absolute top-0 right-0 p-[8px] text-[20px] cursor-pointer"
            >
                <BsX />
            </div>
            <div className="mt-[30px] flex gap-[10px] items-center">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full outline-none border-[1px] py-[2px] px-[10px] border-solid border-[#c3c0c0] rounded-[2px]"
                    placeholder="Nhập thể loại mới. . ."
                />
                <button
                    disabled={loadingCreate}
                    onClick={handleAddCategory}
                    className={`${
                        loadingCreate
                            ? 'opacity-[.7] hover:opacity-[.7]'
                            : 'py-[2px] px-[10px] rounded-[2px] border-[1px] border-solid text-[#fff] border-[#43ab36] bg-[#43ab36]'
                    }`}
                >
                    {loadingCreate ? (
                        <div className="text-[20px] animate-loading">
                            <BsArrowRepeat />
                        </div>
                    ) : (
                        'Thêm'
                    )}
                </button>
            </div>
            <div className="pb-[20px] px-[14px] mt-[20px] h-[300px] overflow-y-auto">
                {categories.map((cate) => (
                    <div
                        className="mt-[6px] py-[10px] flex gap-[10px] justify-between items-center border-t-[1px] border-solid border-[#d0c9c9]"
                        key={cate._id}
                    >
                        {idUpdate === cate._id ? (
                            <input
                                value={valueUpdate}
                                onChange={(e) => setValueUpdate(e.target.value)}
                                className="border-[1px] border-solid px-[8px] py-[2px] border-[#b7b6b6] rounded-[2px] w-full outline-none"
                            />
                        ) : (
                            <p>{cate.name}</p>
                        )}
                        {idUpdate === cate._id ? (
                            <div className="flex gap-[14px]">
                                <Alert
                                    funcHandle={() => handleUpdateCategory(cate._id)}
                                    title="Cập nhật"
                                    content={`Bạn có chắc chắn muốn cập nhật thể loại này?`}
                                >
                                    <button className="bg-[#3eb533] rounded-[2px] cursor-pointer p-[4px] text-[#fff]">
                                        <BsCheck2 />
                                    </button>
                                </Alert>
                                <button
                                    onClick={() => {
                                        setIdUpdate("");
                                        setValueUpdate("");
                                    }}
                                    className="bg-[#e0593b] rounded-[2px] cursor-pointer p-[4px] text-[#fff]"
                                >
                                    <BsX />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-[14px]">
                                <button
                                    onClick={() => {
                                        setIdUpdate(cate._id);
                                        setValueUpdate(cate.name);
                                    }}
                                    className="bg-[#718ae3] rounded-[2px] cursor-pointer p-[4px] text-[#fff]"
                                >
                                    <BsPencil />
                                </button>

                                <Alert
                                    funcHandle={() => handleDeleteCategory(cate._id)}
                                    title="Xóa"
                                    content={`Bạn có chắc chắn muốn xóa thể loại này?`}
                                >
                                    <button className="bg-[#e0593b] rounded-[2px] cursor-pointer p-[4px] text-[#fff]">
                                        <BsTrash3 />
                                    </button>
                                </Alert>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CrudCategory;
