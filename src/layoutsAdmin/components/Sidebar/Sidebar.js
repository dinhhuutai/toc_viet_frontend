import { NavLink } from 'react-router-dom';
import {
    BsRocket,
    BsChevronDown,
    BsWindowFullscreen,
    BsBoxes,
    BsCardImage,
    BsScissors,
    BsCrosshair,
    BsTablet,
    BsBox,
    BsArchive,
    BsChatText,
} from 'react-icons/bs';
import { useState } from 'react';
import config from '~/config';

function Sidebar({ setOpenMenuMobi }) {
    const [downDashboard, setDownDashboard] = useState(false);
    const [downPage, setDownPage] = useState(false);
    const [downApplication, setDownApplication] = useState(false);

    const [downCollection, setDownCollection] = useState(true);
    const [downService, setDownService] = useState(false);
    const [downProduct, setDownProduct] = useState(false);
    const [downComment, setDownComment] = useState(false);

    const hiddenItem = (key) => {
        key !== 'dashboard' && setDownDashboard(false);
        key !== 'page' && setDownPage(false);
        key !== 'application' && setDownApplication(false);
        key !== 'collection' && setDownCollection(false);
        key !== 'service' && setDownService(false);
        key !== 'product' && setDownProduct(false);
        key !== 'comment' && setDownComment(false);
    };

    return (
        <div className="hover:scrollbar-admin-sidebar w-full h-full shadow-lg shadow-indigo-500/50 overflow-y-auto scrollbar-admin-sidebar-none group/parent">
            <ul className="px-[24px] pt-[12px] pb-[22px] mr-[4px] group-hover/parent:mr-[0px]">
                <li>
                    <li className="uppercase text-[#3F69D6] text-[12px] font-[700]">menu</li>
                    <ul className="mt-[12px]">
                        <li>
                            <li
                                onClick={() => {
                                    hiddenItem('dashboard');
                                    setDownDashboard((prev) => !prev);
                                }}
                                className="flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group"
                            >
                                <div className="text-[#999797] group-hover:text-[#333] text-[20px] w-[34px] flex justify-center">
                                    <BsRocket />
                                </div>
                                <span
                                    className={`${
                                        downDashboard
                                            ? 'text-[13px] flex-1 ml-[6px] font-[600]'
                                            : 'text-[13px] flex-1 ml-[6px]'
                                    } capitalize`}
                                >
                                    Dashboards
                                </span>
                                <div
                                    className={`${
                                        downDashboard ? 'rotate-[180deg]' : 'rotate-[0deg]'
                                    } ease-linear duration-[.2s] text-[#999797] group-hover:text-[#333] text-[12px] mr-[10px]`}
                                >
                                    <BsChevronDown />
                                </div>
                            </li>
                            <ul
                                className={`${
                                    downDashboard ? 'animate-downSlide' : 'animate-upSlide'
                                } overflow-hidden pl-[28px] pt-[4px] relative before:content-[""] before:left-[16px] before:absolute before:w-[2px] before:h-full before:bg-[#c0cfd8]`}
                            >
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminAnalytics}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Analytics
                                    </NavLink>
                                </li>
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminChartArea}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Chart Area
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="mt-[6px]">
                            <li
                                onClick={() => {
                                    hiddenItem('page');
                                    setDownPage((prev) => !prev);
                                }}
                                className="flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group"
                            >
                                <div className="text-[#999797] group-hover:text-[#333] text-[20px] w-[34px] flex justify-center">
                                    <BsWindowFullscreen />
                                </div>
                                <span
                                    className={`${
                                        downPage
                                            ? 'text-[13px] flex-1 ml-[6px] font-[600]'
                                            : 'text-[13px] flex-1 ml-[6px]'
                                    } capitalize`}
                                >
                                    pages
                                </span>
                                <div
                                    className={`${
                                        downPage ? 'rotate-[180deg]' : 'rotate-[0deg]'
                                    } ease-linear duration-[.2s] text-[#999797] group-hover:text-[#333] text-[12px] mr-[10px]`}
                                >
                                    <BsChevronDown />
                                </div>
                            </li>
                            <ul
                                className={`${
                                    downPage ? 'animate-downSlide' : 'animate-upSlide'
                                } overflow-hidden pl-[28px] pt-[4px] relative before:content-[""] before:left-[16px] before:absolute before:w-[2px] before:h-full before:bg-[#c0cfd8]`}
                            >
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminExplore}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Explore
                                    </NavLink>
                                </li>
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminHub}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Hub
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="mt-[6px]">
                            <li
                                onClick={() => {
                                    hiddenItem('application');
                                    setDownApplication((prev) => !prev);
                                }}
                                className="flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group"
                            >
                                <div className="text-[#999797] group-hover:text-[#333] text-[20px] w-[34px] flex justify-center">
                                    <BsBoxes />
                                </div>
                                <span
                                    className={`${
                                        downApplication
                                            ? 'text-[13px] flex-1 ml-[6px] font-[600]'
                                            : 'text-[13px] flex-1 ml-[6px]'
                                    } capitalize`}
                                >
                                    applications
                                </span>
                                <div
                                    className={`${
                                        downApplication ? 'rotate-[180deg]' : 'rotate-[0deg]'
                                    } ease-linear duration-[.2s] text-[#999797] group-hover:text-[#333] text-[12px] mr-[10px]`}
                                >
                                    <BsChevronDown />
                                </div>
                            </li>
                            <ul
                                className={`${
                                    downApplication ? 'animate-downSlide1' : 'animate-upSlide1'
                                } overflow-hidden pl-[28px] pt-[4px] relative before:content-[""] before:left-[16px] before:absolute before:w-[2px] before:h-full before:bg-[#c0cfd8]`}
                            >
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminMailBox}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Mailbox
                                    </NavLink>
                                </li>
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminChat}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Chat
                                    </NavLink>
                                </li>
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminSection}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        FAQ Section
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li className="mt-[12px]">
                    <li className="uppercase text-[#3F69D6] text-[12px] font-[700]">Manage</li>
                    <ul className="mt-[12px]">
                        <li>
                            <li
                                onClick={() => {
                                    hiddenItem('collection');
                                    setDownCollection((prev) => !prev);
                                }}
                                className="flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group"
                            >
                                <div className="text-[#999797] group-hover:text-[#333] text-[20px] w-[34px] flex justify-center">
                                    <BsCardImage />
                                </div>
                                <span
                                    className={`${
                                        downCollection
                                            ? 'text-[13px] flex-1 ml-[6px] font-[600]'
                                            : 'text-[13px] flex-1 ml-[6px]'
                                    } capitalize`}
                                >
                                    Bộ sưu tập
                                </span>
                                <div
                                    className={`${
                                        downCollection ? 'rotate-[180deg]' : 'rotate-[0deg]'
                                    } ease-linear duration-[.2s] text-[#999797] group-hover:text-[#333] text-[12px] mr-[10px]`}
                                >
                                    <BsChevronDown />
                                </div>
                            </li>
                            <ul
                                className={`${
                                    downCollection ? 'animate-downSlide' : 'animate-upSlide'
                                } overflow-hidden pl-[28px] pt-[4px] relative before:content-[""] before:left-[16px] before:absolute before:w-[2px] before:h-full before:bg-[#c0cfd8]`}
                            >
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminCollection}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Danh sách
                                    </NavLink>
                                </li>
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminCollectionCreate}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Thêm
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <li
                                onClick={() => {
                                    hiddenItem('service');
                                    setDownService((prev) => !prev);
                                }}
                                className="flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group"
                            >
                                <div className="text-[#999797] group-hover:text-[#333] text-[20px] w-[34px] flex justify-center">
                                    <BsScissors />
                                </div>
                                <span
                                    className={`${
                                        downService
                                            ? 'text-[13px] flex-1 ml-[6px] font-[600]'
                                            : 'text-[13px] flex-1 ml-[6px]'
                                    } capitalize`}
                                >
                                    Dịch vụ
                                </span>
                                <div
                                    className={`${
                                        downService ? 'rotate-[180deg]' : 'rotate-[0deg]'
                                    } ease-linear duration-[.2s] text-[#999797] group-hover:text-[#333] text-[12px] mr-[10px]`}
                                >
                                    <BsChevronDown />
                                </div>
                            </li>
                            <ul
                                className={`${
                                    downService ? 'animate-downSlide' : 'animate-upSlide'
                                } overflow-hidden pl-[28px] pt-[4px] relative before:content-[""] before:left-[16px] before:absolute before:w-[2px] before:h-full before:bg-[#c0cfd8]`}
                            >
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminService}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Danh sách
                                    </NavLink>
                                </li>
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminServiceCreate}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Thêm
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <li
                                onClick={() => {
                                    hiddenItem('product');
                                    setDownProduct((prev) => !prev);
                                }}
                                className="flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group"
                            >
                                <div className="text-[#999797] group-hover:text-[#333] text-[20px] w-[34px] flex justify-center">
                                    <BsArchive />
                                </div>
                                <span
                                    className={`${
                                        downProduct
                                            ? 'text-[13px] flex-1 ml-[6px] font-[600]'
                                            : 'text-[13px] flex-1 ml-[6px]'
                                    } capitalize`}
                                >
                                    Sản phẩm
                                </span>
                                <div
                                    className={`${
                                        downProduct ? 'rotate-[180deg]' : 'rotate-[0deg]'
                                    } ease-linear duration-[.2s] text-[#999797] group-hover:text-[#333] text-[12px] mr-[10px]`}
                                >
                                    <BsChevronDown />
                                </div>
                            </li>
                            <ul
                                className={`${
                                    downProduct ? 'animate-downSlide' : 'animate-upSlide'
                                } overflow-hidden pl-[28px] pt-[4px] relative before:content-[""] before:left-[16px] before:absolute before:w-[2px] before:h-full before:bg-[#c0cfd8]`}
                            >
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminProduct}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Danh sách
                                    </NavLink>
                                </li>
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminProductCreate}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Thêm
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <li
                                onClick={() => {
                                    hiddenItem('comment');
                                    setDownComment((prev) => !prev);
                                }}
                                className="flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group"
                            >
                                <div className="text-[#999797] group-hover:text-[#333] text-[20px] w-[34px] flex justify-center">
                                    <BsChatText />
                                </div>
                                <span
                                    className={`${
                                        downComment
                                            ? 'text-[13px] flex-1 ml-[6px] font-[600]'
                                            : 'text-[13px] flex-1 ml-[6px]'
                                    } capitalize`}
                                >
                                    Bình luận
                                </span>
                                <div
                                    className={`${
                                        downComment ? 'rotate-[180deg]' : 'rotate-[0deg]'
                                    } ease-linear duration-[.2s] text-[#999797] group-hover:text-[#333] text-[12px] mr-[10px]`}
                                >
                                    <BsChevronDown />
                                </div>
                            </li>
                            <ul
                                className={`${
                                    downComment ? 'animate-downSlide1' : 'animate-upSlide1'
                                } overflow-hidden pl-[28px] pt-[4px] relative before:content-[""] before:left-[16px] before:absolute before:w-[2px] before:h-full before:bg-[#c0cfd8]`}
                            >
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminCommentCollection}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Bộ sưu tập
                                    </NavLink>
                                </li>
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminCommentProduct}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Sản phẩm
                                    </NavLink>
                                </li>
                                <li
                                    onClick={() => setOpenMenuMobi(false)}
                                    className="hover:text-[#3F6AD8] text-[13px] mt-[4px] capitalize rounded-[4px] hover:bg-[#E0F3FF] cursor-pointer"
                                >
                                    <NavLink
                                        to={config.routes.adminCommentService}
                                        className={(nav) =>
                                            nav.isActive
                                                ? 'font-[600] text-[#3F6AD8] py-[6px] px-[22px] block w-full'
                                                : 'font-[400] py-[6px] px-[22px] block w-full'
                                        }
                                    >
                                        Dịch vụ
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li onClick={() => setOpenMenuMobi(false)} className="mt-[6px]">
                            <NavLink
                                onClick={() => {
                                    hiddenItem('introduce');
                                }}
                                to={config.routes.adminIntroduce}
                                className={(nav) =>
                                    nav.isActive
                                        ? 'font-[600] flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group '
                                        : `flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group`
                                }
                            >
                                <div className="text-[#999797] group-hover:text-[#333] text-[20px] w-[34px] flex justify-center">
                                    <BsCrosshair />
                                </div>
                                <span className={`text-[13px] flex-1 ml-[6px] capitalize`}>Giới thiệu</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setOpenMenuMobi(false)} className="mt-[6px]">
                            <NavLink
                                onClick={() => {
                                    hiddenItem('priceTable');
                                }}
                                to={config.routes.adminPriceTable}
                                className={(nav) =>
                                    nav.isActive
                                        ? 'font-[600] flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group '
                                        : `flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group`
                                }
                            >
                                <div className="text-[#999797] group-hover:text-[#333] text-[20px] w-[34px] flex justify-center">
                                    <BsTablet />
                                </div>
                                <span className={`text-[13px] flex-1 ml-[6px] capitalize`}>Bảng giá</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setOpenMenuMobi(false)} className="mt-[6px]">
                            <NavLink
                                onClick={() => {
                                    hiddenItem('train');
                                }}
                                to={config.routes.adminTrain}
                                className={(nav) =>
                                    nav.isActive
                                        ? 'font-[600] flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group '
                                        : `flex items-center py-[8px] rounded-[4px] cursor-pointer hover:bg-[#E0F3FF] group`
                                }
                            >
                                <div className="text-[#999797] group-hover:text-[#333] text-[20px] w-[34px] flex justify-center">
                                    <BsBox />
                                </div>
                                <span className={`text-[13px] flex-1 ml-[6px] capitalize`}>Đào tạo</span>
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
