import Banner from './Banner';
import Appointment from '~/components/Appointment';
import Address from './Address';
import Introduct from './Introduct';
import Hot from './Hot';
import Advise from './Advise';
import { useEffect } from 'react';

function Home() {
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);


    return (
        <div className="pb-[80px]">
            <Banner />
            <div className="lg:px-[80px] px-[10px] pb-[50px]">
                <div className="flex justify-center mt-[26px]">
                    <Appointment />
                </div>
                <Address />
                <Introduct />
            </div>
            <div className='bg-[#EFEFEF] lg:px-[80px] px-[10px] py-[30px]'>
                <Hot />
            </div>
            <div className='lg:px-[80px] px-[10px]'>
                <Advise />
            </div>
        </div>
    );
}

export default Home;