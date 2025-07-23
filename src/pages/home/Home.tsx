import CustomButton from "components/customButton/customButton";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "supabase/supabase";
import { participants } from "pages/poll/constants";
import { colors } from "pages/poll/constants"; 

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [allVotesDone, setAllVotesDone] = useState(false);

  useEffect(() => {
    const checkVotes = async () => {
      const { data, error } = await supabase.from("Votes").select("*");
      if (!error && data) {
        const votesMap: Record<string, Set<string>> = {};
        participants.forEach((p) => {
          votesMap[p.name] = new Set();
        });
        data.forEach((v: any) => {
          if (votesMap[v.participant]) {
            votesMap[v.participant].add(v.voteColor);
          }
        });
        const allDone = participants.every((p) => {
          return (
            votesMap[p.name] &&
            colors.every((c) => votesMap[p.name].has(c.name))
          );
        });
        setAllVotesDone(allDone);
      }
    };
    checkVotes();
  }, []);

  return (
    <div className="home">
      <h1>Bienvenidos a La Velada de colorines 2025</h1>
      <div className="home__buttonContainer">
        <CustomButton
          variant="text"
          color="primary"
          className="home__sectionButton"
          onClick={() => {
            navigate("/raffle");
          }}
        >
          SORTEO DE COLORES
        </CustomButton>
        <CustomButton
          variant="text"
          color="primary"
          className="home__sectionButton"
          onClick={() => {
            navigate("/poll");
          }}
        >
          VOTACIONES
        </CustomButton>
        <CustomButton
          variant="text"
          color="primary"
          className="home__sectionButton"
          disabled={!allVotesDone}
          onClick={() => {
            navigate("/results");
          }}
        >
          RESULTADOS
        </CustomButton>
      </div>
    </div>
  );
};

export default Home;
