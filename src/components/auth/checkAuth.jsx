import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export const checkAuth = (Component) =>{
    function Wrapper(props){
        var user = useSelector(store=>store.auth.loggedInUser);
        var navigate = useNavigate();
        useEffect(()=>{
            if(!user){
                navigate('/login');
            }
        },[user]);
        return <Component {...props}/>;
    }
    return Wrapper;
}

export default checkAuth;