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

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

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
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      </AppContext.Provider>
    </>
  );
}

export default App;
