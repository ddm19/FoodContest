import supabase from "./supabase"


export const getVotes = (participant: string) =>
{
    return supabase.from('Votes').select('*')
        .eq('participant', participant)
}