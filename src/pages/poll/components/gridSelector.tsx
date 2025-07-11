export interface SelectableItem {
    name: string,
    img?: string,
    backgroundColor?: string
}
interface ParticipantSelectorProps {
    selectables: Array<SelectableItem>
    handleSelect(name: string): void
}

const GridSelector = (props: ParticipantSelectorProps) => {
    const { selectables, handleSelect: handleSelect } = props;

    return (
        <div className="poll__grid">
            {selectables.map((selectable) => (
                <button
                    key={selectable.name}
                    className="poll__colorBox"
                    onClick={() => handleSelect(selectable.name)}
                    data-color={selectable.backgroundColor}
                >
                    {selectable.img && <img src={selectable.img} alt={selectable.name} className="poll__selectableImage" />}
                    <span>{selectable.name}</span>
                </button>
            ))}
        </div>
    )
}
export default GridSelector;