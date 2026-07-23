import React, { useState } from "react";
import CustomButton from "components/customButton/customButton";
import { upsertVotes } from "supabase/pollActions";
import { VoteRecord } from "pages/poll/poll";
import Loading from "components/Loading/Loading";

interface VotePanelProps {
    participant: string | null;
    votes: Record<string, number | undefined>;
    setVotes: React.Dispatch<React.SetStateAction<Record<string, number | undefined>>>;
    voteCategories: string[];
    selectedColor: string | null;
    setSelectedColor: React.Dispatch<React.SetStateAction<string | null>>;
    reloadVotes(): void;
    upsertVotesFn?: (participant: string, color: string, votes: VoteRecord) => PromiseLike<any>;
    glowClass?: string;
}

const VotePanel: React.FC<VotePanelProps> = ({
    participant,
    votes,
    setVotes,
    voteCategories,
    selectedColor,
    setSelectedColor,
    reloadVotes,
    upsertVotesFn = upsertVotes,
    glowClass = "",
}) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const ratings = [1, 2, 3, 4, 5];

    if (!participant) return <div>Error: no participante.</div>;

    const handleCategoryVote = (category: string, value: number) => {
        setVotes((prev) => ({
            ...prev,
            [category]: prev[category] === value ? undefined : value,
        }));
    };

    const allVoted = voteCategories.every((cat) => typeof votes[cat] === "number");

    const handleConfirm = async () => {
        if (!allVoted || !selectedColor) return;
        setLoading(true);
        setErrorMsg(null);
        try {
            await upsertVotesFn(participant, selectedColor, {
                voteColor: selectedColor,
                flavour: votes["Sabor"]!,
                presentation: votes["Presentación"]!,
                fidelity: votes["Fidelidad"]!,
                originality: votes["Originalidad"]!,
            });
            reloadVotes();
            setTimeout(() => {
                setSelectedColor(null);
                setVotes({});
                setLoading(false);
            }, 1000);
        } catch {
            setErrorMsg("Error guardando votos.");
            setLoading(false);
        }
    };

    return (
        <div className="poll__votePanel">
            {errorMsg && <div className="poll__error">{errorMsg}</div>}
            {loading ? (
                <Loading text="Guardando Voto..." />
            ) : (
                <>
                    <div className={`poll__categories ${glowClass}`}>
                        {voteCategories.map((category) => (
                            <div className="poll__category" key={category}>
                                <h3 className="poll__categoryName">{category}</h3>
                                <div className="poll__categoryVotes">
                                    {ratings.map((ratingValue) => (
                                        <div key={ratingValue} className="poll__votePanWrapper">
                                            <button
                                                type="button"
                                                className={`poll__voteButton${votes[category] === ratingValue ? " poll__voteButton--selected" : ""}`}
                                                onClick={() => handleCategoryVote(category, ratingValue)}
                                            >
                                                <img src="Pan.png" alt={`Sartén ${ratingValue}`} className="poll__votePanImg" />
                                            </button>
                                            <div className={`poll__voteNumber${votes[category] === ratingValue ? " poll__voteNumber--selected" : ""}`}>
                                                {ratingValue}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <CustomButton className="poll__button" onClick={handleConfirm} disabled={!allVoted} variant="outlined">
                        Confirmar Votos
                    </CustomButton>
                </>
            )}
        </div>
    );
};

export default VotePanel;
