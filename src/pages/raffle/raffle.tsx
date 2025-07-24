import React, { useState } from 'react';
import './raffle.scss';
import Loading from 'components/Loading/Loading';
import { fixedAssignments, teams } from 'pages/poll/constants';
import DataTable, { Column } from 'components/dataTable/dataTable';

export interface Team {
    name: string;
    members: string[];
}

// Interfaz para los datos de la tabla de resultados
interface ResultData extends Team {
    color: string;
}

export type Assignments = Record<string, string>;

const colors = ['Amarillo', 'Naranja', 'Rojo', 'Marrón', 'Verde', 'Blanco', 'Rosa'];

// Columnas para la tabla de participantes
const participantColumns: Column<Team>[] = [
    {
        header: 'Equipo',
        accessor: 'name',
    },
    {
        header: 'Miembros',
        accessor: 'members',
        render: (row) => row.members.join(' y '), // Usamos render para formato personalizado
    },
];

// Columnas para la tabla de resultados
const resultsColumns: Column<ResultData>[] = [
    {
        header: 'Equipo',
        accessor: 'name',
    },
    {
        header: 'Color asignado',
        accessor: 'color',
        dataColorAccessor: 'color', // Indicamos qué campo usar para el data-color
    },
];

const shuffle = (array: string[]): string[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const Raffle: React.FC = () => {
    const [assignments, setAssignments] = useState<Assignments>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleRaffle = () => {
        setIsLoading(true);
        setAssignments({});

        setTimeout(() => {
            const shuffled = shuffle(colors);
            const result: Assignments = {};
            teams.forEach((team, idx) => {
                result[team.name] = shuffled[idx];
            });
            setAssignments(result);
            setIsLoading(false);
        }, 5000);
    };

    // Preparamos los datos para la tabla de resultados
    const resultsData: ResultData[] = teams.map((team) => ({
        ...team,
        color: fixedAssignments[team.name] || '', // Añadimos el color al objeto
    }));

    return (
        isLoading ? <Loading text='Sorteando colores...' />
            : (
                <div className="raffle">
                    <h2 className="raffle__title">Colores Disponibles</h2>

                    <div className='raffle__colors'>
                        {/* Esto se mantiene igual ya que no es una tabla */}
                        {colors.map((color) => (
                            <div key={color} className="raffle__cell" data-color={color}>
                                {color}
                            </div>
                        ))}
                    </div>

                    {/* Usamos el nuevo componente DataTable */}
                    <DataTable
                        title="Participantes"
                        columns={participantColumns}
                        data={teams}
                        className="raffle__tableContainer"
                    />

                    {/* <CustomButton className="raffle__button" onClick={() => handleRaffle()}>Hacer sorteo</CustomButton> */}

                    {Object.keys(fixedAssignments).length > 0 && (
                        <div className="raffle__results">
                            {/* Usamos el nuevo componente DataTable también para los resultados */}
                            <DataTable
                                title="Resultados"
                                columns={resultsColumns}
                                data={resultsData}
                                className="raffle__tableContainer"
                            />
                        </div>
                    )}
                </div>
            )
    );
};

export default Raffle;
