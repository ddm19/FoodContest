import React, { useEffect, useState } from "react";
import "./poll.scss";
import GridSelector from "./components/gridSelector";
import { colors, voteCategories, colorClassMap, participants } from "./constants";
import VotePanel from "./components/votePanel";
import { getVotes } from "supabase/pollActions";
import CustomButton from "components/customButton/customButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type Votes = { [category: string]: number | undefined };

type VoteRecord = {
    voteColor: string;
    flavour: number;
    presentation: number;
    fidelity: number;
    originality: number;
};

const Poll: React.FC = () => {
    const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
        () => localStorage.getItem("selectedParticipant")
    );
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [votes, setVotes] = useState<Votes>({});
    const [voteRecords, setVoteRecords] = useState<VoteRecord[]>([]);
    const [votedColors, setVotedColors] = useState<string[]>([]);

    const handleParticipantSelect = (name: string) => {
        setSelectedParticipant(name);
        setSelectedColor(null);
        setVotes({});
        setVoteRecords([]);
        setVotedColors([]);
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setVotes({});
    };

    const handleBack = () => {
        if (selectedColor) {
            setSelectedColor(null);
            setVotes({});
        } else if (selectedParticipant) {
            setSelectedParticipant(null);
            setVoteRecords([]);
            setVotedColors([]);
        }
    };


    useEffect(() => {
        if (selectedParticipant) {
            localStorage.setItem("selectedParticipant", selectedParticipant);
        } else {
            localStorage.removeItem("selectedParticipant");
        }

        if (!selectedParticipant) return;
        getVotes(selectedParticipant)
            .then(({ data, error }) => {
                if (error) {
                    console.error("Error al recuperar votos:", error);
                    return;
                }
                const records = data ?? [];
                setVoteRecords(records);
                setVotedColors(records.map((v) => v.voteColor));
            })
    }, [selectedParticipant]);

    useEffect(() => {
        if (!selectedColor) return;
        const record = voteRecords.find((v) => v.voteColor === selectedColor);
        if (record) {
            setVotes({
                Sabor: record.flavour,
                Presentación: record.presentation,
                Fidelidad: record.fidelity,
                Originalidad: record.originality,
            });
        } else {
            setVotes({});
        }
    }, [selectedColor, voteRecords]);

    return (
        <div className="poll">
            {(selectedColor || selectedParticipant) && (
                <CustomButton className="poll__backButton" variant="outlined" onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </CustomButton>
            )}

            <h1 className={`poll__title ${selectedColor ? colorClassMap[selectedColor] : ""}`}>
                {selectedColor
                    ? selectedColor
                    : selectedParticipant
                        ? `${selectedParticipant}, ¿qué color votas?`
                        : "¿Quién eres?"}
            </h1>

            {!selectedParticipant && (
                <GridSelector
                    selectables={participants}
                    handleSelect={handleParticipantSelect}
                />
            )}

            {selectedParticipant && !selectedColor && (
                <GridSelector
                    selectables={colors}
                    handleSelect={handleColorSelect}
                    votedColors={votedColors}
                />
            )}

            {selectedColor && (
                <VotePanel
                    votes={votes}
                    setVotes={setVotes}
                    voteCategories={voteCategories}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
            )}
        </div>
    );
};

export default Poll;
