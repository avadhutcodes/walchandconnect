import { data, useNavigate, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { Appbar } from "../components/ui/Appbar"
import { Histroy } from "../components/ui/history"
import { MainCon } from "../components/ui/MainCon"
import { useState,useEffect, useRef } from "react"
import axios from "axios"
import { Card } from "@/components/ui/card"

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
export function Blog() {
    const navigate = useNavigate()
    type blogprop = {
        content:string;
        title:string;
        username:string;
        likes:[string];
    }
    const [blog ,setblog] = useState<blogprop>({
        content:"",
        title:"",
        username:"",
        likes:[""]

    })

    const [istoggle , setistoggle] = useState(false)
    const {id} = useParams()
    useEffect(() =>{
         axios.get(`http://localhost:5000/blog/${id}`,{
            withCredentials:true,
         })
         .then((res)=>{
            setblog(res?.data.blog)
         })
         .catch((err)=>{
            console.log(err)
         })
    },[])

 
  
    return (
        <div>
            <div style={{backgroundColor:"#1a1f4e",color:"white",height:54,display:"flex" , justifyContent:"space-between",width:"100vw",position:"fixed"}}>
            <div style={{paddingTop:10,paddingLeft:5}}>
               <Button style={{fontFamily:"Roboto Slab",fontWeight:400, cursor:"pointer",fontSize:17}} onClick={()=>{
                navigate("/Myblogs")
               }}>OUTLEARN</Button>
            </div>
            </div>  

            <h1 style={{paddingTop:45,fontSize:50,fontWeight:700,fontFamily:"Roboto Slab",color:"#1F2937",paddingLeft:26,marginBottom:1,width:"100vw"}}>
                {blog.title}
            </h1>
            <p style={{fontSize:16,fontFamily:"Roboto Slab",color:"#6B7280",fontStyle:"italic",paddingLeft:26}}>
                By {blog.username}
            </p>
             <div style={{backgroundColor:"#E5E7EB",height:5,width:"100vh",minWidth:"100%"}}></div>
             <div style={{fontSize:20,fontFamily:"Roboto Slab",color:"#1F2937",paddingLeft:100,width:"90%",wordBreak:"break-word",overflowWrap:"break-word",whiteSpace:"pre-wrap"}} >
                {blog.content}
             </div>
             <div style={{paddingTop:30,display:"flex",justifyContent:"center"}}>
                <div style={{fontSize:28,fontFamily:"Roboto Slab",color:"#1a1f4e"}}>
                   <b> Blog End's here ........ hope you found something informative here ! </b>
                </div>
                <div style={{marginLeft:100,marginTop:1}}>
                  <Button variant={"outline"} style={{backgroundColor:"#1a1f4e",color:"#fff",fontWeight:500,fontFamily:"Roboto Slab",cursor:"pointer",borderRadius:30}} onClick={() =>{
                     
                  }}>Informative for {blog.likes.length}</Button>
                </div>
             </div>
        </div>
          
    )
            }
