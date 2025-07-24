
export enum Category {
    flavour = "Sabor",
    presentation = "Presentación",
    fidelity = "Fidelidad",
    originality = "Originalidad",
}

interface ResultsPanelProps {
    category: Category;
    votes: Array<{ [key: string]: number }>;
}

const ResultsPanel = (props: ResultsPanelProps) => {
    return (
        <div>
            <h2>Resultados para la categoría: {props.category}</h2>
            <ul>
                {props.votes.map((vote, index) => (
                    <li key={index}>
                        {Object.entries(vote).map(([option, count]) => (
                            <div key={option}>
                                {option}: {count} votos
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ResultsPanel;
