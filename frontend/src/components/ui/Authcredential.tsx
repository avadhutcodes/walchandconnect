

import axios from "axios"
import { Button } from "./button"
import { useEffect, useState, type ReactNode } from "react"
import {useNavigate} from "react-router"
import { password } from "bun";
import { Input } from "./input";
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
export function AuthCredential () {
    const[password , setpassword] = useState("");
    const[username,setusername] = useState("");
    const navigate = useNavigate();

    const [dialogOpen , setDialogOpen] = useState(false)
    const [dialogtitle , setdialogtitle] = useState("")
    const [dialogmessage  , setdialogmessage] = useState("")

    const showDialog = (title:string , message:string)=>{
        setdialogtitle(title);
        setdialogmessage(message);
        setDialogOpen(true);
    }
    

    const sign = async (username:string , password:string) => {
        if (!username.trim() || !password.trim()){
            showDialog("Input field Error" , "This action cannot be supported please re-check the input fields");
            return;
        }
            await axios.post("http://localhost:5000/signup",{
                username,
                password
            })
            .then((res) =>{
                navigate("/login");
            })
            .catch((error)=>{
                console.log(error);
                showDialog("Signup Failed" , "Please try again");
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
        <div style={{height:"100vh",width:"100%",backgroundColor:"white"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #ddd",borderRadius:12,width:450,marginTop:250,marginLeft:200,marginBottom:400,backgroundColor:"white",boxShadow:"0px 4px 20px rgba(0,0,0,0.1)",height:230,marginRight:100,fontFamily:"Inter"}}>
                <div>
                   <Input type="username" placeholder="username" style={{padding:10,borderRadius:10,minWidth:400}}  onChange={(e)=> setusername(e.target.value)} /><br></br><br></br>
                  <Input type="password" placeholder="*********" style={{padding:10,borderRadius:10,minWidth:400}}  onChange={(e)=> setpassword(e.target.value)}/><br></br><br></br>
                  <Button variant={"outline"}  style={{paddingTop:10,marginLeft:150 ,backgroundColor:"#1a1f4e",color:"white",borderColor:"#1a1f4e", fontFamily:"Inter",cursor:"pointer"}}onClick={()=>{
                    sign(username,password)
                  }}>
                    Signup
                  </Button>

                <p style={{paddingTop:10,paddingLeft:100,}}>
                    Already registered?{" "}
                        <span onClick={() => navigate("/login")} style={{color:"#1a1f4e",fontWeight:600, cursor:"pointer",textDecoration:"underline"}}>
                            login
                        </span>     
                </p>
              </div> 
            </div>
       
        </div>

        </div>
        
    )
}