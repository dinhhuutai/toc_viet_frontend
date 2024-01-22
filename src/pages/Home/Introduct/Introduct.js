import { useEffect } from "react";
import { useSelector } from "react-redux";
import { introduceSelector } from "~/redux/selectors";

function Introduct() {

    const data = useSelector(introduceSelector);


    return (
        <div className="mt-[30px]">
            <h1 className="text-[20px] uppercase font-[650] text-linear w-fit border-l-[5px] border-solid border-l-[#b97e3b] pl-[20px]">Giới thiệu về tóc việt</h1>
            <div className="mt-[10px] text-[14px] text-[#b97e3b] font-[480]">
                <p dangerouslySetInnerHTML={{ __html: data.introduce.introduce }}></p>
            </div>
        </div>
    );
}

export default Introduct;