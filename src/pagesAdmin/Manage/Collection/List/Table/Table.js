import { useEffect, useRef } from 'react';
import { BsCaretUpFill, BsCaretDownFill, BsCaretDown, BsCaretUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import config from '~/config';

function Table({
    collections,
    show,
    currentPage,
    setArrangeName,
    setArrangeDuration,
    setArrangeReleaseDate,
    setArrangeStartDate,
    setArrangeLastUpdateDate,
    setSelectArrange,
    arrangeName,
    arrangeDuration,
    arrangeReleaseDate,
    arrangeStartDate,
    arrangeLastUpdateDate,
    selectArrange,
    setCurrentPage,
    setListIdDelete,
    listCheck,
    setListCheck
}) {
    const handleArrange = (type) => {
        setSelectArrange(type);
        if (type === 'name') {
            setArrangeName((prev) => !prev);
        } else if (type === 'startDate') {
            setArrangeStartDate((prev) => !prev);
        } else if (type === 'lastUpdateDate') {
            setArrangeLastUpdateDate((prev) => !prev);
        } else if (type === 'releaseDate') {
            setArrangeReleaseDate((prev) => !prev);
        } else if (type === 'duration') {
            setArrangeDuration((prev) => !prev);
        }
        setCurrentPage(0);
    };


 
    const handleCheckInput = (e) => {
        if(e.target.checked){
            const newArray = [];
            for(var i = 0; i < show; i++){
                newArray.push(i);
            }
            setListCheck(newArray);
        } else {
            setListCheck([]);
        }
    }


    const refInputAll = useRef();

    const handleCheckItem = (index, e) => {
        if(e.target.checked) {
            setListCheck([...listCheck, index]);
        } else {
            const newArray = listCheck.filter(el => el !== index);
            setListCheck(newArray);
        }

    }

    useEffect(() => {
        var checks = document.querySelectorAll('input[name=inputCheckboxArtistList]:checked');

        const newArray = [];
        checks.forEach((check) => {
            newArray.push(check.getAttribute('data-id'));
        });
        

        if(newArray.length === collections?.length && collections?.length !== 0) {
            refInputAll.current.checked = true;
        } else {
            refInputAll.current.checked = false;
        }

        const endArray = newArray.filter((item) => item !== null);
        
        setListIdDelete(endArray);
    }, [listCheck]);



 
    return (
        <div className="mt-[20px] overflow-auto scrollbar-admin-sidebar">
            <table className="w-full flex flex-col justify-center">
                <thead className="w-full bg-[#fff]">
                    <tr className="flex w-full border-[1px] border-solid border-[#c4b8b8] rounded-t-[4px]">
                        <th className="w-[30px] shrink-0 border-r-solid border-r-[1px] border-r-[#c4b8b8] flex justify-center items-center">
                            <input ref={refInputAll} onChange={e => handleCheckInput(e)} type="checkbox" />
                        </th>
                        <th className="w-[50px] shrink-0 border-r-solid border-r-[1px] border-r-[#c4b8b8] flex justify-center items-center">
                            STT
                        </th>
                        <th className='flex-1'>
                            <button
                                onClick={() => handleArrange('name')}
                                className="w-full shrink-0 cursor-pointer border-r-solid border-r-[1px] border-r-[#c4b8b8] px-[10px] py-[4px] flex items-center justify-between"
                            >
                                <span>Name</span>
                                <div className="flex items-center">
                                    {selectArrange === 'name' ? (
                                        arrangeName ? (
                                            <>
                                                <BsCaretUpFill />
                                                <BsCaretDown />
                                            </>
                                        ) : (
                                            <>
                                                <BsCaretUp />
                                                <BsCaretDownFill />
                                            </>
                                        )
                                    ) : (
                                        <>
                                            <BsCaretUp />
                                            <BsCaretDown />
                                        </>
                                    )}
                                </div>
                            </button>
                        </th>
                        <th className="w-[100px] shrink-0 border-r-solid border-r-[1px] border-r-[#c4b8b8] px-[10px] py-[4px] flex items-center justify-start">
                            Image
                        </th>
                        <th>
                            <button
                                onClick={() => handleArrange('startDate')}
                                className="w-[150px] shrink-0 cursor-pointer border-r-solid border-r-[1px] border-r-[#c4b8b8] px-[10px] py-[4px] flex items-center justify-between"
                            >
                                <span>Start date</span>
                                <div className="flex items-center">
                                    {selectArrange === 'startDate' ? (
                                        arrangeStartDate ? (
                                            <>
                                                <BsCaretUpFill />
                                                <BsCaretDown />
                                            </>
                                        ) : (
                                            <>
                                                <BsCaretUp />
                                                <BsCaretDownFill />
                                            </>
                                        )
                                    ) : (
                                        <>
                                            <BsCaretUp />
                                            <BsCaretDown />
                                        </>
                                    )}
                                </div>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {
                    collections?.length !== 0 ?
                    collections?.map((collection, index) => {
                        return (
                            <tr
                                key={index}
                                className={`${
                                    show === index + 1 && 'rounded-b-[4px]'
                                } even:bg-[#fff] odd:bg-[#f7f5f5] w-full flex border-b-[1px] border-l-[1px] border-r-[1px] border-solid border-[#c4b8b8]`}
                            >
                                <td className="w-[30px] shrink-0 border-r-solid border-r-[1px] border-r-[#c4b8b8] flex justify-center items-center">
                                    <input checked={listCheck.includes(index)} onChange={(e) => handleCheckItem(index, e)} data-id={listCheck.includes(index) ? collection._id : null} name="inputCheckboxArtistList" type="checkbox" />
                                </td>
                                <td className="w-[50px] shrink-0 border-r-solid border-r-[1px] border-r-[#c4b8b8] flex justify-center items-center">
                                    {index + 1 + show * currentPage}
                                </td>
                                <td className='w-[200px] flex-1 shrink-0'>
                                    <Link to={`${config.routes.adminCollectionUpdate}/${collection._id}`} className="w-full h-full cursor-pointer border-r-solid border-r-[1px] border-r-[#c4b8b8] flex items-center px-[10px] py-[4px]">
                                        {collection.name}
                                    </Link>
                                </td>
                                <td className="w-[100px] shrink-0 h-[100px] border-r-solid border-r-[1px] border-r-[#c4b8b8] flex items-center px-[10px] py-[10px]">
                                    <img
                                        className="rounded-[4px] w-full h-full object-cover border-[1px] border-[#b9b0b0] border-solid"
                                        alt={collection.name}
                                        src={collection.images[0]}
                                    />
                                </td>
                                <td className="w-[150px] shrink-0 border-r-solid border-r-[1px] border-r-[#c4b8b8] px-[10px] flex items-center py-[4px]">{`${new Date(
                                    collection.createDate,
                                ).getDate()}/${new Date(collection.createDate).getMonth() + 1}/${new Date(
                                    collection.createDate,
                                ).getFullYear()}`}</td>
                            </tr>
                        );
                    }) :
                    <div className='flex mt-[20px] justify-center w-full font-[600] text-[13px] uppercase text-[#ae9c9c]'>Không có nhạc này trong danh sách</div>
                }
                </tbody>
            </table>
        </div>
    );
}

export default Table;
