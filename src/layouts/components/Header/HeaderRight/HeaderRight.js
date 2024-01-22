import Book from './Book';
import Cart from './Cart';

function HeaderRight() {
    return <div className='flex gap-[20px] items-center'>
        <Book />
        <Cart />
    </div>;
}

export default HeaderRight;
