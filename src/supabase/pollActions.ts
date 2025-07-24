import { VoteRecord } from "pages/poll/poll"
import supabase from "./supabase"


export const getVotes = (participant: string) =>
{
    return supabase.from('Votes').select('*')
        .eq('participant', participant)
}

export const upsertVotes = (
    participant: string,
    color: string,
    votes: VoteRecord
) =>
{
    return supabase.from('Votes').upsert(
        {
            participant: participant,
            voteColor: color,
            flavour: votes.flavour,
            presentation: votes.presentation,
            fidelity: votes.fidelity,
            originality: votes.originality,
        }    )
}

export const getParticipantColor = (participant: string) =>
{
    return supabase.from('Participant').select('color')
        .eq('name', participant)
        .single()
        
}
export const getAllVotes = () =>
{
    return supabase.from('Votes').select('*')
}

interface Vote {
    participant: string;
    voteColor: string;
    flavour: number;
    presentation: number;
    fidelity: number;
    originality: number;
}

function wrapVotesByParticipant(votes: Vote[]) {
    return votes.reduce((acc, vote) => {
        if (!acc[vote.participant]) {
            acc[vote.participant] = [];
        }
            acc[vote.participant].push({
                voteColor: vote.voteColor,
                flavour: vote.flavour,
                presentation: vote.presentation,
                fidelity: vote.fidelity,
                originality: vote.originality,
            });
        return acc;
    }, {} as Record<string, VoteRecord[]>);
} 

export const getParticipantVotes = async () =>
{
    const { data, error } = await supabase.from('Votes').select('*')
        .not('voteColor', 'is', null)
        .not('flavour', 'is', null)
        .not('presentation', 'is', null)
        .not('fidelity', 'is', null)
        .not('originality', 'is', null)
   
    if (error) {
        console.error("Error fetching votes:", error)
        return false
    }
    return wrapVotesByParticipant(data || []);
}

export const getVotesByColorAndCategory = async (color: string, category: string) : Promise<any> =>
{
    //  votes by color
    const { data, error } = await supabase
  .from('Votes')
  .select(`
    voteColor,
    ${category}:${category}.sum()
  `)
  .eq('voteColor', color);

    if (error) {
        console.error("Error fetching votes:", error)
        return false
    }
    return data || [];
}