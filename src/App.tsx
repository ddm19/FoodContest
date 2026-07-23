import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home/Home";
import NoPage from "./pages/notFound/notFound";
import { Routes, Route } from "react-router-dom";
import Raffle from "pages/raffle/raffle";
import Poll from "pages/poll/poll";
import Results from "pages/results/results";
import TestResults from "pages/results/testresults";
import RaffleLetters from "pages/raffleLetters/raffleLetters";
import PollLetters from "pages/pollLetters/pollLetters";
import ResultsLetters from "pages/resultsLetters/resultsLetters";

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
          <Route path="/poll" element={<Poll />} />
          <Route path="/results" element={<TestResults />} />
          <Route path="/backupresults" element={<Results />} />
          <Route path="/raffle-letters" element={<RaffleLetters />} />
          <Route path="/poll-letters" element={<PollLetters />} />
          <Route path="/results-letters" element={<ResultsLetters />} />
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
