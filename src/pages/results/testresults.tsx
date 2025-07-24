import { useState, useEffect } from "react";
import { getVotesByColorAndCategory } from "supabase/pollActions";
import ResultsPanel, { Category } from "./components/resultsPanel/resultsPanel";


const TestResults = () => {
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getVotesByColorAndCategory("Verde", "flavour")
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