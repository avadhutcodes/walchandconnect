
import { AuthBanner } from "@/components/ui/Authbanner";
import { AuthCredential } from "@/components/ui/Authcredential";
export function Signin(){
    return (
        <div style={{display:"flex" }}>
            <div style={{flex:4}}>
            <AuthBanner/>
            </div>
           <div style={{flex:6}}>
            <AuthCredential/>
           </div>
           
        </div>
    )
}