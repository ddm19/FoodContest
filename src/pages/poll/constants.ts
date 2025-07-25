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
    { name: "Jorge", img: "jorge.png" },
    { name: "Guti", img: "guti.jpeg" },
    { name: "Javilo", img: "javilo.jpeg" },
    { name: "Ana", img: "ana.jpeg" },
    { name: "Manu", img: "manu.jpeg" },
    { name: "Sonia", img: "sonia.jpeg" },
    { name: "Antonio", img: "antonio.jpeg" },
    { name: "Noelia", img: "noelia.png" }
];

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
    { name: 'No sabemos cocinar', members: ['Guti', 'Jorge', 'Moru'] },
    { name: 'No hay Derecho', members: ['Antonio', 'Noelia'] },
];

