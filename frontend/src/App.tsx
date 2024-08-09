import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Signin } from './pages/Signin'
import { HomePage } from './pages/Homepage';
import { RecoilRoot } from 'recoil';
import { useUserHook } from './store/useUserHook';
import { OwnerCredsPage } from './pages/OwnerCreds';

function App() {

  return (
    <RecoilRoot>
      <WrapApp/>
    </RecoilRoot>
  );
}

function WrapApp() {
  const user = useUserHook();
  console.log('The user is  : ', user);
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <LandingPage />} />
          <Route path="/login" element={user ? <HomePage /> : <Signin />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path='/ownercreds' element={<OwnerCredsPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
