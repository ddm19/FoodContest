import React, { useEffect, useState } from "react";
import "./poll.scss";
import GridSelector from "./components/gridSelector";
import { colors, voteCategories, colorClassMap, participants } from "./constants";
import VotePanel from "./components/votePanel";


type Votes = {
    [category: string]: number | undefined;
};



const Poll: React.FC = () => {
    const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [votes, setVotes] = useState<Votes>({});

    const handleParticipantSelect = (name: string) => {
        setSelectedParticipant(name);
        setSelectedColor(null);
        setVotes({});
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setVotes({});
    };


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
                <VotePanel votes={votes} setVotes={setVotes} voteCategories={voteCategories} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            )}
        </div>
    );
};

export default Poll;
