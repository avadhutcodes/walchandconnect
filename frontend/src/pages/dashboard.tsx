import { Button } from "@/components/ui/button"
import { Appbar } from "../components/ui/Appbar"
import { Histroy } from "../components/ui/history"
import { MainCon } from "../components/ui/MainCon"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

export function Dashboard () {
    const navigate = useNavigate()
    useEffect(  () =>{
          axios.get("http://localhost:5000/api/me",{
            withCredentials:true,
        })
        .then((res) =>{
            console.log("authenticated")
        })
        .catch ((err)=>{
            navigate("/signin")
            console.log(err)
            return;
        })

    },[]);

    return (
         <div>
            <div style={{position:"fixed",width:"100vw",top:0}}>
             <Appbar/>
            </div>
           <div style={{display:"flex",marginTop:64}}>
            <div style={{position:"fixed"}}>
                <Histroy/>
            </div>
            <div>
                <MainCon/>
            </div>

           </div>
           
         </div>
            
        
        
    )
}

/*
 <div style={{position:"fixed",width:"100vw"}}>
                <Appbar/>
            </div>
             <div style={{position:"fixed",height:1}}>
               <Histroy/>
             </div>





*/