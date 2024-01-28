import Banner from './Banner';
import Appointment from '~/components/Appointment';
import Address from './Address';
import Introduct from './Introduct';
import Hot from './Hot';
import Advise from './Advise';
import { useEffect } from 'react';
import Opinion from './Opinion';

function Home() {
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);


    return (
        <div className="">
            <Banner />
            <div className="lg:px-[80px] px-[10px] pb-[50px]">
                <div className="justify-center mt-[26px] flex">
                    <Appointment />
                </div>
                <Address />
                <Introduct />
            </div>
            <div className='bg-[#EFEFEF] lg:px-[80px] px-[10px] py-[30px]'>
                <Hot />
            </div>
            <div className='lg:px-[80px] px-[10px] py-[50px]'>
                <Opinion />
            </div>
            <div className='bg-[#EFEFEF] lg:px-[80px] px-[10px] py-[50px]'>
                <Advise />
            </div>
        </div>
    );
}

export default Home;
