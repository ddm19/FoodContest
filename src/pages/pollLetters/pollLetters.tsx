import React, { useEffect, useState } from "react";
import "pages/poll/poll.scss";
import GridSelector, { SelectableItem } from "pages/poll/components/gridSelector";
import { voteCategories, colorClassMap, colorGlowClassMap, letterParticipants, getLetterSpanishColor, getLetterEnglishColor } from "pages/poll/constants";
import VotePanel from "pages/poll/components/votePanel";
import { getVotesLetters, getParticipantLetter, getAssignedLetters, upsertVotesLetters } from "supabase/letterActions";
import CustomButton from "components/customButton/customButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { VoteRecord } from "pages/poll/poll";

type Votes = { [category: string]: number | undefined };

const PollLetters: React.FC = () => {
    const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
        () => localStorage.getItem("selectedLetterParticipant")
    );
    const [participantLetter, setParticipantLetter] = useState<string | null>(null);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [assignedLetters, setAssignedLetters] = useState<SelectableItem[]>([]);
    const [votes, setVotes] = useState<Votes>({});
    const [voteRecords, setVoteRecords] = useState<VoteRecord[]>([]);
    const [votedLetters, setVotedLetters] = useState<string[]>([]);

    useEffect(() => {
        getAssignedLetters().then((letters) => {
            setAssignedLetters(
                letters.map((letter) => ({ name: letter, backgroundColor: getLetterEnglishColor(letter) }))
            );
        });
    }, []);

    const fetchVoteRecords = () => {
        if (!selectedParticipant) return;
        getVotesLetters(selectedParticipant).then(({ data, error }) => {
            if (error) return;
            const records = data ?? [];
            setVoteRecords(records);
            setVotedLetters(records.map((v) => v.voteColor));
        });
    };

    useEffect(() => {
        if (selectedParticipant) {
            localStorage.setItem("selectedLetterParticipant", selectedParticipant);
        } else {
            localStorage.removeItem("selectedLetterParticipant");
        }
        setSelectedLetter(null);
        setVotes({});
        setVoteRecords([]);
        setVotedLetters([]);
        setParticipantLetter(null);
        if (selectedParticipant) {
            fetchVoteRecords();
            getParticipantLetter(selectedParticipant).then(({ data, error }) => {
                if (!error && data?.color) setParticipantLetter(data.color);
            });
        }
    }, [selectedParticipant]);

    const handleParticipantSelect = (name: string) => {
        setSelectedParticipant(name);
    };

    const handleLetterSelect = (letter: string) => {
        setSelectedLetter(letter);
        setVotes({});
    };

    const handleBack = () => {
        if (selectedLetter) {
            setSelectedLetter(null);
            setVotes({});
        } else {
            setSelectedParticipant(null);
        }
    };

    useEffect(() => {
        if (!selectedLetter) return;
        const record = voteRecords.find((v) => v.voteColor === selectedLetter);
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
    }, [selectedLetter, voteRecords]);

    return (
        <div className="poll">
            {(selectedLetter || selectedParticipant) && (
                <CustomButton className="poll__backButton" variant="outlined" onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </CustomButton>
            )}

            <h1 className={`poll__title ${selectedLetter ? colorClassMap[getLetterSpanishColor(selectedLetter)] : ""}`}>
                {selectedLetter
                    ? selectedLetter
                    : selectedParticipant
                        ? `${selectedParticipant}, ¿qué letra votas?`
                        : "¿Quién eres?"}
            </h1>

            {!selectedParticipant && (
                <GridSelector
                    selectables={letterParticipants}
                    handleSelect={handleParticipantSelect}
                />
            )}

            {selectedParticipant && !selectedLetter && (
                <GridSelector
                    selectables={assignedLetters}
                    handleSelect={handleLetterSelect}
                    votedColors={votedLetters}
                    disabledColor={participantLetter}
                />
            )}

            {selectedLetter && (
                <VotePanel
                    participant={selectedParticipant}
                    votes={votes}
                    setVotes={setVotes}
                    voteCategories={voteCategories}
                    selectedColor={selectedLetter}
                    setSelectedColor={setSelectedLetter}
                    reloadVotes={fetchVoteRecords}
                    upsertVotesFn={upsertVotesLetters}
                    glowClass={colorGlowClassMap[getLetterSpanishColor(selectedLetter)]}
                />
            )}
        </div>
    );
};

export default PollLetters;
