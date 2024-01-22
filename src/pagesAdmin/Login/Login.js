import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowBarLeft, BsEyeSlash, BsEye } from "react-icons/bs";
import config from "~/config";
import axios from "axios";

import bgLogin from '~/assets/images/bg-login.jpg';
import { useDispatch } from "react-redux";
import authSlice from "~/redux/slices/authSlice";

function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [unvisiblePassword, setUnvisiblePassword] = useState(true);

    const [noticeError, setNoticeError] = useState({
        status: false,
        text: '',
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async () => {
        // Xử lý đăng nhập tại đây
        
        if(!username){
            setNoticeError({
                status: true,
                text: 'Bạn chưa nhập username',
            })
        } else if(!password){
            setNoticeError({
                status: true,
                text: 'Bạn chưa nhập passwordd',
            })
        } else {
            const user = {
                username,
                password
            }

            dispatch(authSlice.actions.loginStart());

            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/user/login`, user);

                if(res?.data?.success){
                    
                    dispatch(authSlice.actions.loginSuccess({
                        user: res.data?.user,
                        accessToken: res.data?.accessToken,
                    }));

                    if(res.data.user.isAdmin) {
                        navigate(config.routes.adminCollection);
                    } else {
                        navigate(config.routes.home);
                    }

                } else {
                    dispatch(authSlice.actions.loginFailed());
                }
            } catch (error) {
                setNoticeError({
                    status: true,
                    text: 'username hoặc password không chính xác',
                })
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{backgroundImage: `url(${bgLogin})`}}>
            <div className="bg-white p-8 rounded box-shadow-card-service w-[360px]">
                <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 border rounded outline-none"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value); setNoticeError({status: false,text: '',})}}
                    />
                </div>
                <div className="mb-4 relative">
                    <input
                        type={unvisiblePassword ? 'password' : 'text'}
                        placeholder="Password"
                        className="w-full p-2 border rounded outline-none pr-[30px]"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value); setNoticeError({status: false,text: '',})}}
                    />
                    <button onClick={() => setUnvisiblePassword(prev => !prev)} className='text-[18px] pr-[10px] h-full absolute flex justify-center items-center top-[50%] translate-y-[-50%] right-0'>
                        {
                            unvisiblePassword ? 
                            <button className="flex justify-center items-center">
                                <BsEyeSlash />
                            </button> :
                            <button className="flex justify-center items-center">
                                <BsEye />
                            </button>
                        }
                    </button>
                </div>
                {
                    noticeError.status &&
                    <div className='text-[12px] text-[#e25444dc] my-[8px] font-[600]'>
                        {noticeError.text}
                    </div>
                }
                <button className="bg-blue-500 text-white rounded w-full py-2" onClick={handleLogin}>
                    Đăng nhập
                </button>
                <div className="mt-[16px] flex justify-between">
                    <Link to={config.routes.home} className="flex items-center gap-[2px] cursor-pointer text-[#7a7aba]">
                        <BsArrowBarLeft className="text-[16px]" />
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
