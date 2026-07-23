import "./Home.scss";
import { getParticipantVotes } from "supabase/pollActions";
import { getParticipantVotesLetters } from "supabase/letterActions";
import { colors, participants, letterParticipants, letterTeams } from "pages/poll/constants";
import CustomTabs, { TabItem } from "components/customTabs/customTabs";
import ContestSection from "./components/contestSection";

const Home: React.FC = () => {
  const tabs: TabItem[] = [
    {
      title: "Letras 2026",
      content: (
        <ContestSection
          raffleRoute="/raffle-letters"
          pollRoute="/poll-letters"
          resultsRoute="/results-letters"
          raffleLabel="SORTEO DE LETRAS"
          participants={letterParticipants}
          totalToVote={letterTeams.length - 1}
          fetchParticipantVotes={getParticipantVotesLetters}
        />
      ),
    },
    {
      title: "Colores 2025",
      content: (
        <ContestSection
          raffleRoute="/raffle"
          pollRoute="/poll"
          resultsRoute="/results"
          raffleLabel="SORTEO DE COLORES"
          participants={participants}
          totalToVote={colors.length - 1}
          fetchParticipantVotes={getParticipantVotes}
        />
      ),
    },

  ];

  return (
    <div className="home">
      <h1>Bienvenidos a La Velada</h1>
      <CustomTabs tabs={tabs} />
    </div>
  );
};

export default Home;
