import { Card } from "./card"
import { Button } from "./button"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router"
import { LuUserRoundSearch } from "react-icons/lu";
import axios from "axios"
import { FaBlogger } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import { User } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import { Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import {SearchOutlined} from "@ant-design/icons"
import { FaSearch } from "react-icons/fa";
export function MainCon() {
    const navigate = useNavigate()
    type blogsprops = {
      title:string;
      content:string;
      username:string;
      _id:string;
    }
    const [blogs , setblogs] = useState<blogsprops[]>([]);
    const [searchItem, setSearchItem] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<blogsprops[]>([])


    useEffect(()=>{
        axios.get("http://localhost:5000/viewblogs",{
        withCredentials:true,
       })
       .then((response)=>{
        setblogs(response.data?.posts??[])
        setFilteredUsers(response.data?.posts??[])

     
       })
       .catch((err)=>{
        console.error(err)
       })
       
       setInterval(() => {
          axios.get("http://localhost:5000/viewblogs",{
        withCredentials:true,
       })
       .then((response)=>{
        setblogs(response.data?.posts??[]);
        setFilteredUsers(response.data?.posts??[]);
        console.log(response.data)
       })
       .catch((err)=>{
        console.log(err)
       })
        
       }, 5*10*1000);
    },[])


const handleInputChange = (e:any) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    
    const filteredItems = blogs.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }

  const {Search} = Input;

    
    return (
        <div>
           <div style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"white",height:45,marginRight:80,marginTop:9,width:600,marginLeft:25}}>
              <div style={{marginRight:11}}>
              <Input prefix= { <FaSearch size={22} />} style={{marginLeft:347,paddingTop:8,paddingBottom:10,paddingRight:20,fontFamily:"Roboto Slab",fontWeight:40000,color:"black",width:600}}
              value={searchItem}
              onChange={handleInputChange}
              placeholder='Search for the Author'
      />
      
       
          </div>
           </div>
          
          { filteredUsers.map((blog)=>(
               <div key={blog._id}>
                  <div style={{marginBottom:6,display:"flex",flexDirection:"column",alignItems:"center"}}>
                          <Card style={{width:800,display:"flex",justifyContent:"center",marginRight:100,marginTop:10}}>
                           
                                  <span style={{fontWeight:1000,fontSize:16,paddingLeft:10,fontFamily:"Roboto Slab",wordBreak:"break-word",overflowWrap:"break-word"}}><b>{blog.title}</b></span>
                                  <div style={{backgroundColor:"black",height:2,paddingBottom:1}}></div>
                                  <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <div style={{marginLeft:10}}>
                                      <Button variant={"outline"} style={{cursor:"pointer",backgroundColor:"#1a1f4e",color:"white",boxShadow:"0 2px 8px rgba(0,0,0,0.12)"}} onClick={() =>{
                                        navigate(`/blog/${blog._id}`)
                                      }}>Read More <ChevronRight size={16} color="white"/></Button>
                                    </div>
                                    <div style={{display:"flex"}}>
                                      <div style={{paddingTop:6}}>
                                         <IoPersonSharp size={16}/> 
                                      </div>
                                      <div>
                                         <p style={{fontSize:16,fontFamily:"Roboto Slab",color:"#4B5563",fontWeight:400,paddingLeft:2}}>
                                          {blog.username}
                                            </p>
                                      </div>
                                    </div>
                                  </div>
                            </Card>
                            
                        </div>
                        </div>
                        
                
            ))}

        </div>
    )
  }