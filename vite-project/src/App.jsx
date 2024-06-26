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
import RenderSinglePost from "./components/Post/PostDetails";
import UserBlocked from "./views/UserBlocked/UserBlocked";
import { updateUserOnlineStatus } from "./services/auth.service";
import DeleteAccount from "./views/DeleteAccount/DeleteAccount";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Profile from "./views/Profile/Profile";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
    loading: true,
  });

  const navigate = useNavigate();

  //  comment
  useEffect(() => {
    if (!appState.user) return;

    setAppState((prevState) => ({ ...prevState, loading: true }));
    getUserData(appState.user.uid).then((snapshot) => {
      const userData = Object.values(snapshot.val())[0];
      setAppState((prevState) => ({ ...prevState, userData, loading: false }));
    });
  }, [appState.user]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAppState((prevState) => ({ ...prevState, loading: true }));
        const userDataSnapshot = await getUserData(user.uid);
        const userData = userDataSnapshot.val();
        setAppState((prevState) => ({
          ...prevState,
          user,
          userData,
          loading: false,
        }));

        // console.log(userData.values());

        await updateUserOnlineStatus(Object.values(userData)[0].handle, true); // Update the online status using the correct user data
      } else {
        if (appState.userData) {
          await updateUserOnlineStatus(appState.userData.handle, false); // Update the online status using the correct user data
        }
        setAppState((prevState) => ({
          ...prevState,
          user: null,
          userData: null,
          loading: false,
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const isBlocked =
      appState.user && appState.userData && appState.userData.isBlocked;
    if (isBlocked) {
      navigate("/blocked");
    }
  }, [appState.user, appState.userData, navigate]);

  if (appState.loading) {
    return (
      <LayoutCentered>
        <Loader />
      </LayoutCentered>
    );
  }

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
          ></Route>
          <Route
            path="/post/:postId"
            element={
              <LayoutPosts>
                <RenderSinglePost />
              </LayoutPosts>
            }
          ></Route>
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
            path="/profile/:handle"
            element={
              <LayoutCentered>
                <Authenticated>
                  <Profile />
                </Authenticated>
              </LayoutCentered>
            }
          />

          <Route
            path="/dashboard"
            element={
              <LayoutAdminDashboard>
                <AuthenticatedAdmin>
                  <AdminDashboard />
                </AuthenticatedAdmin>
              </LayoutAdminDashboard>
            }
          ></Route>
          <Route
            path="/blocked"
            element={
              <LayoutCentered>
                <UserBlocked />
              </LayoutCentered>
            }
          ></Route>
          <Route
            path="/delete-account"
            element={
              <LayoutCentered>
                <Authenticated>
                  <DeleteAccount />
                </Authenticated>
              </LayoutCentered>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
