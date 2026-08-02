import axios from "axios"
import { Featuredauthors } from "./Featuredauthors"
import { MdWorkspacePremium } from "react-icons/md";
export function Leftcon() {
    return (
        <div style={{maxWidth:"100%",backgroundColor:"#FAFAFA",height:"100%",minHeight:"100vh",borderRight:"3px solid #E5E7EB"}}>
            <div>
                <div style={{marginLeft:48,fontFamily:"Roboto Slab",fontWeight:400,fontSize:25,display:"flex"}}>
                    <div  style={{paddingTop:7,paddingLeft:7}}>
                         <MdWorkspacePremium size={28} />
                    </div>
                    <div>
                          <p style={{color:"#1a1f4e",paddingLeft:6}}>Featured Author</p>
                    </div>
                    <div style={{paddingTop:7,paddingLeft:7}}>
                        <MdWorkspacePremium size={28} />
                    </div>
              
                </div>
                <div>
                   <Featuredauthors/>
                </div>
            </div>
        </div>
    )
}


/*<MdWorkspacePremium size={28} />*/