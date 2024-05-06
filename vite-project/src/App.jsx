import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./hoc/Layout";
import Home from "./views/Home/Home";
import Posts from './views/Posts/Posts';
import About from './views/About/About';
import SignIn from './views/SignIn/SignIn';
import { AppContext } from "./context/AppContext";
import CreatePost from "./views/CreatePost/CreatePost";
import SignUp from './views/SignUp/SignUp';
import NotFound from './views/NotFound/NotFound';
import AdminDashboard from './views/AdminDashboard/AdminDashboard';
import { useEffect } from "react";
import { getUserData } from "./services/users.service";
import Authenticated from "./hoc/Authenticated";
import AuthenticatedAdmin from "./hoc/AuthenticatedAdmin";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  useEffect(() => {
    if (!appState.user) return;

    getUserData(appState.user.uid)
      .then(snapshot => {
        const userData = Object.values(snapshot.val())[0];
        setAppState({...appState, userData});
      });
  }, [appState.user])


  return (
    <>
    <AppContext.Provider value={{user: appState.user, userData: appState.userData, setAppState}}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route index path="/home" element={<Home />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/create-post" element={<Authenticated><CreatePost/></Authenticated>}></Route>
          <Route path="/dashboard" element={<AuthenticatedAdmin><AdminDashboard/></AuthenticatedAdmin>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      </AppContext.Provider>
    </>
  );
}

export default App;
