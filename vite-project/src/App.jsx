import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./hoc/Layout";
import MainContainer from "./views/Home/Home";

function App() {
  return (
    <>
      <Layout>
        <MainContainer></MainContainer>
      </Layout>
    </>
  );
}

export default App;
