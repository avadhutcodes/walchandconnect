import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { useState,useEffect } from "react"
import { Card } from "./card"
import axios from "axios"
import { IoCreateOutline } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
export function Appbar(){
    const navigate = useNavigate()
   return(
    
        <div>
            
            <div style={{display:"flex",justifyContent:"space-between",backgroundColor:"#1a1f4e",color:"white"}}>
                <div style={{fontFamily:"Roboto Slab",fontWeight:400,marginTop:18,marginLeft:20}}>
                    OUTLEARN
                </div>
               
                
                <div style={{fontFamily:"Inter",fontWeight:400,marginRight:20,marginTop:15,paddingBottom:18,display:"flex"}}>
                    <div>
                         <Button variant={"outline"} style={{cursor:"pointer",backgroundColor:"white",color:"#1a1f4e",marginRight:15}}  onClick={()=>{
                           navigate("/Publish")
                         }}><IoIosCreate size={50} /></Button>
                    </div>
                    <div>
                         <Button variant={"outline"} style={{cursor:"pointer",backgroundColor:"white",color:"#1a1f4e"}} onClick={()=>{
                            navigate("/Myblogs")
                         }}>My Blogs</Button>
                    </div>
                   

                </div>

            </div> 
</div>
            
     
     
                        )
}