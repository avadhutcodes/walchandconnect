

import { Button } from "@/components/ui/button"
import { Appbar } from "../components/ui/Appbar"
import { Histroy } from "../components/ui/history"
import { MainCon } from "../components/ui/MainCon"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export function Publish () {
    console.log("publish rendered")
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

    const [dialogOpen , setDialogOpen] = useState(false)
    const [dialogtitle , setdialogtitle] = useState("")
    const [dialogmessage  , setdialogmessage] = useState("")

    const showDialog = (title:string , message:string)=>{
        setdialogtitle(title);
        setdialogmessage(message);
        setDialogOpen(true);
    }

    const [title , settitle] = useState("")
    const [content , setcontent] = useState("")

    const publishblog = async(title:string,content:string) =>{
        if(!title.trim() || !content.trim()){
             showDialog("blog page is empty" , "please fill out the blog information before publishing !!!!!!!")   
             return
        }
       await axios.post("http://localhost:5000/createpost",{
        title,
        content
       },
    {
        withCredentials:true
    })
    .then(()=>{
       showDialog("Blog has been published" , "please wait for some couple minutes for the blog to actually appear")
       settitle("")
       setcontent("")
    })
    .catch((err)=>{
         showDialog("try again later" , "please wait for some time before trying again")
    })
    }
    return (
<div>
       <AlertDialog open ={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogtitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogmessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        <div style={{backgroundColor:"#ffffff",height:"100vh"}}>
              <div style={{backgroundColor:"#1a1f4e",color:"white",height:54,display:"flex" , justifyContent:"space-between",width:"100vw",position:"fixed"}}>
            <div style={{paddingTop:10,paddingLeft:5}}>
               <Button style={{fontFamily:"Roboto Slab",fontWeight:400, cursor:"pointer",fontSize:17}} onClick={()=>{
                navigate("/dashboard")
               }}>OUTLEARN</Button>
            </div>
            <div style={{paddingTop:10,paddingRight:30}}>
             <Button  variant={"ghost"} style={{fontFamily:"Roboto Slab",fontWeight:400, cursor:"pointer",fontSize:17,backgroundColor:"#ffffff",color:"#1a1f4e"}} onClick={()=>{
                publishblog(title,content)
             }}>Publish</Button>
            </div>

            
            
        </div>
        <textarea rows={1} placeholder="Title....." required value={title}  style={{paddingTop:45,fontSize:52,fontWeight:700,fontFamily:"Roboto Slab",color:"#1F2937",paddingLeft:26,marginBottom:1,width:"100vw"}} onChange={(e)=>{
             settitle(e.target.value)
        }}/>

            <div style={{backgroundColor:"#E5E7EB",height:5}}></div>
            <textarea rows={53} cols={124} placeholder="What would you like to Share....." required  value={content}style={{fontSize:20,fontFamily:"Roboto Slab",color:"#1F2937",paddingLeft:26,width:"100",height:"70vh"}} onChange={(e)=>{
                setcontent(e.target.value)
            }}/>


        </div>
</div>

       
    )
}