import {Routes, Route, Navigate, Outlet} from "react-router-dom";
import Login from './pages/login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Teams from './pages/Teams';
import Header from './components/Header';
import Config from './pages/Config';
import Admin from './pages/Admin';
import LoginAdmin from './pages/loginAdmin';
import Employees from './pages/Emplyees';
import CurrentDay from './pages/CurrentDay';
import Sectors from './pages/Sectors';
import EditEmployee from './pages/EditEmployees';
import ForgotPassword from './pages/ForgotPassword';
import CodeVerify from './pages/CodeVerify';
import ResetPassword from './pages/ResetPassword';
import {AuthProvider} from './context/authProviderImport';
import {ThemeProvider} from './theme/ThemeProviderImport';
import {useAuth} from './hook/useAuth';
import { BrowserRouter, useLocation } from 'react-router-dom';

import GuestHome from './pages/GuestHome';
import GuestTeam from './pages/GuestTeam';
import GuestCurrentDay from './pages/GuestCurrentDay';
import GuestEmployeeProfile from './pages/GuestEmployeeProfile';
import GuestProfile from './pages/GuestProfile';
import GuestConfig from './pages/GuestConfig';

import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';

function AuthApp (){
  const {inUser} = useAuth()

  if (inUser) {
    return(
    <div className="layout"> 
    <Header /> 
    <main className="main-layout">
        <Outlet />
        </main> 
        </div>   
        )} else {<Navigate to='/' />}
}

function AdminAuth () {
  const {inAdmin} = useAuth()

  if(inAdmin) {
    return(
     <div className="layout"> 
            <Header /> 
            <main className="main-layout">
                <Outlet />
            </main> 
        </div> 
    )
  } else {<Navigate to='/login/admin' />}
    
}

function Guest () {
    return(
        <div className="layout"> 
            <Header /> 
            <main className="main-layout">
                <Outlet />
            </main> 
        </div> 
    )
}


export default function RootApp(){



  return(
    
    <AuthProvider>
      <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
    
  )
}


function App() {
  const location = useLocation()

    return (
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={ <Login /> } />
            <Route path='/login/admin' element={ <LoginAdmin /> } />
            <Route path='/forgot-password' element={ <ForgotPassword /> } />
            <Route path='/code-verify/:id' element={ <CodeVerify /> } />
            <Route path='/reset-password/:id' element={ <ResetPassword /> } />
            <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
            <Route path='/about' element={<About/>}/>
            
            
            <Route  element={<AuthApp />}>
                <Route path='/home' element={ <Home /> }/>
                <Route path='/profile' element={ <Profile /> } />
                <Route path='/teams/:id' element={ <Teams /> }/>
                <Route path='/config' element={ <Config /> } />
                <Route path='/employees/:id' element={ <Employees /> } />
                <Route path='/currentday/:date' element={ <CurrentDay /> } />
            </Route>

            <Route element={<AdminAuth />}>
                <Route path='/admin' element={<Admin />} />
                <Route path='/sectors/:id' element={<Sectors />} />
                <Route path='/edit-employee/:id' element={<EditEmployee />} />
            </Route>

            <Route element={<Guest/>}>
                <Route path='/guest-home' element={<GuestHome />}/>
                <Route path='/guest-team/:id' element={<GuestTeam />} />
                <Route path='/guest-currentday/:date' element={<GuestCurrentDay/>} />
                <Route path='/guest-employee-profile/:id' element={<GuestEmployeeProfile/>} />
                <Route path='/guest-profile' element={<GuestProfile/>} />
                <Route path='/guest-config' element={ <GuestConfig /> } />
            </Route>
      </Routes>
    
  ); 
} 


