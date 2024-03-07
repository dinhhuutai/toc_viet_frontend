import { useEffect, useState } from 'react';


function CartService({ data }) {
    const [polish, setPolish] = useState(false);

    useEffect(() => {
        const timePolish = setTimeout(() => {
            setPolish(true);
            setTimeout(() => {
                setPolish(false);
            }, 800);
        }, 5000);

        return () => {
            clearTimeout(timePolish);
        };
    }, [polish]);


    return (
        <div className={`bg-[#fff] rounded-[10px] box-shadow-card-service hover:translate-y-[-6px] transition-all linear duration-[.4s]`}>
            <div
                className={`w-full h-[300px] overflow-hidden rounded-[10px] cursor-pointer relative block`}
            >
                <img
                    className="hover:scale-[1.1] transition-all linear duration-[.4s] w-full h-full object-contain"
                    alt="toc_viet"
                    src={data}
                />
                <div
                    className={`${
                        polish ? 'animate-polish' : ''
                    } absolute top-[0] left-[-85%] z-[10] block w-[50%] h-[100%] polish`}
                ></div>
            </div>
        </div>
    );
}

export default CartService;
