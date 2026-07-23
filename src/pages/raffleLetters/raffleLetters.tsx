import React, { useEffect, useState } from 'react';
import 'pages/raffle/raffle.scss';
import Loading from 'components/Loading/Loading';
import CustomButton from 'components/customButton/customButton';
import CustomTabs, { TabItem } from 'components/customTabs/customTabs';
import DataTable, { Column } from 'components/dataTable/dataTable';
import { letters, letterTeams, getLetterSpanishColor } from 'pages/poll/constants';
import { Assignments, Team } from 'pages/raffle/raffle';
import { shuffle } from 'utils/array';
import { getLetterAssignments, saveLetterAssignments } from 'supabase/letterActions';

interface TeamResultRow extends Team {
    letter: string;
    colorToken?: string;
}

const participantColumns: Column<Team>[] = [
    { header: 'Equipo', accessor: 'name' },
    { header: 'Miembros', accessor: 'members', render: (row) => row.members.join(' y ') },
];

const resultsColumns: Column<TeamResultRow>[] = [
    { header: 'Equipo', accessor: 'name' },
    { header: 'Letra asignada', accessor: 'letter', dataColorAccessor: 'colorToken' },
];

const RaffleLetters: React.FC = () => {
    const [savedByParticipant, setSavedByParticipant] = useState<Record<string, string>>({});
    const [drawResult, setDrawResult] = useState<Assignments | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const loadSavedAssignments = () => {
        getLetterAssignments().then((rows) => {
            const byParticipant: Record<string, string> = {};
            rows.forEach((row) => {
                if (row.color) byParticipant[row.name] = row.color;
            });
            setSavedByParticipant(byParticipant);
        });
    };

    useEffect(() => {
        loadSavedAssignments();
    }, []);

    const handleDraw = () => {
        setIsDrawing(true);
        setDrawResult(null);
        setErrorMsg(null);

        setTimeout(() => {
            const shuffled = shuffle(letters.map((letter) => letter.name));
            const result: Assignments = {};
            letterTeams.forEach((team, idx) => {
                result[team.name] = shuffled[idx];
            });
            setDrawResult(result);
            setIsDrawing(false);
        }, 5000);
    };

    const handleSave = async () => {
        if (!drawResult) return;
        setIsSaving(true);
        setErrorMsg(null);
        try {
            const perParticipant: Record<string, string> = {};
            letterTeams.forEach((team) => {
                const letter = drawResult[team.name];
                team.members.forEach((member) => {
                    perParticipant[member] = letter;
                });
            });
            await saveLetterAssignments(perParticipant);
            loadSavedAssignments();
            setDrawResult(null);
        } catch {
            setErrorMsg('Error guardando el sorteo.');
        } finally {
            setIsSaving(false);
        }
    };

    const buildTeamResultRows = (letterByTeam: (team: Team) => string | undefined): TeamResultRow[] =>
        letterTeams
            .map((team) => ({ ...team, letter: letterByTeam(team) || '' }))
            .filter((row) => !!row.letter)
            .map((row) => ({ ...row, colorToken: getLetterSpanishColor(row.letter) }));

    const savedResultRows = buildTeamResultRows((team) => savedByParticipant[team.members[0]]);
    const drawResultRows = drawResult ? buildTeamResultRows((team) => drawResult[team.name]) : [];

    const resultTab: TabItem = {
        title: 'Resultado',
        content: (
            <div className="raffle">
                <h2 className="raffle__title">Resultado del Sorteo</h2>
                {savedResultRows.length > 0 ? (
                    <DataTable
                        title="Equipos"
                        columns={resultsColumns}
                        data={savedResultRows}
                        className="raffle__tableContainer"
                    />
                ) : (
                    <p>El sorteo de letras aún no se ha realizado.</p>
                )}
            </div>
        ),
    };

    const drawTab: TabItem = {
        title: 'Sortear',
        content: isDrawing ? (
            <Loading text="Sorteando letras..." />
        ) : (
            <div className="raffle">
                <h2 className="raffle__title">Letras Disponibles</h2>

                <div className="raffle__colors">
                    {letters.map((letter) => (
                        <div key={letter.name} className="raffle__cell" data-color={getLetterSpanishColor(letter.name)}>
                            {letter.name}
                        </div>
                    ))}
                </div>

                <DataTable
                    title="Equipos"
                    columns={participantColumns}
                    data={letterTeams}
                    className="raffle__tableContainer"
                />

                <CustomButton onClick={handleDraw} variant="contained">
                    Sortear
                </CustomButton>

                {errorMsg && <div className="poll__error">{errorMsg}</div>}

                {drawResult && (
                    <div className="raffle__results">
                        <DataTable
                            title="Resultado (sin guardar)"
                            columns={resultsColumns}
                            data={drawResultRows}
                            className="raffle__tableContainer"
                        />
                        <CustomButton onClick={handleSave} disabled={isSaving} variant="outlined">
                            {isSaving ? 'Guardando...' : 'Guardar sorteo'}
                        </CustomButton>
                    </div>
                )}
            </div>
        ),
    };

    return <CustomTabs tabs={[resultTab, drawTab]} />;
};

export default RaffleLetters;
