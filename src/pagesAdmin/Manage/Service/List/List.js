import { useEffect, useState } from 'react';
import { BsMusicPlayer, BsStarFill, BsPlusSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import config from '~/config';

import TopTableAdmin from '~/components/TopTableAdmin';
import Table from './Table';
import BottomTableAdmin from '~/components/BottomTableAdmin';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import { noticeAdminSelector } from '~/redux/selectors';


let setTimeoutTmp;

function ListService() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    // data table
    const [data, setData] = useState({
        collection: [],
        totalCollection: 0,
        totalAddToday: 0,
    });

    const [arrangeName, setArrangeName] = useState(true);
    const [arrangeDuration, setArrangeDuration] = useState(false);
    const [arrangeReleaseDate, setArrangeReleaseDate] = useState(false);
    const [arrangeStartDate, setArrangeStartDate] = useState(false);
    const [arrangeLastUpdateDate, setArrangeLastUpdateDate] = useState(false);

    const [selectArrange, setSelectArrange] = useState('name'); // name  |  duration   |   releaseDate   |  startDate  |  lastUpdateDate

    const [listCheck, setListCheck] = useState([]);
    const [listIdDelete, setListIdDelete] = useState([]);

    // share top start
    const [show, setShow] = useState(5);
    const [search, setSearch] = useState('');

    const notice = useSelector(noticeAdminSelector);

    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const dispatch = useDispatch();

    const handleDelete = async () => {
        dispatch(noticeAdminSlice.actions.processingNotice('Đang xóa service'));

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/service/delete`, { listId: listIdDelete });

        if (res.data.success) {
            dispatch(noticeAdminSlice.actions.successNotice('Xóa service thành công'));
            setListCheck([]);

            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [10000]);
        }
    };

    const handleSearch = () => {
        handleGetData();
        setCurrentPage(0);
    };


    // share top end

    // share bottom start
    const [currentPage, setCurrentPage] = useState(0);
    // share bottom end

    useEffect(() => {
        // lấy data
        handleGetData();
    }, [arrangeName, arrangeStartDate, currentPage, show, notice.state]);

    const handleGetData = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/service/find?limit=${show}&skip=${
                    show * currentPage
                }&search=${search}&${
                    selectArrange === 'name'
                        ? `sortName=${arrangeName ? 1 : -1}`
                        : selectArrange === 'startDate'
                        ? `sortCreateDate=${arrangeStartDate ? 1 : -1}`
                        : ''
                }`,
            );

            console.log(res.data)

            if (res.data.success) {
                setData({
                    ...data,
                    service: res.data.service,
                    totalService: res.data.totalService,
                    totalAddToday: res.data.totalAddToday,
                });
                setListCheck([]);
            }
        } catch (error) {}
    };


    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] flex justify-between box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                <div className="flex items-center gap-[20px]">
                    <h1 className="text-[15px] text-[#000000] font-[600] uppercase">Danh sách dịch vụ</h1>
                </div>
                <div className="flex gap-[16px]">
                    <button>
                        <Link
                            className="text-[14px] hover:opacity-[0.8] flex items-center font-[600] bg-[#0098EF] text-[#fff] px-[10px] py-[6px] rounded-[4px] cursor-pointer shadow-lg shadow-indigo-500/10"
                            to={config.routes.adminServiceCreate}
                        >
                            <BsPlusSquare className="mr-[6px] text-[18px]" />
                            Thêm
                        </Link>
                    </button>
                </div>
            </div>

            <div className="min-h-screen bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] py-[10px]">
                <TopTableAdmin
                    handleDelete={handleDelete}
                    handleSearch={handleSearch}
                    setShow={setShow}
                    show={show}
                    search={search}
                    setSearch={setSearch}
                    totalAddToday={data.totalAddToday}
                    setCurrentPage={setCurrentPage}
                />
                <Table
                    services={data.service}
                    show={show}
                    currentPage={currentPage}
                    setArrangeName={setArrangeName}
                    setArrangeDuration={setArrangeDuration}
                    setArrangeReleaseDate={setArrangeReleaseDate}
                    setArrangeStartDate={setArrangeStartDate}
                    setArrangeLastUpdateDate={setArrangeLastUpdateDate}
                    setSelectArrange={setSelectArrange}
                    arrangeName={arrangeName}
                    arrangeDuration={arrangeDuration}
                    arrangeReleaseDate={arrangeReleaseDate}
                    arrangeStartDate={arrangeStartDate}
                    arrangeLastUpdateDate={arrangeLastUpdateDate}
                    selectArrange={selectArrange}
                    setCurrentPage={setCurrentPage}
                    setListIdDelete={setListIdDelete}
                    listCheck={listCheck}
                    setListCheck={setListCheck}
                />
                <BottomTableAdmin
                    setCurrentPage={setCurrentPage}
                    show={show}
                    currentPage={currentPage}
                    totalItems={data.totalService}
                />
            </div>
        </div>
    );
}

export default ListService;