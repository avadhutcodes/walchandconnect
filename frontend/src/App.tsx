import './index.css'
import { BrowserRouter,Route,Routes } from 'react-router';
import { Signin } from './pages/signin';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard'
import { Publish } from './pages/Publish';
import { Myblog } from './pages/Myblogs';
import { Blog } from './pages/Blog';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()
export function App() {
  return (
   <div>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/login"  element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/publish" element={<Publish/>}/>
      <Route path="/Myblogs" element={<Myblog/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
   
   </div>
  );
}

export default App;
