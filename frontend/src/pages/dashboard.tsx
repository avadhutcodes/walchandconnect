import { Button } from "@/components/ui/button"
import { Appbar } from "../components/ui/Appbar"
import { Leftcon } from "@/components/ui/Leftcon"
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
            <div style={{flex:2}}>
               <Leftcon/>
            </div>
            <div style={{flex:8}}>
                <MainCon/>
            </div>

           </div>
           
         </div>
            
        
        
    )
}

