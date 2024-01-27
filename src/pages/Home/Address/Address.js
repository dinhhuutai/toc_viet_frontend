import logoLocation from '~/assets/images/logo_location.png';
import logoFb from '~/assets/images/logo_fb.png';
import logoTt from '~/assets/images/logo_tt.png';
import logoZalo from '~/assets/images/logo_zalo.png';
import logoYt from '~/assets/images/logo_yt.png';

import AnimationNumber from '~/components/AnimationNumber';
import { BsPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useSelector } from 'react-redux';
import { introduceSelector } from '~/redux/selectors';

function Address() {
    const data = useSelector(introduceSelector);

    return (
        <div className="mt-[30px] lg:flex hidden grid-cols-2 justify-around items-center">
            <Link to={config.routes.contact} className="flex flex-col items-center">
                <div className="h-[70px] flex items-center">
                    <img className="h-[70px] cursor-pointer" alt="toc_viet" src={logoLocation} />
                </div>
                <div className="flex">
                    <AnimationNumber number={123}/>
                    <div className="text-[22px]">
                        <BsPlus />
                    </div>
                </div>
            </Link>
            <a target='_blank' href={data.introduce.linkFb} className="flex flex-col items-center">
                <div className="h-[70px] flex items-center">
                    <img className="h-[40px] cursor-pointer" alt="toc_viet" src={logoFb} />
                </div>
                <div className="flex">
                    <AnimationNumber number={456000} />
                    <div className="text-[22px]">
                        <BsPlus />
                    </div>
                </div>
            </a>
            <a target='_blank' href={data.introduce.linkTiktok} className="flex flex-col items-center">
                <div className="h-[70px] flex items-center">
                    <img className="h-[36px] cursor-pointer" alt="toc_viet" src={logoTt} />
                </div>
                <div className="flex">
                    <AnimationNumber number={789000} />
                    <div className="text-[22px]">
                        <BsPlus />
                    </div>
                </div>
            </a>
            <a target='_blank' href={data.introduce.linkZalo} className="flex flex-col items-center">
                <div className="h-[70px] flex items-center">
                    <img className="h-[36px] cursor-pointer" alt="toc_viet" src={logoZalo} />
                </div>
                <div className="flex">
                    <AnimationNumber number={565000} />
                    <div className="text-[22px]">
                        <BsPlus />
                    </div>
                </div>
            </a>
            <a target='_blank' href={data.introduce.linkYoutube} className="flex flex-col items-center">
                <div className="h-[70px] flex items-center">
                    <img className="h-[34px] cursor-pointer" alt="toc_viet" src={logoYt} />
                </div>
                <div className="flex">
                    <AnimationNumber number={369000} />
                    <div className="text-[22px]">
                        <BsPlus />
                    </div>
                </div>
            </a>
        </div>
    );
}

export default Address;
