import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./hoc/Layout";
import Home from "./views/Home/Home";

function App() {
  return (
    <>
      <Layout>
        <Home></Home>
      </Layout>
    </>
  );
}

export default App;
