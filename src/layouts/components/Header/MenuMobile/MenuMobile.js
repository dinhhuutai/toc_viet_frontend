import { BsX } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import config from '~/config';
import { BsCalendar2WeekFill } from 'react-icons/bs';
import modalBookSlice from '~/redux/slices/modalBookSlice';
import { useDispatch } from 'react-redux';

function MenuMobile({ setOpenMenuMobi, openMenuMobi }) {
    const dispatch = useDispatch();

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`${openMenuMobi ? "animate-menuMobiOn" : "animate-menuMobiOff"} w-0 top-[0px] left-0 bottom-0 fixed bg-[#fff] py-[8px] px-[6px] box-shadow-card-service`}
        >
            <div className="flex flex-col justify-end">
                <div onClick={() => setOpenMenuMobi(false)} className="flex justify-end">
                    <BsX className="text-[38px]" />
                </div>
                <div className="mt-[10px]">
                    <ul className="flex flex-col gap-[20px] w-full">
                        <li className="uppercase flex">
                            <NavLink
                                onClick={() => setOpenMenuMobi(false)}
                                className={(nav) =>
                                    nav.isActive
                                        ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b] w-full'
                                        : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px] w-full'
                                }
                                to={config.routes.home}
                            >
                                Tóc Việt
                            </NavLink>
                        </li>
                        <li className="uppercase flex">
                            <NavLink
                                onClick={() => setOpenMenuMobi(false)}
                                className={(nav) =>
                                    nav.isActive
                                        ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b] w-full'
                                        : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px] w-full'
                                }
                                to={config.routes.service}
                            >
                                Dịch Vụ
                            </NavLink>
                        </li>
                        <li className="uppercase flex">
                            <NavLink
                                onClick={() => setOpenMenuMobi(false)}
                                className={(nav) =>
                                    nav.isActive
                                        ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b] w-full'
                                        : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px] w-full'
                                }
                                to={config.routes.product}
                            >
                                Sản phẩm
                            </NavLink>
                        </li>
                        <li className="uppercase flex">
                            <NavLink
                                onClick={() => setOpenMenuMobi(false)}
                                className={(nav) =>
                                    nav.isActive
                                        ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b] w-full'
                                        : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px] w-full'
                                }
                                to={config.routes.collection}
                            >
                                bộ sưu tập
                            </NavLink>
                        </li>
                        <li className="uppercase flex">
                            <NavLink
                                onClick={() => setOpenMenuMobi(false)}
                                className={(nav) =>
                                    nav.isActive
                                        ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b] w-full'
                                        : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px] w-full'
                                }
                                to={config.routes.train}
                            >
                                đào tạo
                            </NavLink>
                        </li>
                        <li className="uppercase flex">
                            <NavLink
                                onClick={() => setOpenMenuMobi(false)}
                                className={(nav) =>
                                    nav.isActive
                                        ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b] w-full'
                                        : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px] w-full'
                                }
                                to={config.routes.contact}
                            >
                                Liên hệ
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div onClick={() => dispatch(modalBookSlice.actions.openModalBook())} className="mt-[30px]">
                    <div onClick={() => setOpenMenuMobi(false)} className="flex bg-[#000] items-center w-fit rounded-[4px] px-[12px] py-[6px] cursor-pointer">
                        <div className="uppercase text-[#fff] text-[12px] font-[600]">Đặt lịch</div>
                        <div className="ml-[8px] text-[#fff] flex items-center">
                            <BsCalendar2WeekFill />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuMobile;
