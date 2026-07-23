import "./participantIcon.scss"

interface Participant {
  votes: number;
  name: string;
  img: string;
}

interface ParticipantIconProps {
  participant: Participant;
  totalToVote: number;
}

const ParticipantIcon = (props: ParticipantIconProps) => {
  const { participant, totalToVote } = props;

  return (
    <div
      className={`participantIcon`}
    >
      <img src={participant.img} alt={participant.name} />
      <span className="participantIcon__vote">{totalToVote - participant.votes}</span>
    </div>
  );
}
export default ParticipantIcon;