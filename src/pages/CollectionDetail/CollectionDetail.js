import { useEffect, useState } from 'react';
import bannerCollection from '~/assets/images/banner_collection.jpg';
import CardCollectionDetail from '~/components/CardCollectionDetail';
import Appointment from '~/components/Appointment';
import Address from '../Home/Address';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function CollectionDetail() {
    const [datas, setDatas] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getData();
    }, [id]);

    
    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/collection/getSingle/${id}`);

            console.log(res.data.collection)
            if(res.data.success) {
                setDatas(res.data.collection);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className="pb-[50px]">
            <div>
                <img alt="toc_viet" src={bannerCollection} className="w-[100%] lg:h-[300px] h-[200px] object-fill" />
            </div>
            <div className="lg:px-[80px] px-[10px] mt-[40px]">
                <Address />
            </div>
            <div className="lg:px-[80px] px-[10px] mt-[40px]">
                <h1 className="text-[20px] uppercase font-[650] text-linear w-fit border-l-[5px] border-solid border-l-[#b97e3b] pl-[20px]">
                    {datas.name}
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-[20px] mt-[20px]">
                    {datas.images?.map((data, i) => (
                        <div key={i}>
                            <CardCollectionDetail data={data} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-[100px]">
                <Appointment />
            </div>
        </div>
    );
}

export default CollectionDetail;
