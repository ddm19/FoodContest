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
