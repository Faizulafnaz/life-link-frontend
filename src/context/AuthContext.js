import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { baseUrl } from "../congifure/urls";
import { toast } from "react-toastify";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    let loginUser = async (e)=>{
        e.preventDefault()
        let response = await fetch(`${baseUrl}/token/`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        if (response.status === 200){
            
            if (jwt_decode(data.access)?.is_varified){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate('/')
            }else{
                console.log(jwt_decode(data.access));
                toast.error("Account not varified !", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }

            
        }else{
            toast.error("Invalid credentials !", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
    }


    let signup = async (e)=>{
        e.preventDefault()
        if (e.target.password.value !== e.target.confirmPassword.value){
            return toast.error("Password do no match", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
        let response = await fetch(`${baseUrl}/register/`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value, 'email':e.target.email.value})
        })
        let data = await response.json()
        console.log(data)
        console.log(data.response)
        if (response.status === 200){
            navigate('/varify', { state: { email: e.target.email.value} })
        }else{
            toast.error("Account creation faild!", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
    }

    let varify_via_otp = async (e) =>{
        e.preventDefault()
        let response = await fetch(`${baseUrl}/varify/`, {
            method : "PATCH",
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({ 'otp':e.target.otp.value, 'email':e.target.email.value})
        })
        let data = await response.json()
        if (response.status === 200){
            toast.success("Account varified !", {
                position: toast.POSITION.TOP_RIGHT,
              });
            navigate('/login')
        }else if (response.status === 400){
            toast.error("Invalid OTP!", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
    }

    let updateToken = async ()=>{
        console.log('updateToken working')
        let response = await fetch(`${baseUrl}/token/refresh/`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            
        }else{
            logoutUser() 
        }
        if(loading){
            setLoading(false)
        }
    }
    
    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    useEffect(()=>{
        if (loading){
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])


    const contextData = {
        user,
        loginUser,
        logoutUser,
        signup,
        varify_via_otp,
        authTokens,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {loading? null :children}   
        </AuthContext.Provider>
    )
}