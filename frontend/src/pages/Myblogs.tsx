import { Button } from "@/components/ui/button"
import { Appbar } from "../components/ui/Appbar"
import { MainCon } from "../components/ui/MainCon"
import { useState,useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { Card } from "@/components/ui/card"
import { Blog } from "./Blog"
import { ChevronRight } from "lucide-react";
import { Trash2 } from "lucide-react"
import { IoPersonSharp } from "react-icons/io5";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'



const queryClient = new QueryClient()

export function Myblog () {

     const queryClient = useQueryClient()
     

     const getBlogs = async() => {
        const response = await axios.get("http://localhost:5000/mypost",{
            withCredentials:true,
        })
        console.log(response.data)
       return response.data  
     }
   

     const deleteBlog = async(id:string) => {
        console.log(id);
        await axios.delete(`http://localhost:5000/deletepost/${id}`, {
            withCredentials:true,
        })
        
     }

      const query = useQuery({ queryKey: ['blogs'], queryFn: getBlogs }) // used to get data from backend



       const mutation = useMutation({
       mutationFn: deleteBlog,
       onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })



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
   type post ={
    _id:string;
    username:string;
    title:string;
    userId:string;
    content:string;
   }
    
    const [post , setpost] = useState<post[]>([]);


 /*useEffect( () => {
 axios.get("http://localhost:5000/mypost",{
            withCredentials:true,
        })
        .then((blog)=>{
            setpost(blog.data.mypost)
        })
        .catch((err)=>{
            alert("some error")
            console.log(err)
        });
    

        setInterval(()=>{
            axios.get("http://localhost:5000/mypost",{
            withCredentials:true,
        })
        .then((blog)=>{
            setpost(blog.data.mypost)
        })
        .catch((err)=>{
            alert("some error")
            console.log(err)
        })
        },5*10*1000)
    
    },[]) */

     if (query.data?.mypost?.length == 0) {
                    return (
                        <div style={{fontFamily:"Roboto Slab",fontSize:22,fontWeight:600,display:"flex",justifyContent:"center",color:"#1a1f4e"}}>
                            <div style={{paddingTop:300}}>
                                <h1><b>Seems like you do not have published any Blogs Yet !!</b></h1>
                                <Button style={{paddingLeft:23,backgroundColor:"#1a1f4e",color:"#fff",marginRight:11,cursor:"pointer",fontFamily:"Roboto Slab"}} onClick={()=>{
                                    navigate("/publish")
                                }}>Publish</Button>
                            </div>
                            
                        </div>
                    )
                }

                if (query.isLoading){
                    return (
                        <div style={{display:"flex",justifyContent:"center"}}>
                            <div style={{fontFamily:"Roboto Slab",fontSize:30}}>
                                <b>Loading........</b>
                            </div>
                        </div>
                    )
                }
    

    return (
        <div>
          <div style={{backgroundColor:"#1a1f4e",color:"white",height:54,display:"flex" , justifyContent:"space-between",width:"100vw",position:"fixed"}}>
            <div style={{paddingTop:10,paddingLeft:5}}>
               <Button style={{fontFamily:"Roboto Slab",fontWeight:400, cursor:"pointer",fontSize:17}} onClick={()=>{
                navigate("/dashboard")
               }}>OUTLEARN</Button>
            </div>
            </div>
           
             <div style={{display:"flex",justifyContent:"center"}}>
                
                 <div style={{width:"100vw", paddingBottom:1111,height:"100vh",backgroundColor:"white"}}></div>
             <div style={{marginRight:350,marginTop:70}}>
                
                
                     {query.data?.mypost.map((blog:post)=>{
                return ( 
               <div key={blog._id}>
                  <div style={{marginBottom:6,display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
                          <Card style={{width:800,display:"flex",justifyContent:"center"}}>
                                  <span style={{fontWeight:1000,fontSize:16,paddingLeft:10,fontFamily:"Roboto Slab",wordBreak:"break-word",overflowWrap:"break-word"}}><b>{blog.title}</b></span>
                                  <div style={{backgroundColor:"black",height:2,paddingBottom:1}}></div>
                                  <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <div style={{marginLeft:10}}>
                                      <Button variant={"outline"} style={{cursor:"pointer",backgroundColor:"#1a1f4e",color:"white",boxShadow:"0 2px 8px rgba(0,0,0,0.12)"}} onClick={() =>{
                                        navigate(`/blog/${blog._id}`)
                                      }}>Read More <ChevronRight size={16} color="white"/></Button>
                                    </div>
                
                                    <div style={{marginRight:10}}>
                                      <Button variant={"outline"} style={{cursor:"pointer",backgroundColor:"#EF4444",color:"white"}} onClick={()=>{
                                        mutation.mutate(blog._id)
                                      }}><Trash2 size={18}/></Button>
                                    </div>
                
                
                                  </div>
                            </Card>
                            
                        </div>
                        </div>
                        
                )
              })}
            
             
                </div>
             </div>
             </div>
        
    )
}