import axios from "axios"
import { useState,useEffect,useRef } from "react"
import { useNavigate } from "react-router"
import { IoPersonSharp } from "react-icons/io5";
export function Featuredauthors(){
    type authorprop = {
        username:string;
        title:string;
    }
    const  [author, setauthor] =  useState<authorprop[]>([]);
    const  [newauthor, setnewauthor] =  useState<authorprop[]>([]);
    const intervalref = useRef(null); 

    useEffect(()=>{
          axios.get("http://localhost:5000/viewblogs",{
        withCredentials:true,
       })
       .then((response)=>{
        setauthor(prev => [...prev,...response.data?.posts]);
       })


        const intervalref = setInterval(()=>{
         axios.get("http://localhost:5000/viewblogs",{
        withCredentials:true,
       })
       .then((response)=>{
        setauthor(prev => [...prev,...response.data?.posts]);
       })
       },3000000000000);

       return () => {
        clearInterval(intervalref);
       }

    },[]);

    const seen = new Set<string>();

    const filteredusers = author.filter(user=>{
       /** 
        * if newauthor array does not have the username then keep it else remove that name from the set
        */

      if(seen.has(user.username)){
        return false;
      }
      seen.add(user.username);
      return true;
    });



    return (
        <div>
           {filteredusers.map((e:authorprop)=>(
            <div style={{fontFamily:"Roboto Slab",fontWeight:600,paddingLeft:19,fontSize:20,paddingTop:22}}>
                <div style={{display:"flex"}}>
                     <div>
                    {e.username}
                    </div>
                    <div style={{paddingTop:3,paddingLeft:6}}>
                     <IoPersonSharp size={20}/> 
                    </div>

                </div>
                </div>
                   
           ))}
        </div>
    )
}
