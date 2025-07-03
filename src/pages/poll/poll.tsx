import React, { useState } from "react";
import CustomButton from "components/customButton/customButton";
import "./poll.scss";

const colors = [
    "Amarillo",
    "Naranja",
    "Rojo",
    "Rosa",
    "Marrón",
    "Verde",
    "Blanco",
    "Negro",
];

const colorClassMap: Record<string, string> = {
    Amarillo: "poll__title--amarillo",
    Naranja: "poll__title--naranja",
    Rojo: "poll__title--rojo",
    Rosa: "poll__title--rosa",
    Marrón: "poll__title--marron",
    Verde: "poll__title--verde",
    Blanco: "poll__title--blanco",
    Negro: "poll__title--negro",
};

const colorGlowMap: Record<string, string> = {
    Amarillo: "poll__votePanel--glow-amarillo",
    Naranja: "poll__votePanel--glow-naranja",
    Rojo: "poll__votePanel--glow-rojo",
    Rosa: "poll__votePanel--glow-rosa",
    Marrón: "poll__votePanel--glow-marron",
    Verde: "poll__votePanel--glow-verde",
    Blanco: "poll__votePanel--glow-blanco",
    Negro: "poll__votePanel--glow-negro",
};

const categories = [
    "Sabor",
    "Presentación",
    "Fidelidad",
    "Originalidad",
];

type Votes = {
    [category: string]: number;
};

const participants = [
    { name: "Mery", img: "Mery.png" },
    { name: "Marc", img: "Marc.png" },
    { name: "Dani", img: "Dani.png" },
    { name: "Brisa", img: "Brisa.png" },
    { name: "Antonio", img: "Antonio.png" },
    { name: "Noelia", img: "Noelia.png" },
    { name: "Marcos", img: "Marcos.png" },
    { name: "Assem", img: "Assem.png" },
    { name: "Moru", img: "Moru.png" },
    { name: "Jorge", img: "Jorge.png" },
    { name: "Javilo", img: "Javilo.png" },
    { name: "Ana", img: "Ana.png" },
    { name: "Manu", img: "Manu.png" },
    { name: "Sonia", img: "Sonia.png" },
    { name: "Guti", img: "Guti.png" },
    { name: "Erika", img: "Erika.png" },
];

const Poll: React.FC = () => {
    const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [votes, setVotes] = useState<Votes>({});
    const [glow, setGlow] = useState(false);

    const handleCategoryVote = (category: string, value: number) => {
        setVotes((prev) => ({
            ...prev,
            [category]: value,
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
        setGlow(false);
        setTimeout(() => setGlow(true), 30);
    };

    const handleConfirm = () => {
        setGlow(false);
        setTimeout(() => {
            setSelectedColor(null);
            setVotes({});
        }, 400);
    };

    const allVoted = categories.every((cat) => votes[cat]);

    return (
        <div className="poll">
            <h2 className={`poll__title ${selectedColor ? colorClassMap[selectedColor] : ""}`}>
                {selectedColor ? selectedColor : selectedParticipant ? selectedParticipant : "VOTACIONES"}
            </h2>
            {!selectedParticipant && (
                <div className="poll__grid">
                    {participants.map((p) => (
                        <button
                            key={p.name}
                            className="poll__colorBox"
                            onClick={() => handleParticipantSelect(p.name)}
                            style={{ flexDirection: "column" }}
                        >
                            <img src={p.img} alt={p.name} style={{ width: 60, height: 60, borderRadius: "50%" }} />
                            <span>{p.name}</span>
                        </button>
                    ))}
                </div>
            )}

            {selectedParticipant && !selectedColor && (
                <div className="poll__grid">
                    {colors.map((color) => (
                        <div
                            key={color}
                            className="poll__colorBox"
                            data-color={color}
                            onClick={() => handleColorSelect(color)}
                        >
                            {color}
                        </div>
                    ))}
                </div>
            )}

            {selectedColor && (
                <div className="poll__votePanel">
                    <div className={`poll__categories poll__categories--glow-${selectedColor.toLowerCase()}`}>
                        {categories.map((cat) => (
                            <div className="poll__category" key={cat}>
                                <h3 className="poll__categoryName">{cat}</h3>
                                <div className="poll__categoryVotes">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <div key={val} className="poll__votePanWrapper">
                                            <button
                                                className={`poll__voteButton${votes[cat] === val ? " poll__voteButton--selected" : ""}`}
                                                onClick={() => handleCategoryVote(cat, val)}
                                                type="button"
                                            >
                                                <img
                                                    src='Pan.png'
                                                    alt={`Sartén ${val}`}
                                                    className="poll__votePanImg"
                                                />
                                            </button>
                                            <div
                                                className={`poll__voteNumber${votes[cat] === val ? " poll__voteNumber--selected" : ""}`}
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
