import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationSimple from "./components/Navigation/Navigation"
import MainContainer from "./views/Home/Home";

function App() {
  return (
    <>
      <NavigationSimple />
      <MainContainer />
    </>
  );
}

export default App;
