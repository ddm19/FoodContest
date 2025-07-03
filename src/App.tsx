import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home/Home";
import NoPage from "./pages/notFound/notFound";
import { Routes, Route } from "react-router-dom";
import Raffle from "pages/raffle/raffle";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>

      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/raffle" element={<Raffle />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </main>

      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
