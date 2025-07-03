// Raffle.tsx
import React, { useEffect, useState } from 'react';
import './raffle.scss';
import Loading from 'components/Loading/Loading';
import CustomButton from 'components/customButton/customButton';

interface Team {
    name: string;
    members: string[];
}

type Assignments = Record<string, string>;

const teams: Team[] = [
    { name: 'Equipo A', members: ['Alice', 'Bob'] },
    { name: 'Equipo B', members: ['Charlie', 'David'] },
    { name: 'Equipo C', members: ['Eve', 'Frank'] },
    { name: 'Equipo D', members: ['Grace', 'Hank'] },
    { name: 'Equipo E', members: ['Ivy', 'Jack'] },
    { name: 'Equipo F', members: ['Kate', 'Leo'] },
    { name: 'Equipo G', members: ['Mia', 'Nina'] },
    { name: 'Equipo H', members: ['Olivia', 'Peter'] },

];

const colors = ['Amarillo', 'Naranja', 'Rojo', 'Rosa', 'Marrón', 'Verde', 'Blanco', 'Negro'];

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


    return (
        !isLoading ? <Loading text='Sorteando colores...' />
            : (
                <div className="raffle">
                    <div className='raffle__tableContainer'>
                        <h2 className="raffle__title">Participantes</h2>
                        <table className="raffle__table">
                            <thead className="raffle__thead">
                                <tr className="raffle__row">
                                    <th className="raffle__cell raffle__cell--header">Equipo</th>
                                    <th className="raffle__cell raffle__cell--header">Miembros</th>
                                </tr>
                            </thead>
                            <tbody className="raffle__tbody">
                                {teams.map((team) => (
                                    <tr key={team.name} className="raffle__row">
                                        <td className="raffle__cell">{team.name}</td>
                                        <td className="raffle__cell">{team.members.join(' y ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <CustomButton className="raffle__button" onClick={() => handleRaffle()}>Hacer sorteo</CustomButton>
                    <div className='raffle__tableContainer'>

                        {Object.keys(assignments).length > 0 && (
                            <div className="raffle__results">
                                <h2 className="raffle__title">Resultados</h2>
                                <table className="raffle__table">
                                    <thead className="raffle__thead">
                                        <tr className="raffle__row">
                                            <th className="raffle__cell raffle__cell--header">Equipo</th>
                                            <th className="raffle__cell raffle__cell--header">Color asignado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="raffle__tbody">
                                        {teams.map((team) => (
                                            <tr key={team.name} className="raffle__row">
                                                <td className="raffle__cell">{team.name}</td>
                                                <td className="raffle__cell" data-color={assignments[team.name]}>{assignments[team.name]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )

    );
};


export default Raffle;
