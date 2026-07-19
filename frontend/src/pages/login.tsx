import { Button } from "@/components/ui/button"
import axios from "axios"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router"
import { useState } from "react"
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

export function Login () {
    const navigate = useNavigate();
    const [username,setusername] = useState<string>("");
    const [password , setpassword] = useState<string>("");


      const [dialogOpen , setDialogOpen] = useState(false)
    const [dialogtitle , setdialogtitle] = useState("")
    const [dialogmessage  , setdialogmessage] = useState("")

    const showDialog = (title:string , message:string)=>{
        setdialogtitle(title);
        setdialogmessage(message);
        setDialogOpen(true);
    }

    const logic = async (username:string,password:string) => {
        if (!username.trim() || !password.trim()){
            showDialog("Input field Error" , "This action cannot be supported please re-check the input fields");
            return;
        }

         await axios.post("http://localhost:5000/login",{
            username,
            password
        },{
          withCredentials:true
        })
        .then((res)=>{
            navigate("/dashboard")
        })
        .catch((err)=>{
            console.log(err)
           showDialog("Server Side Error" , "Sorry for the inconvenience please try again later");
        })


    }
    return (
        <div>
        <div style={{backgroundColor:"white",height:"100vh",width:"100vw",display:"flex",alignItems:"center",justifyContent:"center",marginLeft:55}}>
            <div>
                <div style={{paddingBottom:75,fontWeight:600,color:"#1a1f4e"}}>
                 <span style={{fontFamily:"Oswald",fontSize:53}}>You Might have missed many important Blogs </span>
                 <div style={{fontFamily:"Roboto Slab",fontSize:30,paddingLeft:200}}>
                    "Average people consume.<br></br>
                    Exceptional people learn."
                 </div>
                </div>
               
                 <Card style={{width:400,marginLeft:200,marginBottom:175}}>
      <CardHeader>
        <CardTitle style={{color:"#1a1f4e",fontFamily:"Inter",paddingTop:10}}>Login to your account</CardTitle>
       
        <CardAction>
          <Button variant="outline" onClick={()=>{
            navigate("/signin")
          }} style={{backgroundColor:"#1a1f4e" , color:"#ddd",cursor:"pointer"}}>Sign In</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Input
                id="email"
                type="string"
                placeholder="username"
                required
              onChange={(e)=>setusername(e.target.value)}/>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
              </div>
              <Input id="password" type="string"  placeholder="*********"required onChange={(e)=> setpassword(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
        <CardFooter className="flex-col gap-2">
        <Button type="submit" variant={"outline"} style={{cursor:"pointer",backgroundColor:"#1a1f4e",color:"#ddd",fontFamily:"Inter"}} onClick={()=>{
            logic(username,password)
        }}>
          Login
        </Button>
      </CardFooter>
      </Card>
    </div>
    </div>

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
    
    </div>
    
    )
}