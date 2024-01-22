import { useEffect, useState } from 'react';

function AnimationNumber({ number }) {
    const [arrayNum, setArrayNum] = useState([]);
    const [ani, setAni] = useState(false);


    useEffect(() => {
        let arr = Array.from(String(number), Number);
        const arrMain = arr.map((e) => e * -30);

        setArrayNum(arrMain);

    }, [number]);


    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;

            // Thực hiện các thao tác kiểm tra dựa trên chiều Y ở đây
            if(scrollTop >= 66 && scrollTop <= 400) {
                setAni(true);
            } else {
                setAni(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // useEffect chỉ chạy một lần khi component được mount

    return (
        <div className="flex text-[20px] font-[640]">
            {arrayNum.map((num, i) =>
                (i === 2 || i === 5) && i !== arrayNum.length - 1 ? (
                    <div key={i} className="flex">
                        <div className="h-[30px] overflow-hidden relative w-[12px] flex justify-center">
                            <div className={`${ani ? `top-[${num}px]` : 'top-[0px]' } absolute transition-all linear duration-[.6s]`}>
                                <div className={`h-[30px]`}>0</div>
                                <div className={`h-[30px]`}>1</div>
                                <div className={`h-[30px]`}>2</div>
                                <div className={`h-[30px]`}>3</div>
                                <div className={`h-[30px]`}>4</div>
                                <div className={`h-[30px]`}>5</div>
                                <div className={`h-[30px]`}>6</div>
                                <div className={`h-[30px]`}>7</div>
                                <div className={`h-[30px]`}>8</div>
                                <div className={`h-[30px]`}>9</div>
                            </div>
                        </div>
                        <div className="mx-[2px]">,</div>
                    </div>
                ) : (
                    <div key={i} className="h-[30px] overflow-hidden relative w-[12px] flex justify-center">
                        <div className={`${ani ? `top-[-270px]` : 'top-[0px]' } absolute transition-all linear duration-[0.6s]`}>
                            <div className={`h-[30px]`}>0</div>
                            <div className={`h-[30px]`}>1</div>
                            <div className={`h-[30px]`}>2</div>
                            <div className={`h-[30px]`}>3</div>
                            <div className={`h-[30px]`}>4</div>
                            <div className={`h-[30px]`}>5</div>
                            <div className={`h-[30px]`}>6</div>
                            <div className={`h-[30px]`}>7</div>
                            <div className={`h-[30px]`}>8</div>
                            <div className={`h-[30px]`}>9</div>
                        </div>
                    </div>
                ),
            )}
        </div>
    );
}

export default AnimationNumber;
