import DataTable from "components/dataTable/dataTable";

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

    const { category, votes } = props;
    if (!votes || votes.length === 0) {
        return <div>No hay votos para mostrar en esta categoría.</div>;
    }
    // Prepara los datos para la tabla
    const data = votes.map((vote) => ({
        voteColor: vote.voteColor,
        [category]: vote[Object.keys(Category).find(key => Category[key as keyof typeof Category] === category)!],
    }));

    return (
        <div>
            <DataTable
                title={`Resultados de la categoría ${category}`}
                columns={[
                    { header: "Color", accessor: "voteColor" },
                    { header: "Puntuación", accessor: category, dataColorAccessor: "voteColor" },
                ]}
                data={data}
                className="resultsPanel__tableContainer"
                sortBy={category}
            />
        </div>
    );
};
export default ResultsPanel;
