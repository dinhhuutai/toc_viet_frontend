import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Notice from "./components/Notice";
import { useState } from "react";

function DefaultLayout({children}) {

    const [openMenuMobi, setOpenMenuMobi] = useState(false);

 
    return (
        <div>
            <div className='h-[var(--admin-height-header)] fixed top-0 left-0 right-0 z-[100] bg-[#fff]'>
                <Header />
            </div>
            <div className='mt-[var(--admin-height-header)]'>
                <div className='lg:w-[var(--admin-width-sidebar)] w-[0px] fixed top-[var(--admin-height-header)] left-0 bottom-0 bg-[#fff]'>
                    <Sidebar setOpenMenuMobi={setOpenMenuMobi} />
                </div>
                <div className="lg:ml-[var(--admin-width-sidebar)] bg-[#F1F4F6] min-h-screen">
                    {children}
                </div>
            </div>
            <Notice />
        </div>
    );
}

export default DefaultLayout;