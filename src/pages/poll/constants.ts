import { SelectableItem } from "./components/gridSelector";

export const colors: Array<SelectableItem> = [
    { name: "Marrón", backgroundColor: "Brown" },
    { name: "Amarillo", backgroundColor: "Yellow" },
    { name: "Blanco", backgroundColor: "White" },
    { name: "Verde", backgroundColor: "Green" },
    { name: "Rojo", backgroundColor: "Red" },
    { name: "Naranja", backgroundColor: "Orange" },

];

export const colorClassMap: Record<string, string> = {
    Amarillo: "poll__title--yellow",
    Naranja: "poll__title--orange",
    Rojo: "poll__title--red",
    Rosa: "poll__title--pink",
    Brown: "poll__title--brown",
    Verde: "poll__title--green",
    Blanco: "poll__title--white",
    Negro: "poll__title--black",
};
export const colorGlowClassMap: Record<string, string> = {
    Amarillo: "poll__categories--glowYellow",
    Naranja: "poll__categories--glowOrange",
    Rojo: "poll__categories--glowRed",
    Rosa: "poll__categories--glowPink",
    Brown: "poll__categories--glowBrown",
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
    { name: "Mery", img: "Mery.png" },
    { name: "Marc", img: "Marc.png" },
    { name: "Dani", img: "Dani.png" },
    { name: "Brisa", img: "Brisa.png" },
    { name: "Marcos", img: "Marcos.png" },
    { name: "Assem", img: "Assem.png" },
    { name: "Moru", img: "Moru.png" },
    { name: "Jorge", img: "Jorge.png" },
    { name: "Guti", img: "Guti.png" },
    { name: "Javilo", img: "Javilo.png" },
    { name: "Ana", img: "Ana.png" },
    { name: "Manu", img: "Manu.png" },
    { name: "Sonia", img: "Sonia.png" },
];
