import { useState } from "react";
import AuthContext from "./authContext";

const AuthState=(props)=>{
    const [userInfo,setuserInfo]=useState('')

    const updateInfo=(data)=>{
        setuserInfo(data)
    }
    return (
        <AuthContext.Provider value={{userInfo,updateInfo}}>
           {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState ;