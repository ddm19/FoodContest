import CustomButton from "components/customButton/customButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { VoteRecord } from "pages/poll/poll";
import ParticipantIcon from "./participantIcon";

interface ContestParticipant {
    name: string;
    img: string;
}

interface ContestSectionProps {
    raffleRoute: string;
    pollRoute: string;
    resultsRoute: string;
    raffleLabel: string;
    participants: ContestParticipant[];
    totalToVote: number;
    fetchParticipantVotes(): Promise<Record<string, VoteRecord[]> | false>;
}

const ContestSection = (props: ContestSectionProps) => {
    const { raffleRoute, pollRoute, resultsRoute, raffleLabel, participants, totalToVote, fetchParticipantVotes } = props;
    const navigate = useNavigate();

    const initialVotes: { [key: string]: VoteRecord[] } = Object.fromEntries(
        participants.map(participant => [participant.name, []])
    );
    const [participantVotes, setParticipantVotes] = useState<{ [key: string]: VoteRecord[] }>(initialVotes);

    const allVotesDone = (votes: { [key: string]: VoteRecord[] }) => {
        if (!votes || Object.keys(votes).length === 0) return false;
        return Object.entries(votes).every(([_participant, voteRecords]) => voteRecords.length === totalToVote);
    };

    useEffect(() => {
        const fetchVotes = () => {
            fetchParticipantVotes()
                .then((response) => {
                    if (response) {
                        setParticipantVotes(prevVotes => ({ ...prevVotes, ...response }));
                    } else {
                        console.error("Invalid response received from fetchParticipantVotes");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching participant votes:", error);
                });
        };

        fetchVotes();
        const interval = setInterval(fetchVotes, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home__buttonContainer">
            <CustomButton
                variant="text"
                color="primary"
                className="home__sectionButton"
                onClick={() => {
                    navigate(raffleRoute);
                }}
            >
                {raffleLabel}
            </CustomButton>
            <CustomButton
                variant="text"
                color="primary"
                className="home__sectionButton"
                onClick={() => {
                    navigate(pollRoute);
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
                    navigate(resultsRoute);
                }}
            >
                RESULTADOS
                <div className="home__participantsResultsContainer">
                    {Object.entries(participantVotes).map(([participant, voteRecords]) =>
                        voteRecords.length < totalToVote ?
                            <ParticipantIcon
                                key={participant}
                                totalToVote={totalToVote}
                                participant={{ name: participant, votes: voteRecords.length, img: participants.find(p => p.name === participant)?.img || "" }}
                            />
                            : null
                    )}
                </div>
            </CustomButton>
        </div>
    );
};

export default ContestSection;
