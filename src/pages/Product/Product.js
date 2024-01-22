import { useEffect, useState } from 'react';
import bgProduct from '~/assets/images/banner_product.jpg';
import imgSP from '~/assets/images/sp.jpg';
import CartService from '~/components/CartService';
import Appointment from '~/components/Appointment';

const data = [
    {
        image: imgSP,
        name: 'Kem Ủ Tóc Davines The Purity Circle – 50ml, Loại Bỏ Các Tạp Chất Gây Ra Bởi Ô Nhiễm',
        description:
            'Chống lại các gốc tự do và hấp thụ độc tố trên tóc và da đầu Dung tích: 50ml Hạn sử dụng: 3 năm (xem trên vỏ hộp)',
        price: 190000,
        infomation: `Kem ủ tóc Davines The Purity Circle được tạo ra để loại bỏ các tạp chất gây ra bởi ô nhiễm.

        Với thành phần giàu dưỡng chất như trà Matcha là một siêu thực phẩm nổi tiếng với polyphenol chống lại các gốc tự do một cách hiệu quả.
        
        Và tinh chất than tre cho tác dụng như một chất hấp thụ độc tố, và kéo trúng đi theo nước.
        
        Sản phẩm không chứa chất bảo quản paraben, tuyệt đối không gây kích ứng, rất an toàn cho người sử dụng.
        
        Thông tin sản phẩm:
        
        Dung tích: 50ml
        Hạn sử dụng: 3 năm (xem trên vỏ hộp)`,
    },
    {
        image: imgSP,
        name: 'Kem Ủ Tóc Davines The Purity Circle – 50ml, Loại Bỏ Các Tạp Chất Gây Ra Bởi Ô Nhiễm',
        description:
            'Chống lại các gốc tự do và hấp thụ độc tố trên tóc và da đầu Dung tích: 50ml Hạn sử dụng: 3 năm (xem trên vỏ hộp)',
        price: 190000,
        infomation: `Kem ủ tóc Davines The Purity Circle được tạo ra để loại bỏ các tạp chất gây ra bởi ô nhiễm.

        Với thành phần giàu dưỡng chất như trà Matcha là một siêu thực phẩm nổi tiếng với polyphenol chống lại các gốc tự do một cách hiệu quả.
        
        Và tinh chất than tre cho tác dụng như một chất hấp thụ độc tố, và kéo trúng đi theo nước.
        
        Sản phẩm không chứa chất bảo quản paraben, tuyệt đối không gây kích ứng, rất an toàn cho người sử dụng.
        
        Thông tin sản phẩm:
        
        Dung tích: 50ml
        Hạn sử dụng: 3 năm (xem trên vỏ hộp)`,
    },
    {
        image: imgSP,
        name: 'Kem Ủ Tóc Davines The Purity Circle – 50ml, Loại Bỏ Các Tạp Chất Gây Ra Bởi Ô Nhiễm',
        description:
            'Chống lại các gốc tự do và hấp thụ độc tố trên tóc và da đầu Dung tích: 50ml Hạn sử dụng: 3 năm (xem trên vỏ hộp)',
        price: 190000,
        infomation: `Kem ủ tóc Davines The Purity Circle được tạo ra để loại bỏ các tạp chất gây ra bởi ô nhiễm.

        Với thành phần giàu dưỡng chất như trà Matcha là một siêu thực phẩm nổi tiếng với polyphenol chống lại các gốc tự do một cách hiệu quả.
        
        Và tinh chất than tre cho tác dụng như một chất hấp thụ độc tố, và kéo trúng đi theo nước.
        
        Sản phẩm không chứa chất bảo quản paraben, tuyệt đối không gây kích ứng, rất an toàn cho người sử dụng.
        
        Thông tin sản phẩm:
        
        Dung tích: 50ml
        Hạn sử dụng: 3 năm (xem trên vỏ hộp)`,
    },
    {
        image: imgSP,
        name: 'Kem Ủ Tóc Davines The Purity Circle – 50ml, Loại Bỏ Các Tạp Chất Gây Ra Bởi Ô Nhiễm',
        description:
            'Chống lại các gốc tự do và hấp thụ độc tố trên tóc và da đầu Dung tích: 50ml Hạn sử dụng: 3 năm (xem trên vỏ hộp)',
        price: 190000,
        infomation: `Kem ủ tóc Davines The Purity Circle được tạo ra để loại bỏ các tạp chất gây ra bởi ô nhiễm.

        Với thành phần giàu dưỡng chất như trà Matcha là một siêu thực phẩm nổi tiếng với polyphenol chống lại các gốc tự do một cách hiệu quả.
        
        Và tinh chất than tre cho tác dụng như một chất hấp thụ độc tố, và kéo trúng đi theo nước.
        
        Sản phẩm không chứa chất bảo quản paraben, tuyệt đối không gây kích ứng, rất an toàn cho người sử dụng.
        
        Thông tin sản phẩm:
        
        Dung tích: 50ml
        Hạn sử dụng: 3 năm (xem trên vỏ hộp)`,
    },
    {
        image: imgSP,
        name: 'Kem Ủ Tóc Davines The Purity Circle – 50ml, Loại Bỏ Các Tạp Chất Gây Ra Bởi Ô Nhiễm',
        description:
            'Chống lại các gốc tự do và hấp thụ độc tố trên tóc và da đầu Dung tích: 50ml Hạn sử dụng: 3 năm (xem trên vỏ hộp)',
        price: 190000,
        infomation: `Kem ủ tóc Davines The Purity Circle được tạo ra để loại bỏ các tạp chất gây ra bởi ô nhiễm.

        Với thành phần giàu dưỡng chất như trà Matcha là một siêu thực phẩm nổi tiếng với polyphenol chống lại các gốc tự do một cách hiệu quả.
        
        Và tinh chất than tre cho tác dụng như một chất hấp thụ độc tố, và kéo trúng đi theo nước.
        
        Sản phẩm không chứa chất bảo quản paraben, tuyệt đối không gây kích ứng, rất an toàn cho người sử dụng.
        
        Thông tin sản phẩm:
        
        Dung tích: 50ml
        Hạn sử dụng: 3 năm (xem trên vỏ hộp)`,
    },
    {
        image: imgSP,
        name: 'Kem Ủ Tóc Davines The Purity Circle – 50ml, Loại Bỏ Các Tạp Chất Gây Ra Bởi Ô Nhiễm',
        description:
            'Chống lại các gốc tự do và hấp thụ độc tố trên tóc và da đầu Dung tích: 50ml Hạn sử dụng: 3 năm (xem trên vỏ hộp)',
        price: 190000,
        infomation: `Kem ủ tóc Davines The Purity Circle được tạo ra để loại bỏ các tạp chất gây ra bởi ô nhiễm.

        Với thành phần giàu dưỡng chất như trà Matcha là một siêu thực phẩm nổi tiếng với polyphenol chống lại các gốc tự do một cách hiệu quả.
        
        Và tinh chất than tre cho tác dụng như một chất hấp thụ độc tố, và kéo trúng đi theo nước.
        
        Sản phẩm không chứa chất bảo quản paraben, tuyệt đối không gây kích ứng, rất an toàn cho người sử dụng.
        
        Thông tin sản phẩm:
        
        Dung tích: 50ml
        Hạn sử dụng: 3 năm (xem trên vỏ hộp)`,
    },
    {
        image: imgSP,
        name: 'Kem Ủ Tóc Davines The Purity Circle – 50ml, Loại Bỏ Các Tạp Chất Gây Ra Bởi Ô Nhiễm',
        description:
            'Chống lại các gốc tự do và hấp thụ độc tố trên tóc và da đầu Dung tích: 50ml Hạn sử dụng: 3 năm (xem trên vỏ hộp)',
        price: 190000,
        infomation: `Kem ủ tóc Davines The Purity Circle được tạo ra để loại bỏ các tạp chất gây ra bởi ô nhiễm.

        Với thành phần giàu dưỡng chất như trà Matcha là một siêu thực phẩm nổi tiếng với polyphenol chống lại các gốc tự do một cách hiệu quả.
        
        Và tinh chất than tre cho tác dụng như một chất hấp thụ độc tố, và kéo trúng đi theo nước.
        
        Sản phẩm không chứa chất bảo quản paraben, tuyệt đối không gây kích ứng, rất an toàn cho người sử dụng.
        
        Thông tin sản phẩm:
        
        Dung tích: 50ml
        Hạn sử dụng: 3 năm (xem trên vỏ hộp)`,
    },
    {
        image: imgSP,
        name: 'Kem Ủ Tóc Davines The Purity Circle – 50ml, Loại Bỏ Các Tạp Chất Gây Ra Bởi Ô Nhiễm',
        description:
            'Chống lại các gốc tự do và hấp thụ độc tố trên tóc và da đầu Dung tích: 50ml Hạn sử dụng: 3 năm (xem trên vỏ hộp)',
        price: 190000,
        infomation: `Kem ủ tóc Davines The Purity Circle được tạo ra để loại bỏ các tạp chất gây ra bởi ô nhiễm.

        Với thành phần giàu dưỡng chất như trà Matcha là một siêu thực phẩm nổi tiếng với polyphenol chống lại các gốc tự do một cách hiệu quả.
        
        Và tinh chất than tre cho tác dụng như một chất hấp thụ độc tố, và kéo trúng đi theo nước.
        
        Sản phẩm không chứa chất bảo quản paraben, tuyệt đối không gây kích ứng, rất an toàn cho người sử dụng.
        
        Thông tin sản phẩm:
        
        Dung tích: 50ml
        Hạn sử dụng: 3 năm (xem trên vỏ hộp)`,
    },
    {
        image: imgSP,
        name: 'Kem Ủ Tóc Davines The Purity Circle – 50ml, Loại Bỏ Các Tạp Chất Gây Ra Bởi Ô Nhiễm',
        description:
            'Chống lại các gốc tự do và hấp thụ độc tố trên tóc và da đầu Dung tích: 50ml Hạn sử dụng: 3 năm (xem trên vỏ hộp)',
        price: 190000,
        infomation: `Kem ủ tóc Davines The Purity Circle được tạo ra để loại bỏ các tạp chất gây ra bởi ô nhiễm.

        Với thành phần giàu dưỡng chất như trà Matcha là một siêu thực phẩm nổi tiếng với polyphenol chống lại các gốc tự do một cách hiệu quả.
        
        Và tinh chất than tre cho tác dụng như một chất hấp thụ độc tố, và kéo trúng đi theo nước.
        
        Sản phẩm không chứa chất bảo quản paraben, tuyệt đối không gây kích ứng, rất an toàn cho người sử dụng.
        
        Thông tin sản phẩm:
        
        Dung tích: 50ml
        Hạn sử dụng: 3 năm (xem trên vỏ hộp)`,
    },
];

function Product() {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        setDatas(data);
    }, []);

    
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className="pb-[50px]">
            <div>
                <img alt="toc_viet" src={bgProduct} className="w-[100%] lg:h-[300px] h-[200px] object-fill" />
            </div>
            <div className="lg:px-[80px] px-[10px] mt-[40px]">
                <h1 className="text-[20px] uppercase font-[650] text-linear w-fit border-l-[5px] border-solid border-l-[#b97e3b] pl-[20px]">
                    Sản phẩm
                </h1>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[20px]">
                    {datas.map((data, i) => (
                        <div key={i}>
                            <CartService data={data} type="product" />
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

export default Product;
