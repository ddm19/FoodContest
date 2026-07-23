import { VoteRecord } from "pages/poll/poll"
import supabase from "./supabase"

export const getVotesLetters = (participant: string) =>
{
    return supabase.from('Votes_letters').select('*')
        .eq('participant', participant)
}

export const upsertVotesLetters = (
    participant: string,
    letter: string,
    votes: VoteRecord
) =>
{
    return supabase.from('Votes_letters').upsert(
        {
            participant: participant,
            voteColor: letter,
            flavour: votes.flavour,
            presentation: votes.presentation,
            fidelity: votes.fidelity,
            originality: votes.originality,
        }    )
}

export const getParticipantLetter = (participant: string) =>
{
    return supabase.from('Participant_letters').select('color')
        .eq('name', participant)
        .single()
}

export const getAllVotesLetters = () =>
{
    return supabase.from('Votes_letters').select('*')
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

export const getParticipantVotesLetters = async () =>
{
    const { data, error } = await supabase.from('Votes_letters').select('*')
        .not('voteColor', 'is', null)
        .not('flavour', 'is', null)
        .not('presentation', 'is', null)
        .not('fidelity', 'is', null)
        .not('originality', 'is', null)

    if (error) {
        console.error("Error fetching letter votes:", error)
        return false
    }
    return wrapVotesByParticipant(data || []);
}

export const getVotesByLetterAndCategory = async (letters: Array<string>, category: string) : Promise<any> =>
{
    const { data, error } = await supabase
  .from('Votes_letters')
  .select(`
    voteColor,
    ${category}:${category}.sum()
  `)
  .in('voteColor', letters);

    if (error) {
        console.error("Error fetching letter votes:", error)
        return false
    }
    return data || [];
}

export const getVotesByLetterSummary = async () : Promise<any> =>
{
    const { data, error } = await supabase
        .rpc('get_vote_scores_letters').select('*');

    if (error) {
        console.error("Error fetching letter votes:", error);
        return false;
    }

    return data || [];
}

// --- Sorteo real de letras ---

export const getAssignedLetters = async () =>
{
    const { data, error } = await supabase
        .from('Participant_letters')
        .select('name, color')
        .not('color', 'is', null);

    if (error) {
        console.error("Error fetching assigned letters:", error);
        return [];
    }

    const uniqueLetters = Array.from(new Set((data || []).map(row => row.color as string)));
    return uniqueLetters;
}

export const getLetterAssignments = async () =>
{
    const { data, error } = await supabase
        .from('Participant_letters')
        .select('name, color');

    if (error) {
        console.error("Error fetching letter assignments:", error);
        return [];
    }

    return data || [];
}

export const saveLetterAssignments = (assignments: Record<string, string>) =>
{
    const rows = Object.entries(assignments).map(([name, color]) => ({ name, color }));
    return supabase.from('Participant_letters').upsert(rows, { onConflict: 'name' });
}
