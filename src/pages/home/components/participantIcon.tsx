import { colors } from "pages/poll/constants";
import "./participantIcon.scss"

interface Participant {
  votes: number;
  name: string;
  img: string;
}

interface ParticipantIconProps {
  participant: Participant;
}

const ParticipantIcon = (props: ParticipantIconProps) => {
  const { participant } = props;

  return (
    <div
      className={`participantIcon`}
    >
      <img src={participant.img} alt={participant.name} />
      <span className="participantIcon__vote">{colors.length - 1 - participant.votes}</span>
    </div>
  );
}
export default ParticipantIcon;