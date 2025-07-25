import CustomButton from "components/customButton/customButton";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getParticipantVotes } from "supabase/pollActions";
import { VoteRecord } from "pages/poll/poll";
import { colors, participants } from "pages/poll/constants";
import ParticipantIcon from "./components/participantIcon";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const initialVotes: { [key: string]: VoteRecord[] } = {
    ...Object.fromEntries(participants.map(participant => [participant.name, []]))

  };
  const [participantVotes, setParticipantVotes] = useState<{ [key: string]: VoteRecord[] }>(initialVotes);


  const allVotesDone = (votes: { [key: string]: VoteRecord[] }) => {
    if (!votes || Object.keys(votes).length === 0) return false;
    return Object.entries(votes).every(([_participant, voteRecords]) => {
      const votedColors = voteRecords.map(record => record.voteColor);
      return votedColors.length === colors.length - 1
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getParticipantVotes()
        .then((response) => {
          if (response) {
            setParticipantVotes(prevVotes => ({ ...prevVotes, ...response }));
          } else {
            console.error("Invalid response received from getParticipantVotes");
          }
          console.log(allVotesDone(response || {}));
        })
        .catch((error) => {
          console.error("Error fetching participant votes:", error);
        });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getParticipantVotes()
      .then((response) => {
        if (response)
          setParticipantVotes(prevVotes => ({ ...prevVotes, ...response }));
        else
          console.error("Invalid response received from getParticipantVotes");
        console.log(allVotesDone(response || {}));
      })
      .catch((error) => {
        console.error("Error fetching participant votes:", error);
      });
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
          className="home__sectionButton home__sectionButton--results"
          disabled={!allVotesDone(participantVotes)}
          onClick={() => {
            navigate("/results");
          }}
        >
          RESULTADOS
          <div className="home__participantsResultsContainer">
            {Object.entries(participantVotes).map(([participant, voteRecords]) =>
              voteRecords.length < colors.length - 1 ?
                <ParticipantIcon
                  key={participant}
                  participant={{ name: participant, votes: voteRecords.length, img: participants.find(p => p.name === participant)?.img || "" }}
                />
                : null
            )}
          </div>

        </CustomButton>
      </div>
    </div>
  );
};

export default Home;
