// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import SignInSide from './Pages/SignInSide.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <SignInSide />
//   </React.StrictMode>,
// )

import { useState } from "react";

import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";
import SignInSide from "./pages/SignInSide";

import Personal from "./pages/Personal";
import PersonalDetail from "./pages/PersonalDetail";

import ActivityFlag from "./pages/ActivityFlag";
import ActivityFlagDetail from "./pages/ActivityFlagDetail";

import MyForm from "./pages/TestValicate";
//import SlideModal from './pages/SlideModal';

import AppMyGrid from "./pages/SlideModal";

import UserGroup from "./pages/Security/UserGroup";
import UserGroupDetail from "./pages/Security/UserGroupDetail";

import Users from "./pages/Security/User";
import UserDetail from "./pages/Security/UserDetail";
import Userpermission from "./pages/Security/UserGroupPermission";
import EditGrouppermission from "./pages/Security/EditUserGroupPermission";

import CustomerList from "./pages/Master/CustomerList";
import CustomerIndustry from "./pages/Master/CustomerIndusty";
import Saleperson from "./pages/Master/SalePerson";

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform your authentication logic here
    setIsLoggedIn(true);
  };

  // const handleLogout = () => {
  //   // Perform your logout logic here

  // };

  return (
    <>
      {isLoggedIn ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<App />} />
              <Route path="/Personal" element={<Personal />} />
              <Route path="/PersonalDetail" element={<PersonalDetail />} />
              <Route path="/ActivityFlag" element={<ActivityFlag />} />
              <Route
                path="/ActivityFlagDetail"
                element={<ActivityFlagDetail />}
              />
              <Route path="/MyForm" element={<MyForm />} />
              <Route path="/AppMyGrid" element={<AppMyGrid />} />
              <Route path="/UserGroup" element={<UserGroup />} />
              <Route path="/UserGroupDetail" element={<UserGroupDetail />} />
              <Route path="/User" element={<Users />} />
              <Route path="/UserDetail" element={<UserDetail />} />
              <Route path="/UserPermission" element={<Userpermission />} />
              <Route
                path="/EditUserPermission"
                element={<EditGrouppermission />}
              />
              <Route path="/CustomerList" element={<CustomerList />} />
              <Route path="/CustomerIndustry" element={<CustomerIndustry />} />
              <Route path="/Saleperson" element={<Saleperson />} />

              {/* <Route path="SignInSide" element={<SignInSide />} />
              <Route path="SignIn" element={<SignIn />} />  */}
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<SignInSide onLogin={handleLogin()} />}></Route> */}
            <Route
              path="/"
              element={<SignInSide onLogin={() => handleLogin()} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Main />);
