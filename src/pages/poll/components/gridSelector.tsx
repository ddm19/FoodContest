import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface SelectableItem {
    name: string;
    img?: string;
    backgroundColor?: string;
}

interface GridSelectorProps {
    selectables: Array<SelectableItem>;
    handleSelect(name: string): void;
    votedColors?: string[];
}

const GridSelector: React.FC<GridSelectorProps> = ({
    selectables,
    handleSelect,
    votedColors = [],
}) => {
    return (
        <div className="poll__grid">
            {selectables.map((selectable) => {
                const hasVoted = votedColors.includes(selectable.name);
                return (
                    <button
                        key={selectable.name}
                        className="poll__colorBox"
                        onClick={() => handleSelect(selectable.name)}
                        data-color={selectable.backgroundColor}
                    >
                        {selectable.img && (
                            <img
                                src={selectable.img}
                                alt={selectable.name}
                                className="poll__selectableImage"
                            />
                        )}
                        <span>{selectable.name}</span>
                        {hasVoted && <span className="poll__votedStar"><FontAwesomeIcon icon={faStar} /></span>}
                    </button>
                );
            })}
        </div>
    );
};

export default GridSelector;
