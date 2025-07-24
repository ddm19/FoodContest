import { useState, useEffect } from "react";
import { getVotesByColorAndCategory } from "supabase/pollActions";
import ResultsPanel, { Category } from "./components/resultsPanel/resultsPanel";
import { colors } from "pages/poll/constants";


const TestResults = () => {
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getVotesByColorAndCategory(colors.map(color => color.name), "flavour")
            .then((data) => {
                if (data) {
                    setVotes(data);
                    console.log("Votes fetched:", data);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    return (
        <ResultsPanel
            category={Category.flavour}
            votes={votes}
        />
    );
};

export default TestResults;