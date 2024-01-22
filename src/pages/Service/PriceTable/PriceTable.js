import axios from 'axios';
import { useEffect, useState } from 'react';
import bgBangGia from '~/assets/images/bg_bang_gia.png';

function PriceTable() {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/pricetable/getAll`);

            if(res.data.success){
                setDatas(res.data.priceTables);
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="flex flex-col items-center mt-[100px]">
            <h1 className="text-[20px] font-[650] uppercase text-linear w-fit">Bảng giá dịch vụ Tóc Việt hair salon</h1>
            <div className="mt-[20px] text-[14px] text-[#fff] bg-cover p-[20px]" style={{backgroundImage: `url(${bgBangGia})`}}>
                <table>
                    <thead>
                        <tr className="border-[1px] border-solid border-[#b97e3b]">
                            <th className="w-[250px] text-center py-[4px]">Dịch vụ</th>
                            <th className="w-[250px] text-center border-x-[1px] border-solid border-x-[#b97e3b]">
                                Loại
                            </th>
                            <th className="w-[250px] text-center">Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, index) => (
                            <tr key={index} className="border-[1px] border-solid border-[#b97e3b]">
                                <td className="font-[650] w-[250px] py-[4px] pl-[20px]">{data.service}</td>
                                <td className="w-[250px] border-x-[1px] border-solid border-x-[#b97e3b]">
                                    {data.type.length > 0 ? (
                                        data.type.map((ty, i) => (
                                            <tr
                                                className={`${
                                                    data.type.length - 1 !== i
                                                        ? 'border-b-[1px] border-dashed border-b-[#b97e3b]'
                                                        : ''
                                                } w-full block pl-[12px]`}
                                            >
                                                <td className="py-[4px]">{ty.detail}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <td className="py-[4px] w-full block pl-[12px]">-</td>
                                    )}
                                </td>
                                <td className="w-[250px] text-center">
                                    {data.type.length > 0 ? (
                                        data.type.map((ty, i) => (
                                            <tr className={`w-[250px] text-center ${data.type.length - 1 !== i ? "border-b-[1px] border-dashed border-b-[#b97e3b]" : ""}`}>
                                                <td className="w-[250px] text-center py-[4px]">
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
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <td className="w-[250px] text-center py-[4px]">
                                            {data.isPriceRange
                                                ? `${(data.priceMin / 1000)
                                                      .toString()
                                                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}K - ${(
                                                      data.priceMax / 1000
                                                  )
                                                      .toString()
                                                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}K`
                                                : (data.price / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
                                                  'K'}
                                        </td>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <p className='mt-[10px]'>*Đối với tóc quá dài phụ thu thêm 100K - 300K</p>
                </div>
            </div>
        </div>
    );
}

export default PriceTable;
