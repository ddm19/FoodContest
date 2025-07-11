import React, { useEffect, useState } from "react";
import CustomButton from "components/customButton/customButton";
import "./poll.scss";
import GridSelector from "./components/gridSelector";
import { colors, voteCategories, colorClassMap, participants, colorGlowClassMap } from "./constants";


type Votes = {
    [category: string]: number | undefined;
};



const Poll: React.FC = () => {
    const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [votes, setVotes] = useState<Votes>({});

    const handleCategoryVote = (category: string, value: number) => {

        setVotes((prev) => ({
            ...prev,
            [category]: votes[category] == value ? undefined : value,
        }));
    };

    const handleParticipantSelect = (name: string) => {
        setSelectedParticipant(name);
        setSelectedColor(null);
        setVotes({});
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setVotes({});
    };

    const handleConfirm = () => {
        setTimeout(() => {
            setSelectedColor(null);
            setVotes({});
        }, 400);
    };

    const allVoted = voteCategories.every((cat) => votes[cat]);


    useEffect(() => {
        console.log("selectedParticipant: ", selectedParticipant)
        console.log("Color: ", selectedColor)
        console.log("Votos: ", votes)

    }, [votes])

    return (
        <div className="poll">
            <h1 className={`poll__title ${selectedColor ? colorClassMap[selectedColor] : ""}`}>
                {selectedColor ? selectedColor : selectedParticipant ? `${selectedParticipant} qué Color quieres votar?` : "Quién Eres?"}
            </h1>
            {!selectedParticipant && (
                <GridSelector selectables={participants} handleSelect={handleParticipantSelect} />
            )}

            {selectedParticipant && !selectedColor && (
                <GridSelector selectables={colors} handleSelect={handleColorSelect} />
            )}

            {selectedColor && (
                <div className="poll__votePanel">
                    <div className={`poll__categories ${selectedColor ? colorGlowClassMap[selectedColor] : ""}`}>
                        {voteCategories.map((category) => (
                            <div className="poll__category" key={category}>
                                <h3 className="poll__categoryName">{category}</h3>
                                <div className="poll__categoryVotes">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <div key={val} className="poll__votePanWrapper">
                                            <button
                                                className={`poll__voteButton${votes[category] === val ? " poll__voteButton--selected" : ""}`}
                                                onClick={() => handleCategoryVote(category, val)}
                                                type="button"
                                            >
                                                <img
                                                    src='Pan.png'
                                                    alt={`Sartén ${val}`}
                                                    className="poll__votePanImg"
                                                />
                                            </button>
                                            <div
                                                className={`poll__voteNumber${votes[category] === val ? " poll__voteNumber--selected" : ""}`}
                                            >
                                                {val}
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
            )}
        </div>
    );
};

export default Poll;
