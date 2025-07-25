import React, { useEffect, useState } from "react";
import "./results.scss";
import { voteCategories, participants, colors, fixedAssignments } from "pages/poll/constants";
import supabase from "supabase/supabase";

type VoteRecord = {
    participant: string;
    voteColor: string;
    flavour: number;
    presentation: number;
    fidelity: number;
    originality: number;
};

type Category = "Sabor" | "Presentación" | "Fidelidad" | "Originalidad";

interface ResultSum {
    [color: string]: {
        total: number;
        Sabor: number;
        Presentación: number;
        Fidelidad: number;
        Originalidad: number;
    };
}

const Results: React.FC = () => {
    const [votes, setVotes] = useState<VoteRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVotes = async () => {
            setLoading(true);
            const { data, error } = await supabase.from("Votes").select("*");
            if (!error && data) setVotes(data);
            setLoading(false);
        };
        fetchVotes();
    }, []);

    const results: ResultSum = {};
    colors.forEach((c) => {
        results[c.name] = {
            total: 0,
            Sabor: 0,
            Presentación: 0,
            Fidelidad: 0,
            Originalidad: 0,
        };
    });

    votes.forEach((v) => {
        if (!results[v.voteColor]) return;
        results[v.voteColor].Sabor += v.flavour || 0;
        results[v.voteColor].Presentación += v.presentation || 0;
        results[v.voteColor].Fidelidad += v.fidelity || 0;
        results[v.voteColor].Originalidad += v.originality || 0;
        results[v.voteColor].total +=
            (v.flavour || 0) +
            (v.presentation || 0) +
            (v.fidelity || 0) +
            (v.originality || 0);
    });

    const winnerGeneral = Object.entries(results).sort(
        (a, b) => b[1].total - a[1].total
    )[0];

    const categoryWinners: Record<Category, string> = {
        Sabor: "",
        Presentación: "",
        Fidelidad: "",
        Originalidad: "",
    };
    (["Sabor", "Presentación", "Fidelidad", "Originalidad"] as Category[]).forEach(
        (cat) => {
            categoryWinners[cat] = Object.entries(results).sort(
                (a, b) => b[1][cat] - a[1][cat]
            )[0]?.[0] || "";
        }
    );

    const getTeamByColor = (color: string): string => {
        const entry = Object.entries(fixedAssignments).find(
            ([, assignedColor]) => assignedColor === color
        );
        return entry ? entry[0] : "";
    };

    return (
        <div className="results">
            <h1 className="results__title">Resultados</h1>
            {loading ? (
                <div className="results__loading">Cargando...</div>
            ) : (
                <>
                    <h2 className="results__subtitle">Ganador General</h2>
                    <div className="results__winner">
                        <span className="results__winnerColor">
                            {winnerGeneral?.[0]}{" "}
                            <span className="results__winnerTeam">
                                ({getTeamByColor(winnerGeneral?.[0])})
                            </span>
                        </span>
                        <span className="results__winnerScore">{winnerGeneral?.[1].total} puntos</span>
                    </div>
                    <h2 className="results__subtitle">Ganadores por Categoría</h2>
                    <div className="results__categories">
                        {voteCategories.map((cat) => (
                            <div className="results__category" key={cat}>
                                <span className="results__categoryName">{cat}:</span>
                                <span className="results__categoryWinner">
                                    {categoryWinners[cat as Category]}
                                    {" "}
                                    (
                                    {getTeamByColor(categoryWinners[cat as Category])}
                                    )
                                    ({results[categoryWinners[cat as Category] as string]?.[cat as Category] || 0} puntos)
                                </span>
                            </div>
                        ))}
                    </div>
                    <h2 className="results__subtitle">Tabla de Puntuaciones</h2>
                    <div className="results__tableWrapper">
                        <table className="results__table">
                            <thead>
                                <tr>
                                    <th>Color</th>
                                    <th>Equipo</th>
                                    {voteCategories.map((cat) => (
                                        <th key={cat}>{cat}</th>
                                    ))}
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...colors]
                                    .sort((a, b) => results[b.name].total - results[a.name].total)
                                    .map((c) => (
                                        <tr key={c.name}>
                                            <td>{c.name}</td>
                                            <td>{getTeamByColor(c.name)}</td>
                                            {voteCategories.map((cat) => (
                                                <td key={cat}>{results[c.name][cat as Category]}</td>
                                            ))}
                                            <td>{results[c.name].total}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Results;