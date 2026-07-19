import { Card } from "./card"
import { Button } from "./button"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
export function MainCon() {
    const navigate = useNavigate()
    type blogsprops = {
      title:string;
      content:string;
      username:string;
      _id:string;
    }
    const [blogs , setblogs] = useState<blogsprops[]>([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/viewblogs",{
        withCredentials:true,
       })
       .then((response)=>{
        setblogs(response.data?.posts??[])
        console.log(response.data)
       })
       .catch((err)=>{
        console.log(err)
       })
       
       setInterval(() => {
          axios.get("http://localhost:5000/viewblogs",{
        withCredentials:true,
       })
       .then((response)=>{
        setblogs(response.data?.posts??[])
        console.log(response.data)
       })
       .catch((err)=>{
        console.log(err)
       })
        
       }, 5*10*1000);
    },[])

    
    return (
        
        <div >
             {blogs.map((blog)=>{
                return ( 
               <div key={blog._id}>
                  <div style={{marginBottom:6,display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
                          <Card style={{width:800,display:"flex",justifyContent:"center",marginLeft:450,marginTop:10}}>
                                  <span style={{fontWeight:1000,fontSize:16,paddingLeft:10,fontFamily:"Roboto Slab",wordBreak:"break-word",overflowWrap:"break-word"}}><b>{blog.title}</b></span>
                                  <div style={{backgroundColor:"black",height:2,paddingBottom:1}}></div>
                                  <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <div style={{marginLeft:10}}>
                                      <Button variant={"outline"} style={{cursor:"pointer",backgroundColor:"#1a1f4e",color:"white"}} onClick={() =>{
                                        navigate(`/blog/${blog._id}`)
                                      }}>Expand</Button>
                                    </div>
                                    <div>
                                       <p style={{fontSize:16,fontFamily:"Roboto Slab",color:"#6B7280",fontStyle:"italic",paddingLeft:26}}>
                                             By {blog.username}
                                            </p>
                                    </div>
                
                                   
                
                
                                  </div>
                            </Card>
                            
                        </div>
                        </div>
                        
                )
              })}
        </div>
        
        
    )
}