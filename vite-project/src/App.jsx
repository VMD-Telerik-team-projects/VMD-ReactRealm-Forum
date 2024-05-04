import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./hoc/Layout";
import Home from "./views/Home/Home";
import Posts from './views/Posts/Posts';
import About from './views/About/About';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import NotFound from './views/NotFound/NotFound';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route index path="/home" element={<Home />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
