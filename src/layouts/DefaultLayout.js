import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Book from './components/Book';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import modalBookSlice from '~/redux/slices/modalBookSlice';
import { modalBookSelector } from '~/redux/selectors';

function DefaultLayout({ children }) {
    const tmp = useSelector(modalBookSelector);
    const [modalBook, setModalBook] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setModalBook(tmp);
    }, [tmp]);


    return (
        <div className="">
            <div className="h-[var(--height-header)] bg-[#fff] fixed z-[999] top-[0px] left-[0px] right-[0px] boxShadownHeader">
                <Header />
            </div>
            <div className="mt-[var(--height-header)] lg:min-h-screen">{children}</div>
            <div className="">
                <Footer />
            </div>
            <div className="fixed z-[10000] right-[20px] top-[70%] lg:top-[50%]">
                <Contact />
            </div>
            {modalBook?.open && (
                <div onClick={() => dispatch(modalBookSlice.actions.closeModalBook())} className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#3333336f] z-[1000]">
                    <Book />
                </div>
            )}
        </div>
    );
}

export default DefaultLayout;
