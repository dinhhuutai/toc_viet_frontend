import { useEffect, useState } from 'react';
import Alert from '~/components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector } from '~/redux/selectors';
import axios from 'axios';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsRepeat, BsTrash3, BsX, BsCheck2, BsArrowRepeat } from 'react-icons/bs';

let setTimeoutTmp;

const dataPri = [];

function PriceTable() {
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

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/pricetable/getAll`);

            if (res.data.success) {
                setDatas(res.data.priceTables);
            }
        } catch (error) {}
    };

    const [valueService, setValueService] = useState('');
    const [valueDetail, setValueDetail] = useState('');
    const [valuePrice, setValuePrice] = useState();
    const [valuePriceMin, setValuePriceMin] = useState();
    const [valuePriceMax, setValuePriceMax] = useState();
    const [isPriceRange, setIsPriceRange] = useState(false);

    const [addParent, setAddParent] = useState(false);
    const [addChild, setAddChild] = useState(false);

    const handleAddParent = async () => {
        try {
            if (addChild && valueDetail) {
                if (!valueDetail) {
                } else if (
                    (!isPriceRange && (!valuePrice || valuePrice * 1 < 0)) ||
                    (isPriceRange &&
                        (!valuePriceMin ||
                            valuePriceMin * 1 < 0 ||
                            !valuePriceMax ||
                            valuePriceMax * 1 < 0 ||
                            valuePriceMin * 1 > valuePriceMax * 1))
                ) {
                } else {
                    dispatch(noticeAdminSlice.actions.processingNotice('Đang lưu dịch vụ trước.'));
                    setLoadingCreate(true);

                    const type = {
                        detail: valueDetail,
                        price: valuePrice * 1000 || 0,
                        priceMin: valuePriceMin * 1000 || 0,
                        priceMax: valuePriceMax * 1000 || 0,
                        isPriceRange: isPriceRange,
                    };

                    const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/pricetable/update/${idShow}`, {
                        type,
                    });

                    if (res.data.success) {
                        dispatch(noticeAdminSlice.actions.successNotice('Thêm thành công.'));
                        setTimeoutTmp = setTimeout(() => {
                            dispatch(noticeAdminSlice.actions.hiddenNotice());
                        }, [10000]);

                        setDatas(res.data.priceTables);

                        setTimeout(() => {
                            setLoadingCreate(false);
                        }, 1000);
                    } else {
                        dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                        setTimeoutTmp = setTimeout(() => {
                            dispatch(noticeAdminSlice.actions.hiddenNotice());
                        }, [10000]);
                    }
                }
            }
        } catch (error) {}

        setAddChild(false);
        setValueService('');
        setValueDetail('');
        setValuePrice('');
        setValuePriceMin('');
        setValuePriceMax('');
        setIsPriceRange(false);
        try {
            if (addParent) {
                if (!valueService) {
                    dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập tên dịch vụ.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    return;
                } else if (
                    (!isPriceRange && (!valuePrice || valuePrice * 1 < 0)) ||
                    (isPriceRange &&
                        (!valuePriceMin ||
                            valuePriceMin * 1 < 0 ||
                            !valuePriceMax ||
                            valuePriceMax * 1 < 0 ||
                            valuePriceMin * 1 > valuePriceMax * 1))
                ) {
                    dispatch(noticeAdminSlice.actions.errorNotice('Giá dịch vụ không hợp lệ.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    return;
                }

                dispatch(noticeAdminSlice.actions.processingNotice('Đang lưu dịch vụ trước.'));
                setLoadingCreate(true);

                const formData = {
                    service: valueService,
                    type: [],
                    price: valuePrice * 1000 || 0,
                    priceMin: valuePriceMin * 1000 || 0,
                    priceMax: valuePriceMax * 1000 || 0,
                    isPriceRange: isPriceRange,
                };

                const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/pricetable/create`, formData);

                if (res.data.success) {
                    dispatch(noticeAdminSlice.actions.successNotice('Thêm thành công.'));
                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    setDatas(res.data.priceTables);

                    setValueService('');
                    setValueDetail('');
                    setValuePrice('');
                    setValuePriceMin('');
                    setValuePriceMax('');
                    setIsPriceRange(false);

                    setTimeout(() => {
                        setLoadingCreate(false);
                    }, 1000);
                } else {
                    dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);
                }
            }

            setAddParent(true);
        } catch (error) {
            setTimeout(() => {
                setLoadingCreate(false);
            }, 1000);
        }
    };

    const handleAddChild = async () => {
        try {
            if (addParent) {
                if (!valueService) {
                    dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập tên dịch vụ.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    return;
                } else if (!valueDetail) {
                    dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập loại dịch vụ.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    return;
                } else if (
                    (!isPriceRange && (!valuePrice || valuePrice * 1 < 0)) ||
                    (isPriceRange &&
                        (!valuePriceMin ||
                            valuePriceMin * 1 < 0 ||
                            !valuePriceMax ||
                            valuePriceMax * 1 < 0 ||
                            valuePriceMin * 1 > valuePriceMax * 1))
                ) {
                    dispatch(noticeAdminSlice.actions.errorNotice('Giá dịch vụ không hợp lệ.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    return;
                }

                dispatch(noticeAdminSlice.actions.processingNotice('Đang lưu dịch vụ trước.'));
                setLoadingCreate(true);

                const formData = {
                    service: valueService,
                    type: [
                        {
                            detail: valueDetail,
                            price: valuePrice * 1000 || 0,
                            priceMin: valuePriceMin * 1000 || 0,
                            priceMax: valuePriceMax * 1000 || 0,
                            isPriceRange: isPriceRange,
                        },
                    ],
                };

                const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/pricetable/create`, formData);

                if (res.data.success) {
                    dispatch(noticeAdminSlice.actions.successNotice('Thêm thành công.'));
                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    setDatas(res.data.priceTables);

                    setValueService('');
                    setValueDetail('');
                    setValuePrice('');
                    setValuePriceMin('');
                    setValuePriceMax('');
                    setIsPriceRange(false);

                    setTimeout(() => {
                        setLoadingCreate(false);
                    }, 1000);
                } else {
                    dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);
                }
            }

            setAddParent(false);
        } catch (error) {
            setTimeout(() => {
                setLoadingCreate(false);
            }, 1000);
        }
    };

    const [idShow, setIdShow] = useState('');

    const handleChildAfter = async (id) => {
        try {
            if (addParent) {
                if (!valueService) {
                } else if (
                    (!isPriceRange && (!valuePrice || valuePrice * 1 < 0)) ||
                    (isPriceRange &&
                        (!valuePriceMin ||
                            valuePriceMin * 1 < 0 ||
                            !valuePriceMax ||
                            valuePriceMax * 1 < 0 ||
                            valuePriceMin * 1 > valuePriceMax * 1))
                ) {
                } else {
                    dispatch(noticeAdminSlice.actions.processingNotice('Đang lưu dịch vụ trước.'));
                    setLoadingCreate(true);

                    const formData = {
                        service: valueService,
                        type: [],
                        price: valuePrice * 1000 || 0,
                        priceMin: valuePriceMin * 1000 || 0,
                        priceMax: valuePriceMax * 1000 || 0,
                        isPriceRange: isPriceRange,
                    };

                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/pricetable/create`, formData);

                    if (res.data.success) {
                        dispatch(noticeAdminSlice.actions.successNotice('Thêm thành công.'));
                        setTimeoutTmp = setTimeout(() => {
                            dispatch(noticeAdminSlice.actions.hiddenNotice());
                        }, [10000]);

                        setDatas(res.data.priceTables);

                        setTimeout(() => {
                            setLoadingCreate(false);
                        }, 1000);
                    } else {
                        dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                        setTimeoutTmp = setTimeout(() => {
                            dispatch(noticeAdminSlice.actions.hiddenNotice());
                        }, [10000]);
                    }
                }
            }
        } catch (error) {}

        setAddParent(false);
        setValueService('');
        setValueDetail('');
        setValuePrice('');
        setValuePriceMin('');
        setValuePriceMax('');
        setIsPriceRange(false);
        try {
            if (addChild && (id === idShow || valueDetail)) {
                if (!valueDetail) {
                    dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập loại dịch vụ.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    return;
                } else if (
                    (!isPriceRange && (!valuePrice || valuePrice * 1 < 0)) ||
                    (isPriceRange &&
                        (!valuePriceMin ||
                            valuePriceMin * 1 < 0 ||
                            !valuePriceMax ||
                            valuePriceMax * 1 < 0 ||
                            valuePriceMin * 1 > valuePriceMax * 1))
                ) {
                    dispatch(noticeAdminSlice.actions.errorNotice('Giá dịch vụ không hợp lệ.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    return;
                }

                dispatch(noticeAdminSlice.actions.processingNotice('Đang lưu dịch vụ trước.'));
                setLoadingCreate(true);

                const type = {
                    detail: valueDetail,
                    price: valuePrice * 1000 || 0,
                    priceMin: valuePriceMin * 1000 || 0,
                    priceMax: valuePriceMax * 1000 || 0,
                    isPriceRange: isPriceRange,
                };

                const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/pricetable/update/${idShow}`, {
                    type,
                });

                if (res.data.success) {
                    dispatch(noticeAdminSlice.actions.successNotice('Thêm thành công.'));
                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    setDatas(res.data.priceTables);

                    setValueService('');
                    setValueDetail('');
                    setValuePrice('');
                    setValuePriceMin('');
                    setValuePriceMax('');
                    setIsPriceRange(false);

                    setTimeout(() => {
                        setLoadingCreate(false);
                    }, 1000);
                } else {
                    dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);
                }
            }

            setIdShow(id);
            setAddChild(true);
        } catch (error) {}
    };

    const handleDeleteParent = async (id) => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đang xóa dịch vụ.'));

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/pricetable/delete`, {
                id,
            });

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Xóa dịch vụ thành công'));

                setDatas(res.data.priceTables);

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);
            } else {
                dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);
            }
        } catch (error) {
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [10000]);
        }
    };

    const handleDeleteChild = async (id, idElement) => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đang xóa loại dịch vụ.'));

            const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/pricetable/deleteElement/${id}`, {
                idElement,
            });

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Xóa loại dịch vụ thành công'));

                setDatas(res.data.priceTables);

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);
            } else {
                dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);
            }
        } catch (error) {
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [10000]);
        }
    };

    const [showUpdate, setShowUpdate] = useState({
        type: '', //  service  |  detail  |  price
        idService: '',
        idDetail: '',
        value: '',
        value2: '',
        isPriceRange: false,
    });

    const handleShowUpdateOff = () => {
        setShowUpdate({
            type: '',
            idService: '',
            idDetail: '',
            value: '',
            value2: '',
            isPriceRange: isPriceRange || false,
        });
    };

    const handleShowUpdateOn = async () => {
        try {
            if (!showUpdate.idDetail) {
                let formData = {};

                if (showUpdate.type === 'service') {
                    formData = {
                        service: showUpdate.value,
                    };
                } else if (showUpdate.type === 'price' && showUpdate.isPriceRange === false) {
                    formData = {
                        price: showUpdate.value * 1000,
                        isPriceRange: showUpdate.isPriceRange,
                    };
                } else if (showUpdate.type === 'price' && showUpdate.isPriceRange) {
                    formData = {
                        priceMin: showUpdate.value * 1000,
                        priceMax: showUpdate.value2 * 1000,
                        isPriceRange: showUpdate.isPriceRange,
                    };
                }

                dispatch(noticeAdminSlice.actions.processingNotice('Đang cập nhật dịch vụ.'));

                const res = await axios.put(
                    `${process.env.REACT_APP_API_URL}/v1/pricetable/updateOut/${showUpdate.idService}`,
                    formData,
                );

                if (res.data.success) {
                    dispatch(noticeAdminSlice.actions.successNotice('Cập nhật dịch vụ thành công'));

                    setDatas(res.data.priceTables);

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);
                } else {
                    dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);
                }
            } else {
                let formData = {};

                if (showUpdate.type === 'detail') {
                    formData = {
                        idType: showUpdate.idDetail,
                        detail: showUpdate.value,
                    };
                } else if (showUpdate.type === 'price' && showUpdate.isPriceRange === false) {
                    formData = {
                        idType: showUpdate.idDetail,
                        price: showUpdate.value * 1000,
                        isPriceRange: showUpdate.isPriceRange,
                    };
                } else if (showUpdate.type === 'price' && showUpdate.isPriceRange) {
                    formData = {
                        idType: showUpdate.idDetail,
                        priceMin: showUpdate.value * 1000,
                        priceMax: showUpdate.value2 * 1000,
                        isPriceRange: showUpdate.isPriceRange,
                    };
                }

                dispatch(noticeAdminSlice.actions.processingNotice('Đang cập nhật dịch vụ.'));

                const res = await axios.put(
                    `${process.env.REACT_APP_API_URL}/v1/pricetable/updateIn/${showUpdate.idService}`,
                    formData,
                );

                if (res.data.success) {
                    dispatch(noticeAdminSlice.actions.successNotice('Cập nhật dịch vụ thành công'));

                    setDatas(res.data.priceTables);

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);
                } else {
                    dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);
                }
            }

            setShowUpdate({
                type: '',
                idService: '',
                idDetail: '',
                value: '',
                value2: '',
                isPriceRange: false,
            });
        } catch (error) {
            setShowUpdate({
                type: '',
                idService: '',
                idDetail: '',
                value: '',
                value2: '',
                isPriceRange: false,
            });
        }
    };

    const handleShowUpdate = (type, idService, idDetail, value, value2, isPriceRange) => {
        setShowUpdate({
            type: type || 'service',
            idService: idService || '',
            idDetail: idDetail || '',
            value: value || '',
            value2: value2 || '',
            isPriceRange: isPriceRange || false,
        });
    };

    const handleSave = async () => {
        try {
            if (addParent) {
                if (!valueService) {
                    dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập tên dịch vụ.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    return;
                } else if (
                    (!isPriceRange && (!valuePrice || valuePrice * 1 < 0)) ||
                    (isPriceRange &&
                        (!valuePriceMin ||
                            valuePriceMin * 1 < 0 ||
                            !valuePriceMax ||
                            valuePriceMax * 1 < 0 ||
                            valuePriceMin * 1 > valuePriceMax * 1))
                ) {
                    dispatch(noticeAdminSlice.actions.errorNotice('Giá dịch vụ không hợp lệ.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    return;
                }

                dispatch(noticeAdminSlice.actions.processingNotice('Đang lưu dịch vụ trước.'));
                setLoadingCreate(true);

                const formData = {
                    service: valueService,
                    type: [],
                    price: valuePrice * 1000 || 0,
                    priceMin: valuePriceMin * 1000 || 0,
                    priceMax: valuePriceMax * 1000 || 0,
                    isPriceRange: isPriceRange,
                };

                const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/pricetable/create`, formData);

                if (res.data.success) {
                    dispatch(noticeAdminSlice.actions.successNotice('Thêm thành công.'));
                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    setDatas(res.data.priceTables);

                    setValueService('');
                    setValueDetail('');
                    setValuePrice('');
                    setValuePriceMin('');
                    setValuePriceMax('');
                    setIsPriceRange(false);

                    setTimeout(() => {
                        setLoadingCreate(false);
                    }, 1000);
                } else {
                    dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);
                }
            }

            if (addChild) {
                if (!valueDetail) {
                    dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập loại dịch vụ.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    return;
                } else if (
                    (!isPriceRange && (!valuePrice || valuePrice * 1 < 0)) ||
                    (isPriceRange &&
                        (!valuePriceMin ||
                            valuePriceMin * 1 < 0 ||
                            !valuePriceMax ||
                            valuePriceMax * 1 < 0 ||
                            valuePriceMin * 1 > valuePriceMax * 1))
                ) {
                    dispatch(noticeAdminSlice.actions.errorNotice('Giá dịch vụ không hợp lệ.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    return;
                }

                dispatch(noticeAdminSlice.actions.processingNotice('Đang lưu dịch vụ trước.'));
                setLoadingCreate(true);

                const type = {
                    detail: valueDetail,
                    price: valuePrice * 1000 || 0,
                    priceMin: valuePriceMin * 1000 || 0,
                    priceMax: valuePriceMax * 1000 || 0,
                    isPriceRange: isPriceRange,
                };

                const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/pricetable/update/${idShow}`, {
                    type,
                });

                if (res.data.success) {
                    dispatch(noticeAdminSlice.actions.successNotice('Thêm thành công.'));
                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);

                    setDatas(res.data.priceTables);

                    setValueService('');
                    setValueDetail('');
                    setValuePrice('');
                    setValuePriceMin('');
                    setValuePriceMax('');
                    setIsPriceRange(false);

                    setTimeout(() => {
                        setLoadingCreate(false);
                    }, 1000);
                } else {
                    dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống! Vui lòng thêm lại.'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [10000]);
                }
            }

            setAddParent(false);
            setAddChild(false);

        } catch (error) {}
    };

    return (
        <div className="py-[10px] px-[14px]">
            <div className="bg-[#fff] box-shadow-card-service-2 px-[20px] py-[10px] rounded-[4px] text-[15px] uppercase font-[600]">
                Bảng giá
            </div>
            <div className="min-h-screen bg-[#fff] rounded-[4px] box-shadow-card-service mt-[10px] px-[20px] pt-[20px] pb-[60px]">
                <table className="w-[100%] lg:overflow-hidden">
                    <thead className="w-[100%]">
                        <tr className="border-[1px] border-solid border-[#b97e3b] w-[100%]">
                            <th className="w-[33.33%] text-center py-[4px]">Dịch vụ</th>
                            <th className="w-[33.33%] text-center border-x-[1px] border-solid border-x-[#b97e3b]">
                                Loại
                            </th>
                            <th className="w-[33.33%] text-center">Giá</th>
                        </tr>
                    </thead>
                    <tbody className='w-[100%]'>
                        {datas.map((data, index) => (
                            <tr key={index} className="border-[1px] border-solid border-[#b97e3b] w-[100%]">
                                <td className="font-[650] w-[33.33%] py-[4px]">
                                    <div className="flex pr-[10px] items-center">
                                        <Alert
                                            funcHandle={() => handleDeleteParent(data._id)}
                                            title="Xóa"
                                            content={`Bạn có chắc chắn muốn xóa dịch vụ này?`}
                                        >
                                            <button className="px-[14px] cursor-pointer text-[20px] items-center flex">
                                                <BsTrash3 />
                                            </button>
                                        </Alert>
                                        {showUpdate.type === 'service' && showUpdate.idService === data._id ? (
                                            <div className="flex gap-[6px] flex-1">
                                                <input
                                                    value={showUpdate.value}
                                                    onChange={(e) =>
                                                        setShowUpdate({ ...showUpdate, value: e.target.value })
                                                    }
                                                    className="border-[1px] border-solid border-[#333] rounded-[2px] py-[2px] px-[8px] outline-none"
                                                />
                                                <button
                                                    onClick={handleShowUpdateOn}
                                                    className="px-[4px] py-[4px] bg-[#4ecb40] text-[#fff] text-[18px] rounded-[2px]"
                                                >
                                                    <BsCheck2 />
                                                </button>
                                                <button
                                                    onClick={handleShowUpdateOff}
                                                    className="px-[4px] py-[4px] bg-[#f1513f] text-[#fff] text-[18px] rounded-[2px]"
                                                >
                                                    <BsX />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onDoubleClick={() =>
                                                    handleShowUpdate('service', data._id, '', data.service, '', false)
                                                }
                                                className="w-full text-start flex"
                                            >
                                                {data.service}
                                            </button>
                                        )}
                                    </div>
                                </td>
                                <tr className="w-[200%] flex">
                                    <td className="w-[50%] block border-x-[1px] border-solid border-x-[#b97e3b]">
                                        {data.type.length > 0 ? (
                                            data.type.map((ty, i) => (
                                                <tr
                                                    className={`${
                                                        data.type.length - 1 !== i
                                                            ? 'border-b-[1px] border-dashed border-b-[#b97e3b]'
                                                            : ''
                                                    } w-[100%] block`}
                                                >
                                                    <td className="py-[4px] block">
                                                        <div className="flex pr-[10px] items-center">
                                                            <Alert
                                                                funcHandle={() => handleDeleteChild(data._id, ty._id)}
                                                                title="Xóa"
                                                                content={`Bạn có chắc chắn muốn xóa loại dịch vụ này?`}
                                                            >
                                                                <button className="px-[14px] cursor-pointer text-[20px] items-center flex">
                                                                    <BsTrash3 />
                                                                </button>
                                                            </Alert>
                                                            {showUpdate.type === 'detail' &&
                                                            showUpdate.idService === data._id &&
                                                            showUpdate.idDetail === ty._id ? (
                                                                <div className="flex gap-[6px]">
                                                                    <input
                                                                        value={showUpdate.value}
                                                                        onChange={(e) =>
                                                                            setShowUpdate({
                                                                                ...showUpdate,
                                                                                value: e.target.value,
                                                                            })
                                                                        }
                                                                        className="border-[1px] border-solid border-[#333] m-[-1px] rounded-[2px] py-[2px] px-[8px] outline-none"
                                                                    />
                                                                    <button
                                                                        onClick={handleShowUpdateOn}
                                                                        className="px-[4px] py-[2px] bg-[#4ecb40] text-[#fff] text-[18px] rounded-[2px]"
                                                                    >
                                                                        <BsCheck2 />
                                                                    </button>
                                                                    <button
                                                                        onClick={handleShowUpdateOff}
                                                                        className="px-[4px] py-[2px] bg-[#f1513f] text-[#fff] text-[18px] rounded-[2px]"
                                                                    >
                                                                        <BsX />
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onDoubleClick={() =>
                                                                        handleShowUpdate(
                                                                            'detail',
                                                                            data._id,
                                                                            ty._id,
                                                                            ty.detail,
                                                                            '',
                                                                            false,
                                                                        )
                                                                    }
                                                                    className="w-full text-start py-[2px]"
                                                                >
                                                                    {ty.detail}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <td className="py-[4px] w-[100%] block pl-[12px]">-</td>
                                        )}
                                    </td>
                                    <td className="w-[50%] text-center block">
                                        {data.type.length > 0 ? (
                                            data.type.map((ty, i) => (
                                                <tr
                                                    className={`w-[100%] px-[4px] block ${
                                                        data.type.length - 1 !== i
                                                            ? 'border-b-[1px] border-dashed border-b-[#b97e3b]'
                                                            : ''
                                                    }`}
                                                >
                                                    <td className="w-fit lg:w-[100%] py-[6px] block">
                                                        {showUpdate.type === 'price' &&
                                                        showUpdate.idService === data._id &&
                                                        showUpdate.idDetail === ty._id ? (
                                                            <div className="flex gap-[20px] px-[8px]">
                                                                {showUpdate.isPriceRange ? (
                                                                    <div className="flex gap-[6px]">
                                                                        <div className="flex gap-[2px]">
                                                                            <input
                                                                                value={showUpdate.value}
                                                                                onChange={(e) =>
                                                                                    setShowUpdate({
                                                                                        ...showUpdate,
                                                                                        value: e.target.value,
                                                                                    })
                                                                                }
                                                                                className="border-[1px] border-solid border-[#333] w-[50px] m-[0px] rounded-[2px] py-[2px] px-[8px] outline-none"
                                                                            />
                                                                            <p className="flex uppercase text-[16px]">
                                                                                K
                                                                            </p>
                                                                        </div>
                                                                        <p className="flex items-center text-[14px]">
                                                                            -
                                                                        </p>
                                                                        <div className="flex gap-[2px]">
                                                                            <input
                                                                                value={showUpdate.value2}
                                                                                onChange={(e) =>
                                                                                    setShowUpdate({
                                                                                        ...showUpdate,
                                                                                        value2: e.target.value,
                                                                                    })
                                                                                }
                                                                                className="border-[1px] border-solid border-[#333] w-[50px] m-[0px] rounded-[2px] py-[2px] px-[8px] outline-none"
                                                                            />
                                                                            <p className="flex uppercase text-[16px]">
                                                                                K
                                                                            </p>
                                                                        </div>
                                                                        <button
                                                                            onClick={handleShowUpdateOn}
                                                                            className="px-[4px] py-[2px] bg-[#4ecb40] text-[#fff] text-[18px] rounded-[2px]"
                                                                        >
                                                                            <BsCheck2 />
                                                                        </button>
                                                                        <button
                                                                            onClick={handleShowUpdateOff}
                                                                            className="px-[4px] py-[2px] bg-[#f1513f] text-[#fff] text-[18px] rounded-[2px]"
                                                                        >
                                                                            <BsX />
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex gap-[6px]">
                                                                        <input
                                                                            value={showUpdate.value}
                                                                            onChange={(e) =>
                                                                                setShowUpdate({
                                                                                    ...showUpdate,
                                                                                    value: e.target.value,
                                                                                })
                                                                            }
                                                                            className="border-[1px] border-solid border-[#333] w-[100px] m-[-2px] rounded-[2px] py-[2px] px-[8px] outline-none"
                                                                        />
                                                                        <p className="flex uppercase text-[16px]">K</p>
                                                                        <button
                                                                            onClick={handleShowUpdateOn}
                                                                            className="px-[4px] py-[2px] bg-[#4ecb40] text-[#fff] text-[18px] rounded-[2px]"
                                                                        >
                                                                            <BsCheck2 />
                                                                        </button>
                                                                        <button
                                                                            onClick={handleShowUpdateOff}
                                                                            className="px-[4px] py-[2px] bg-[#f1513f] text-[#fff] text-[18px] rounded-[2px]"
                                                                        >
                                                                            <BsX />
                                                                        </button>
                                                                    </div>
                                                                )}

                                                                <button
                                                                    onClick={() =>
                                                                        setShowUpdate({
                                                                            ...showUpdate,
                                                                            isPriceRange: !showUpdate.isPriceRange,
                                                                        })
                                                                    }
                                                                    className="pl-[10px] cursor-pointer text-[20px] items-center flex border-l-[1px] border-solid border-[#333]"
                                                                >
                                                                    <BsRepeat />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onDoubleClick={() =>
                                                                    handleShowUpdate(
                                                                        'price',
                                                                        data._id,
                                                                        ty._id,
                                                                        '',
                                                                        '',
                                                                        false,
                                                                    )
                                                                }
                                                                className="w-full text-center py-[0px]"
                                                            >
                                                                {ty.isPriceRange
                                                                    ? `${(ty.priceMin / 1000)
                                                                          .toString()
                                                                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}K - ${(
                                                                          ty.priceMax / 1000
                                                                      )
                                                                          .toString()
                                                                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}K`
                                                                    : (ty.price / 1000)
                                                                          .toString()
                                                                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'K'}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <td className="w-fit lg:w-[100%] text-center py-[4px] lg:px-[0px] px-[4px] block">
                                                {showUpdate.type === 'price' && showUpdate.idService === data._id ? (
                                                    <div className="flex gap-[20px] px-[8px]">
                                                        {showUpdate.isPriceRange ? (
                                                            <div className="flex gap-[6px]">
                                                                <div className="flex gap-[2px]">
                                                                    <input
                                                                        value={showUpdate.value}
                                                                        onChange={(e) =>
                                                                            setShowUpdate({
                                                                                ...showUpdate,
                                                                                value: e.target.value,
                                                                            })
                                                                        }
                                                                        className="border-[1px] border-solid border-[#333] w-[50px] m-[0px] rounded-[2px] py-[2px] px-[8px] outline-none"
                                                                    />
                                                                    <p className="flex uppercase text-[16px]">K</p>
                                                                </div>
                                                                <p className="flex items-center text-[14px]">-</p>
                                                                <div className="flex gap-[2px]">
                                                                    <input
                                                                        value={showUpdate.value2}
                                                                        onChange={(e) =>
                                                                            setShowUpdate({
                                                                                ...showUpdate,
                                                                                value2: e.target.value,
                                                                            })
                                                                        }
                                                                        className="border-[1px] border-solid border-[#333] w-[50px] m-[0px] rounded-[2px] py-[2px] px-[8px] outline-none"
                                                                    />
                                                                    <p className="flex uppercase text-[16px]">K</p>
                                                                </div>
                                                                <button
                                                                    onClick={handleShowUpdateOn}
                                                                    className="px-[4px] py-[2px] bg-[#4ecb40] text-[#fff] text-[18px] rounded-[2px]"
                                                                >
                                                                    <BsCheck2 />
                                                                </button>
                                                                <button
                                                                    onClick={handleShowUpdateOff}
                                                                    className="px-[4px] py-[2px] bg-[#f1513f] text-[#fff] text-[18px] rounded-[2px]"
                                                                >
                                                                    <BsX />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex gap-[6px]">
                                                                <input
                                                                    value={showUpdate.value}
                                                                    onChange={(e) =>
                                                                        setShowUpdate({
                                                                            ...showUpdate,
                                                                            value: e.target.value,
                                                                        })
                                                                    }
                                                                    className="border-[1px] border-solid border-[#333] w-[100px] m-[-2px] rounded-[2px] py-[2px] px-[8px] outline-none"
                                                                />
                                                                <p className="flex uppercase text-[16px]">K</p>
                                                                <button
                                                                    onClick={handleShowUpdateOn}
                                                                    className="px-[4px] py-[2px] bg-[#4ecb40] text-[#fff] text-[18px] rounded-[2px]"
                                                                >
                                                                    <BsCheck2 />
                                                                </button>
                                                                <button
                                                                    onClick={handleShowUpdateOff}
                                                                    className="px-[4px] py-[2px] bg-[#f1513f] text-[#fff] text-[18px] rounded-[2px]"
                                                                >
                                                                    <BsX />
                                                                </button>
                                                            </div>
                                                        )}

                                                        <button
                                                            onClick={() =>
                                                                setShowUpdate({
                                                                    ...showUpdate,
                                                                    isPriceRange: !showUpdate.isPriceRange,
                                                                })
                                                            }
                                                            className="pl-[10px] cursor-pointer text-[20px] items-center flex border-l-[1px] border-solid border-[#333]"
                                                        >
                                                            <BsRepeat />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onDoubleClick={() =>
                                                            handleShowUpdate('price', data._id, '', '', '', false)
                                                        }
                                                        className="w-full text-center py-[0px]"
                                                    >
                                                        {data.isPriceRange
                                                            ? `${(data.priceMin / 1000)
                                                                  .toString()
                                                                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}K - ${(
                                                                  data.priceMax / 1000
                                                              )
                                                                  .toString()
                                                                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}K`
                                                            : (data.price / 1000)
                                                                  .toString()
                                                                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'K'}
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </td>
                                </tr>
                                {addChild && idShow === data._id && (
                                    <tr className="w-[200%] flex border-t-[1px] border-dashed border-[#b97e3b]">
                                        <td className="w-[50%] block border-x-[1px] border-solid border-[#b97e3b] py-[4px]">
                                            <div className="flex pr-[10px]">
                                                <button
                                                    onClick={() => {
                                                        setAddChild(false);
                                                        setIdShow('');
                                                    }}
                                                    className="px-[10px] cursor-pointer text-[20px] items-center flex"
                                                >
                                                    <BsTrash3 />
                                                </button>
                                                <input
                                                    value={valueDetail}
                                                    onChange={(e) => setValueDetail(e.target.value)}
                                                    type="text"
                                                    className="border-[1px] border-solid border-[#000] w-[100%] rounded-[2px] outline-none px-[8px] py-[2px]"
                                                />
                                            </div>
                                        </td>
                                        <td className="w-[50%] py-[4px] px-[10px] flex">
                                            {isPriceRange ? (
                                                <div className="flex gap-[6px] pr-[20px] justify-around">
                                                    <div className="w-[80px] flex">
                                                        <input
                                                            value={valuePriceMin}
                                                            onChange={(e) => setValuePriceMin(e.target.value)}
                                                            type="text"
                                                            className="border-[1px] border-solid border-[#000] w-[100%] rounded-[2px] outline-none px-[8px] py-[2px]"
                                                        />
                                                        <p className="text-[16px] uppercase ml-[2px]">K</p>
                                                    </div>
                                                    <p className="flex items-center text-[18px]">-</p>
                                                    <div className="w-[80px] flex">
                                                        <input
                                                            value={valuePriceMax}
                                                            onChange={(e) => setValuePriceMax(e.target.value)}
                                                            type="text"
                                                            className="border-[1px] border-solid border-[#000] w-[100%] rounded-[2px] outline-none px-[8px] py-[2px]"
                                                        />
                                                        <p className="text-[16px] uppercase ml-[2px]">K</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex pr-[10px]">
                                                    <input
                                                        value={valuePrice}
                                                        onChange={(e) => setValuePrice(e.target.value)}
                                                        type="text"
                                                        className="border-[1px] border-solid border-[#000] w-[100%] rounded-[2px] outline-none px-[8px] py-[2px]"
                                                    />
                                                    <p className="text-[16px] uppercase ml-[2px]">K</p>
                                                </div>
                                            )}
                                            <button
                                                onClick={() => setIsPriceRange((prev) => !prev)}
                                                className="pl-[10px] cursor-pointer text-[20px] items-center flex border-l-[1px] border-solid border-[#333]"
                                            >
                                                <BsRepeat />
                                            </button>
                                        </td>
                                    </tr>
                                )}
                                <tr
                                    onClick={() => handleChildAfter(data._id)}
                                    className="w-[200%] flex border-y-[1px] border-l-[1px] border-solid border-[#b97e3b]"
                                >
                                    <td className="font-[650] w-[100%] py-[6px] px-[20px] text-center cursor-pointer">
                                        <button className="w-[100%] flex justify-center text-[20px] text-[#5c5656]">
                                            <AiOutlinePlus />
                                        </button>
                                    </td>
                                </tr>
                            </tr>
                        ))}
                        {addParent && (
                            <tr className="border-[1px] border-solid border-[#b97e3b]">
                                <td className="font-[650] w-[33.33%] py-[4px]">
                                    <div className="flex pr-[10px]">
                                        <button
                                            onClick={() => setAddParent(false)}
                                            className="px-[10px] cursor-pointer text-[20px] items-center flex"
                                        >
                                            <BsTrash3 />
                                        </button>
                                        <input
                                            value={valueService}
                                            onChange={(e) => setValueService(e.target.value)}
                                            type="text"
                                            className="border-[1px] border-solid border-[#000] w-[100%] rounded-[2px] outline-none px-[8px] py-[2px]"
                                        />
                                    </div>
                                </td>
                                <tr className="w-[200%] flex">
                                    <td className="w-[50%] block border-x-[1px] border-solid border-x-[#b97e3b] py-[4px] px-[20px]">
                                        <input
                                            value={valueDetail}
                                            onChange={(e) => setValueDetail(e.target.value)}
                                            type="text"
                                            className="border-[1px] border-solid border-[#000] w-[100%] rounded-[2px] outline-none px-[8px] py-[2px]"
                                        />
                                    </td>
                                    <td className="w-[50%] py-[4px] px-[10px] flex">
                                        {isPriceRange ? (
                                            <div className="flex gap-[6px] pr-[20px] justify-around">
                                                <div className="w-[80px] flex">
                                                    <input
                                                        value={valuePriceMin}
                                                        onChange={(e) => setValuePriceMin(e.target.value)}
                                                        type="text"
                                                        className="border-[1px] border-solid border-[#000] w-[100%] rounded-[2px] outline-none px-[8px] py-[2px]"
                                                    />
                                                    <p className="text-[16px] uppercase ml-[2px]">K</p>
                                                </div>
                                                <p className="flex items-center text-[18px]">-</p>
                                                <div className="w-[80px] flex">
                                                    <input
                                                        value={valuePriceMax}
                                                        onChange={(e) => setValuePriceMax(e.target.value)}
                                                        type="text"
                                                        className="border-[1px] border-solid border-[#000] w-[100%] rounded-[2px] outline-none px-[8px] py-[2px]"
                                                    />
                                                    <p className="text-[16px] uppercase ml-[2px]">K</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex pr-[10px]">
                                                <input
                                                    value={valuePrice}
                                                    onChange={(e) => setValuePrice(e.target.value)}
                                                    type="text"
                                                    className="border-[1px] border-solid border-[#000] w-[50%] rounded-[2px] outline-none px-[8px] py-[2px]"
                                                />
                                                <p className="text-[16px] uppercase ml-[2px]">K</p>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => setIsPriceRange((prev) => !prev)}
                                            className="pl-[10px] cursor-pointer text-[20px] items-center flex border-l-[1px] border-solid border-[#333]"
                                        >
                                            <BsRepeat />
                                        </button>
                                    </td>
                                </tr>
                                <tr
                                    onClick={() => handleAddChild()}
                                    className="w-[200%] flex border-y-[1px] border-l-[1px] border-solid border-[#b97e3b]"
                                >
                                    <td className="font-[650] w-[100%] py-[6px] px-[20px] text-center cursor-pointer">
                                        <button className="w-[100%] flex justify-center text-[20px] text-[#5c5656]">
                                            <AiOutlinePlus />
                                        </button>
                                    </td>
                                </tr>
                            </tr>
                        )}
                        <tr
                            onClick={() => handleAddParent()}
                            className="border-[1px] w-full border-solid border-[#b97e3b]"
                        >
                            <td className="font-[650] w-[300%] block py-[6px] px-[20px] text-center cursor-pointer">
                                <button className="w-[100%] flex justify-center text-[20px] text-[#5c5656]">
                                    <AiOutlinePlus />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-center mt-[50px]">
                    <button
                        disabled={loadingCreate || notice.state}
                        onClick={handleSave}
                        className={`${
                            loadingCreate || notice.state ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                        } w-[120px] h-[30px] flex justify-center items-center bg-[#259d23] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                    >
                        {loadingCreate || notice.state ? (
                            <div className="text-[20px] animate-loading">
                                <BsArrowRepeat />
                            </div>
                        ) : (
                            'Lưu'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PriceTable;
