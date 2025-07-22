import { faBan, faStar } from "@fortawesome/free-solid-svg-icons";
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
    disabledColor?: string | null;
}

const GridSelector: React.FC<GridSelectorProps> = ({
    selectables,
    handleSelect,
    votedColors = [],
    disabledColor,
}) => {
    return (
        <div className="poll__grid">
            {selectables.map((selectable) => {
                const hasVoted = votedColors.includes(selectable.name);
                const isDisabled = selectable.name === disabledColor;
                return (
                    <button
                        key={selectable.name}
                        className={`poll__colorBox${hasVoted ? " poll__colorBox--voted" : ""}${isDisabled ? " poll__colorBox--disabled" : ""
                            }`}
                        onClick={() => handleSelect(selectable.name)}
                        data-color={selectable.backgroundColor}
                        disabled={isDisabled}
                    >
                        {selectable.img && (
                            <img
                                src={selectable.img}
                                alt={selectable.name}
                                className="poll__selectableImage"
                            />
                        )}
                        <span className="poll__colorName">{selectable.name}</span>
                        {hasVoted && !isDisabled && <FontAwesomeIcon icon={faStar} className="poll__votedStar" />}
                        {isDisabled && <span className="poll__disabledOverlay"><FontAwesomeIcon icon={faBan} /> </span>}
                    </button>
                );
            })}
        </div>
    );
};

export default GridSelector;
