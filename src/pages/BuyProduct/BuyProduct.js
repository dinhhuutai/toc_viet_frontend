import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { introduceSelector } from '~/redux/selectors';
import config from '~/config';
import { BsArrowRepeat, BsX, BsCheck2Circle } from 'react-icons/bs';

function BuyProduct() {
    const { id } = useParams();
    const [data, setData] = useState();

    const dataPhonne = useSelector(introduceSelector);

    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [validPhone, setValidPhone] = useState(false);
    const [validAddress, setValidAddress] = useState(false);

    const [loadingCreate, setLoadingCreate] = useState(false);

    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/product/getSingle/${id}`);

            if (res.data.success) {
                setData(res.data.product);
            }
        } catch (error) {}
    };

    const navigate = useNavigate();

    const handleBuy = async () => {
        try {
            if (!phone.trim()) {
                setValidPhone(true);
            } else if (!address.trim()) {
                setValidAddress(true);
            }

            setLoadingCreate(true);

            const formData = {
                phone,
                address,
                idProduct: id,
            };

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/order/create`, formData);

            if (res.data.success) {
                setOrderSuccess(true);

                setLoadingCreate(false);
            }
        } catch (error) {}
    };

    return (
        <div className="bg-[#f5f5f5] grid grid-cols-2 px-[80px] gap-[20px] w-full min-h-screen py-[20px]">
            <div className="">
                <div className="flex bg-[#fff] boxShadownHeader py-[30px] px-[40px] h-fit">
                    <div className="h-[100px] w-[100px] overflow-hidden rounded-[2px] border-[1px] border-solid border-[#333]">
                        <img className="w-full h-full" alt={data?.name} src={data?.image} />
                    </div>
                    <div className="ml-[20px]">
                        <div>
                            <span className="text-[20px] font-[600] uppercase">{data?.name}</span>
                        </div>
                        <div className="flex text-[red] items-center">
                            <p className="text-[14px] underline">đ</p>
                            <p className="text-[20px] font-[400] ml-[2px]">
                                {data?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-[20px] bg-[#fff] boxShadownHeader py-[30px] px-[40px] h-fit">
                    <p className="text-[#e24141]">
                        * Salon Tóc Việt sẽ liên hệ với bạn trong vài giờ tới khi bạn{' '}
                        <span className="font-[500]">xác nhận mua hàng</span>.
                    </p>
                    <p className="mt-[10px] flex items-center">
                        * Bạn có thể chủ động liên hệ:{' '}
                        <a
                            href={`tel:${dataPhonne.introduce.phone}`}
                            className="text-[#8b8bed] underline flex items-center mx-[8px]"
                        >
                            <div className="text-[10px] mr-[2px]">
                                <BsFillTelephoneFill />
                            </div>
                            {dataPhonne.introduce.phone}
                        </a>
                    </p>
                </div>
            </div>
            <div className="bg-[#fff] boxShadownHeader py-[30px] px-[40px] h-fit">
                <div className="flex items-end">
                    <label className="min-w-[60px]">Phone:</label>
                    <input
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            setValidPhone(false);
                        }}
                        className="ml-[8px] flex-1 outline-none border-[1px] boder-solid border-[#807d7d] px-[6px] py-[2px] rounded-[2px]"
                        placeholder="Phone"
                    />
                </div>
                {validPhone && (
                    <span className="text-[12px] text-[#eb4242] ml-[70px]">Vui lòng nhập số điện thoại.</span>
                )}
                <div className="flex items-end mt-[20px]">
                    <label className="min-w-[60px]">Địa chỉ:</label>
                    <input
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            setValidAddress(false);
                        }}
                        className="ml-[8px] flex-1 outline-none border-[1px] boder-solid border-[#807d7d] px-[6px] py-[2px] rounded-[2px]"
                        placeholder="Address"
                    />
                </div>
                {validAddress && <span className="text-[12px] text-[#eb4242] ml-[70px]">Vui lòng nhập địa chỉ.</span>}
                <div className="flex justify-end mt-[4px]">
                    <p className="text-[12px] font-[500]">Đơn hàng sẽ được giao tới địa chỉ này.</p>
                </div>
                <div className="mt-[20px] flex justify-center gap-[50px]">
                    <Link
                        to={config.routes.product}
                        className="px-[20px] py-[4px] rounded-[2px] cursor-pointer bg-[#e93636] text-[#fff] uppercase"
                    >
                        Hủy
                    </Link>

                    <button
                        disabled={loadingCreate}
                        onClick={handleBuy}
                        className="px-[20px] py-[4px] rounded-[2px] cursor-pointer bg-[#299f33] text-[#fff] uppercase"
                    >
                        {loadingCreate ? (
                            <div className="text-[20px] animate-loading">
                                <BsArrowRepeat />
                            </div>
                        ) : (
                            'Xác nhận'
                        )}
                    </button>
                </div>
            </div>
            {orderSuccess && (
                <div
                    onClick={() => {setOrderSuccess(false); navigate(`${config.routes.product}`)}}
                    className="fixed bg-[#96949423] top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[999]"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="px-[20px] py-[10px] w-[400px] bg-[#fff] rounded-[2px] boxShadownHeader relative"
                    >
                        <div
                            onClick={() => {setOrderSuccess(false); navigate(`${config.routes.product}`)}}
                            className="absolute top-0 right-0 p-[8px] text-[20px] cursor-pointer"
                        >
                            <BsX />
                        </div>
                        <div className="mt-[30px] flex flex-col gap-[10px] pb-[30px] items-center">
                            <div className='text-[40px] text-[#2a9438]'><BsCheck2Circle /></div>
                            <div><span>Đặt hàng thành công</span></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BuyProduct;
