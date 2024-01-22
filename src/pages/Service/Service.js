import { useEffect } from 'react';
import PriceTable from './PriceTable';
import ProSer from './ProSer';



function Service() {

    
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);


    return <div className=''>
        <PriceTable />
        <ProSer />
    </div>;
}

export default Service;
