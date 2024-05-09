import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Layout from "./hoc/Layout";
import LayoutCentered from "./hoc/LayoutCentered/LayoutCentered";
import LayoutPosts from "./hoc/LayoutPosts/LayoutPosts";
import Home from "./views/Home/Home";
import Posts from "./views/Posts/Posts";
import About from "./views/About/About";
import SignIn from "./views/SignIn/SignIn";
import { AppContext } from "./context/AppContext";
import CreatePost from "./views/CreatePost/CreatePost";
import SignUp from "./views/SignUp/SignUp";
import NotFound from "./views/NotFound/NotFound";
import MyProfile from "./views/MyProfile/MyProfile";
import AdminDashboard from "./views/AdminDashboard/AdminDashboard";
import { useEffect } from "react";
import { getUserData } from "./services/users.service";
import Authenticated from "./hoc/Authenticated";
import AuthenticatedAdmin from "./hoc/AuthenticatedAdmin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LayoutAdminDashboard from "./hoc/LayoutAdminDashboard/LayoutAdminDashboard";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });


  //  comment
  useEffect(() => {
    if (!appState.user) return;

    getUserData(appState.user.uid).then((snapshot) => {
      const userData = Object.values(snapshot.val())[0];
      setAppState({ ...appState, userData });
    });
  }, [appState.user]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDataSnapshot = await getUserData(user.uid);
        const userData = userDataSnapshot.val();
        setAppState({ user, userData });
      } else {
        setAppState({ user: null, userData: null });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          user: appState.user,
          userData: appState.userData,
          setAppState,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <LayoutCentered>
                <Home />
              </LayoutCentered>
            }
          ></Route>
          <Route
            index
            path="/home"
            element={
              <LayoutCentered>
                <Home />
              </LayoutCentered>
            }
          ></Route>
          <Route
            path="/posts"
            element={
              <LayoutPosts>
                <Posts />
              </LayoutPosts>
            }
          >
          </Route>
          <Route
            path="/about"
            element={
              <LayoutCentered>
                <About />
              </LayoutCentered>
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <LayoutCentered>
                <SignIn />
              </LayoutCentered>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <LayoutCentered>
                <SignUp />
              </LayoutCentered>
            }
          ></Route>
          <Route
            path="/create-post"
            element={
              <LayoutCentered>
                <Authenticated>
                  <CreatePost />
                </Authenticated>
              </LayoutCentered>
            }
          ></Route>
          <Route
            path="/my-posts"
            element={
              // TODO: Create correct "MyPosts" component and switch to it
              <LayoutCentered>
                <Authenticated>
                  <CreatePost />
                </Authenticated>
              </LayoutCentered>
            }
          ></Route>
          <Route
            path="/my-profile"
            element={
              <LayoutCentered>
                <Authenticated>
                  <MyProfile />
                </Authenticated>
              </LayoutCentered>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              // TODO: Create dashboard layout and wrap component
              <LayoutAdminDashboard>
                <AuthenticatedAdmin>
                  <AdminDashboard />
                </AuthenticatedAdmin>
              </LayoutAdminDashboard>
            }
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;