import { Assignments, Team } from "pages/raffle/raffle";
import { SelectableItem } from "./components/gridSelector";

export const colors: Array<SelectableItem> = [
    { name: "Marrón", backgroundColor: "Brown" },
    { name: "Amarillo", backgroundColor: "Yellow" },
    { name: "Blanco", backgroundColor: "White" },
    { name: "Verde", backgroundColor: "Green" },
    { name: "Rojo", backgroundColor: "Red" },
    { name: "Naranja", backgroundColor: "Orange" },
    { name: "Rosa", backgroundColor: "Pink" },

];

export const colorClassMap: Record<string, string> = {
    Amarillo: "poll__title--yellow",
    Naranja: "poll__title--orange",
    Rojo: "poll__title--red",
    Rosa: "poll__title--pink",
    Marrón: "poll__title--brown",
    Verde: "poll__title--green",
    Blanco: "poll__title--white",
    Negro: "poll__title--black",
};
export const colorGlowClassMap: Record<string, string> = {
    Amarillo: "poll__categories--glowYellow",
    Naranja: "poll__categories--glowOrange",
    Rojo: "poll__categories--glowRed",
    Rosa: "poll__categories--glowPink",
    Marrón: "poll__categories--glowBrown",
    Verde: "poll__categories--glowGreen",
    Blanco: "poll__categories--glowWhite",
    Negro: "poll__categories--glowBlack",
};

export const voteCategories = [
    "Sabor",
    "Presentación",
    "Fidelidad",
    "Originalidad",
];

export const participants = [
    { name: "Mery", img: "mery.jpg" },
    { name: "Marc", img: "marc.jpg" },
    { name: "Dani", img: "dani.jpeg" },
    { name: "Brisa", img: "brisa.jpeg" },
    { name: "Marcos", img: "marcos.jpeg" },
    { name: "Assem", img: "assem.jpeg" },
    { name: "Moru", img: "moru.jpeg" },
    { name: "Guti", img: "guti.jpeg" },
    { name: "Javilo", img: "javilo.jpeg" },
    { name: "Ana", img: "ana.jpeg" },
    { name: "Manu", img: "manu.jpeg" },
    { name: "Sonia", img: "sonia.jpeg" },
    { name: "Antonio", img: "antonio.jpeg" },
    { name: "Noelia", img: "noelia.png" }
];

// --- Concurso de Letras 2026 ---

export const letterParticipants = [
    { name: "Dani", img: "dani.jpeg" },
    { name: "Marcos", img: "marcos.jpeg" },
    { name: "Assem", img: "assem.jpeg" },
    { name: "Paula", img: "paula.png" },
    { name: "Marc", img: "marc.jpg" },
    { name: "Mery", img: "mery.jpeg" },
    { name: "Brisa", img: "brisa.jpeg" },
];

export const letterTeams: Team[] = [
    { name: 'Brisa y Dani', members: ['Brisa', 'Dani'] },
    { name: 'Marc y Mery', members: ['Marc', 'Mery'] },
    { name: 'Marcos y Assem', members: ['Marcos', 'Assem'] },
    { name: 'Paula', members: ['Paula'] },

];


export const spanishPaletteCycle = ["Marrón", "Amarillo", "Blanco", "Verde", "Rojo", "Naranja", "Rosa"];
export const englishPaletteCycle = ["Brown", "Yellow", "White", "Green", "Red", "Orange", "Pink"];

export const getLetterPaletteIndex = (letter: string): number =>
    (letter.toUpperCase().charCodeAt(0) - 65) % spanishPaletteCycle.length;

export const getLetterSpanishColor = (letter: string): string =>
    spanishPaletteCycle[getLetterPaletteIndex(letter)];

export const getLetterEnglishColor = (letter: string): string =>
    englishPaletteCycle[getLetterPaletteIndex(letter)];

export const letters: Array<SelectableItem> = Array.from({ length: 26 }, (_, i) => {
    const letter = String.fromCharCode(65 + i);
    return { name: letter, backgroundColor: getLetterEnglishColor(letter) };
});

export const fixedAssignments: Assignments = {
    ['Sasori']: 'Marrón',
    ['Fuera moros']: 'Amarillo',
    ['Tortugos']: 'Blanco',
    ['Intolerantes']: 'Verde',
    ['Choripanes Racistas']: 'Rojo',
    ['No sabemos cocinar']: 'Naranja',
    ['No hay Derecho']: 'Rosa',
};
export const teams: Team[] = [
    { name: 'Sasori', members: ['Marcos', 'Assem'] },
    { name: 'Fuera moros', members: ['Manu', 'Sonia'] },
    { name: 'Tortugos', members: ['Ani', 'Javilo'] },
    { name: 'Intolerantes', members: ['Marc', 'Mery'] },
    { name: 'Choripanes Racistas', members: ['Dani', 'Brisa'] },
    { name: 'No sabemos cocinar', members: ['Guti', 'Moru'] },
    { name: 'No hay Derecho', members: ['Antonio', 'Noelia'] },
];

