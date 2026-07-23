import { useState, useEffect } from "react";
import { getVotesByLetterAndCategory, getVotesByLetterSummary, getAssignedLetters } from "supabase/letterActions";
import { getLetterSpanishColor } from "pages/poll/constants";
import ResultsPanel, { Category } from "pages/results/components/resultsPanel/resultsPanel";
import CustomTabs, { TabItem } from "components/customTabs/customTabs";
import Loading from "components/Loading/Loading";

const ResultsLetters = () => {
    const [votesByCategory, setVotesByCategory] = useState<Record<string, any[]>>({});
    const [summaryVotes, setSummaryVotes] = useState<Record<string, number>[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFinalVotes = async () => {
            try {
                const finalVotes = await getVotesByLetterSummary();
                if (finalVotes) {
                    setSummaryVotes(finalVotes);
                }
            } catch (error) {
                console.error("Error fetching final letter votes:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllVotes = async () => {
            try {
                const assignedLetters = await getAssignedLetters();
                const votePromises = Object.entries(Category).map(async ([key, categoryName]) => {
                    const data = await getVotesByLetterAndCategory(assignedLetters, key);
                    return [categoryName, data || []];
                });
                const results = await Promise.all(votePromises);
                const finalVotesObject = Object.fromEntries(results);
                setVotesByCategory(finalVotesObject);
            } catch (error) {
                console.error("Error fetching letter votes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllVotes();
        fetchFinalVotes();
    }, []);

    if (loading || Object.keys(votesByCategory).length === 0) {
        return <Loading text="Cargando resultados..." />;
    }

    const finalTab =
    {
        title: "Final",
        content: <ResultsPanel key="Final" category={"Final"} votes={summaryVotes} resolveColorToken={getLetterSpanishColor} />
    }

    const tabs: TabItem[] = Object.entries(votesByCategory).map(([categoryName, votesData]) => ({
        title: categoryName,
        content: <ResultsPanel key={categoryName} category={categoryName as Category} votes={votesData} resolveColorToken={getLetterSpanishColor} />
    })).concat([finalTab]);

    return (
        <CustomTabs tabs={tabs} />
    );
};

export default ResultsLetters;
