import { useState,useEffect } from "react"
import  axios  from 'axios';
export function Histroy (){
    type blogprop = {
        username:string;
        _id:string;
        title:string;
    }
    const [usne , setusername] = useState<blogprop[]>([])

    useEffect(()=>{
               axios.get("http://localhost:5000/viewblogs",{
        withCredentials:true,
       })
       .then((response)=>{
        setusername(response.data?.posts??[])
       })
       .catch((err)=>{
        console.log(err)
       })
    },[])
  //  console.log(username)
   return(
         <div>
             <div style={{ backgroundColor:"white",fontFamily:"Inter",fontWeight:400,width:300,minHeight:"100px",borderRight:"4px solid #E5E7EB" ,height:"100vh"}}>
             <div  style={{color:"#1a1f4e",fontFamily:"Roboto Slab",fontSize:22,paddingLeft:10,paddingTop:7}}>
                Featured Author's
              </div>
              <div style={{backgroundColor:"#E5E7EB",height:1,paddingTop:5}}></div>
               </div>  
                    
 </div>
        )
    }
 
















     //{usne.map((blog:blogprop)=>{
               // return (
                 //   <div>
                //<div style={{fontFamily:"Roboto Slab",color:"#1F2937",marginLeft:24,fontSize:16,wordBreak:"break-word",overflowWrap:"break-word",whiteSpace:"pre-wrap"}}>
               // {blog.username}
              //</div>
              //<div style={{backgroundColor:"#E5E7EB",height:1,paddingTop:5}}></div>
              //</div>
              

               
           // )