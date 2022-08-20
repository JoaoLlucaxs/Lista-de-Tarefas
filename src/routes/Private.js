import { useState,useEffect } from "react"
import {auth} from '../firebase/firebase.config'
import {onAuthStateChanged} from 'firebase/auth'
import {Navigate} from 'react-router-dom'


export default function Private({children}){
    const[load,setLoad]=useState(true)
    const[logado,setLogado]=useState(false)

    useEffect(()=>{
         async function checkLogin(){
            const check=onAuthStateChanged(auth,(user)=>{
                if(user){
                    const data={
                        uid:user.uid,
                        email:user.email,
                    }
                    localStorage.setItem("@detailUser",JSON.stringify(data))
                    setLoad(false)
                    setLogado(true)
                }else{
                    setLoad(false)
                    setLogado(false)
                }
            })
        }
        checkLogin()
    },[])

    if(load){
        return(
            <div></div>
        )
    }

    if(!logado){
        return(
            <Navigate to='/'/>
        )
    }
    return children
}