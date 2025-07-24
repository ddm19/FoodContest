import { useState, useEffect } from "react";
import { getVotesByColorAndCategory } from "supabase/pollActions";
import ResultsPanel, { Category } from "./components/resultsPanel/resultsPanel";
import { colors } from "pages/poll/constants";
import CustomTabs, { TabItem } from "components/customTabs/customTabs";
import Loading from "components/Loading/Loading";

const TestResults = () => {
    const [votesByCategory, setVotesByCategory] = useState<Record<string, any[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllVotes = async () => {
            try {
                const votePromises = Object.entries(Category).map(async ([key, categoryName]) => {
                    const data = await getVotesByColorAndCategory(colors.map(c => c.name), key);
                    return [categoryName, data || []];
                });
                const results = await Promise.all(votePromises);
                const finalVotesObject = Object.fromEntries(results);
                setVotesByCategory(finalVotesObject);
            } catch (error) {
                console.error("Error fetching votes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllVotes();
    }, []);

    if (loading || Object.keys(votesByCategory).length === 0) {
        return <Loading text="Cargando resultados..." />;
    }

    const tabs: TabItem[] = Object.entries(votesByCategory).map(([categoryName, votesData]) => ({
        title: categoryName,
        content: <ResultsPanel key={categoryName} category={categoryName as Category} votes={votesData} />
    }));

    return (
        <CustomTabs tabs={tabs} />
    );
};

export default TestResults;