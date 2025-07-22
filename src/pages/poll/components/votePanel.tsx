import CustomButton from "components/customButton/customButton";
import { colorGlowClassMap } from "../constants";

interface VotePanelProps {
    votes: Record<string, number | undefined>;
    setVotes: React.Dispatch<React.SetStateAction<Record<string, number | undefined>>>;
    voteCategories: string[];
    selectedColor: string | null;
    setSelectedColor: React.Dispatch<React.SetStateAction<string | null>>;
}

const VotePanel = (props: VotePanelProps) => {
    const { votes, setVotes, voteCategories, selectedColor, setSelectedColor } = props;


    const ratings = [1, 2, 3, 4, 5];

    const handleCategoryVote = (category: string, value: number) => {

        setVotes((prev) => ({
            ...prev,
            [category]: votes[category] == value ? undefined : value,
        }));
    };
    const handleConfirm = () => {
        setTimeout(() => {
            setSelectedColor(null);
            setVotes({});
        }, 400);
    };

    const allVoted = voteCategories.every((cat) => votes[cat]);


    return (
        <div className="poll__votePanel">
            <div className={`poll__categories ${selectedColor ? colorGlowClassMap[selectedColor] : ""}`}>
                {voteCategories.map((category) => (
                    <div className="poll__category" key={category}>
                        <h3 className="poll__categoryName">{category}</h3>
                        <div className="poll__categoryVotes">
                            {ratings.map((ratingValue) => (
                                <div key={ratingValue} className="poll__votePanWrapper">
                                    <button
                                        className={`poll__voteButton${votes[category] === ratingValue ? " poll__voteButton--selected" : ""}`}
                                        onClick={() => handleCategoryVote(category, ratingValue)}
                                        type="button"
                                    >
                                        <img
                                            src='Pan.png'
                                            alt={`Sartén ${ratingValue}`}
                                            className="poll__votePanImg"
                                        />
                                    </button>
                                    <div
                                        className={`poll__voteNumber${votes[category] === ratingValue ? " poll__voteNumber--selected" : ""}`}
                                    >
                                        {ratingValue}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <CustomButton className="poll__button"
                onClick={handleConfirm}
                disabled={!allVoted}
                variant="outlined">
                Confirmar voto
            </CustomButton>
        </div>
    )
}
export default VotePanel;
