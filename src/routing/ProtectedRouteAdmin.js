import { Navigate, Outlet } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import config from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '~/redux/selectors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import noteNewCommentAndOrderSlice from '~/redux/slices/noteNewCommentAndOrderSlice';


function ProtectedRouteAdmin() {
    
    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);

    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, [tmp]);

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/notice/getNotice`);

            if(res.data.success){
                dispatch(noteNewCommentAndOrderSlice.actions.setValue({
                    commentCollectionLength: res.data.commentCollectionLength,
                    commentProductLength: res.data.commentProductLength,
                    commentServiceLength: res.data.commentServiceLength,
                    orderNewLength: res.data.orderNewLength,
                }))
            }

        } catch (error) {
            
        }
    }
    
    
    useEffect(() => {
        setUser(tmp)
    }, [tmp])

    if(user.login.isFetching){
        return (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }

    return (
        user.login.currentUser && user.login.currentUser?.isAdmin ? <Outlet /> : <Navigate to={config.routes.login} />
    );
}

export default ProtectedRouteAdmin;