import DataTable from "components/dataTable/dataTable";
import "./resultsPanel.scss";

export enum Category {
    flavour = "Sabor",
    presentation = "Presentación",
    fidelity = "Fidelidad",
    originality = "Originalidad",

}


interface ResultsPanelProps {
    category: Category | "Final";
    votes: Array<{ [key: string]: number }>;
    resolveColorToken?: (voteColor: string) => string;
}

const ResultsPanel = (props: ResultsPanelProps) => {

    const { category, votes, resolveColorToken = (voteColor: string) => voteColor } = props;
    if (!votes || votes.length === 0) {
        return <div>No hay votos para mostrar en esta categoría.</div>;
    }
    // Prepara los datos para la tabla
    let data = votes.map((vote) => ({
        voteColor: vote.voteColor,
        colorToken: resolveColorToken(vote.voteColor as unknown as string),
        [category]: vote[Object.keys(Category).find(key => Category[key as keyof typeof Category] === category)!],
    }));
    if (category === "Final") {
        data = votes.map((vote) => ({
            voteColor: vote.voteColor,
            colorToken: resolveColorToken(vote.voteColor as unknown as string),
            finalScore: vote.finalscore
        }));
    }

    return (
        <>
            <h1 className="resultsPanel__title">
                Resultados de la categoría <span className="resultsPanel__title--highlight">{category}</span>
            </h1>
            <DataTable
                columns={[
                    { header: "Color", accessor: "voteColor", dataColorAccessor: "colorToken" },
                    { header: "Puntuación", accessor: category !== "Final" ? category : "finalScore", dataColorAccessor: "colorToken" },
                ]}
                data={data}
                className="resultsPanel__tableContainer"
                sortBy={category}
                isBlurred={true}
            />
        </>
    );
};
export default ResultsPanel;
