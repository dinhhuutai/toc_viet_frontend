import { NavLink } from 'react-router-dom';
import config from '~/config';

import Search from './Search';

function HeaderLeft() {
    return (
        <div className="flex-col flex items-center">
            <Search />
            <div className="mt-[10px]">
                <ul className="flex gap-[20px]">
                    <li className="uppercase">
                        <NavLink
                            className={(nav) =>
                                nav.isActive
                                    ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b]'
                                    : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px]'
                            }
                            to={config.routes.home}
                        >
                            Tóc Việt
                        </NavLink>
                    </li>
                    <li className="uppercase">
                        <NavLink
                            className={(nav) =>
                                nav.isActive
                                    ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b]'
                                    : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px]'
                            }
                            to={config.routes.service}
                        >
                            Dịch Vụ
                        </NavLink>
                    </li>
                    <li className="uppercase">
                        <NavLink
                            className={(nav) =>
                                nav.isActive
                                    ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b]'
                                    : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px]'
                            }
                            to={config.routes.product}
                        >
                            Sản phẩm
                        </NavLink>
                    </li>
                    <li className="uppercase">
                        <NavLink
                            className={(nav) =>
                                nav.isActive
                                    ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b]'
                                    : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px]'
                            }
                            to={config.routes.collection}
                        >
                            bộ sưu tập
                        </NavLink>
                    </li>
                    <li className="uppercase">
                        <NavLink
                            className={(nav) =>
                                nav.isActive
                                    ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b]'
                                    : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px]'
                            }
                            to={config.routes.train}
                        >
                            đào tạo
                        </NavLink>
                    </li>
                    <li className="uppercase">
                        <NavLink
                            className={(nav) =>
                                nav.isActive
                                    ? 'text-[12px] font-[700] px-[14px] py-[4px] text-[#b97e3b]'
                                    : 'text-[#000] text-[12px] font-[700] px-[14px] py-[4px]'
                            }
                            to={config.routes.contact}
                        >
                            Liên hệ
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HeaderLeft;
