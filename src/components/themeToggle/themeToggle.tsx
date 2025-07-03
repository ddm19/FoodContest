import React, { useLayoutEffect, useState, useEffect } from "react";
import CustomButton from "components/customButton/customButton";

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const stored = localStorage.getItem("theme") as "light" | "dark" | null;
        if (stored) return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useLayoutEffect(() => {
        document.documentElement.classList.toggle("dark-mode", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? "dark" : "light");
            }
        };
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const toggle = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    return (
        <CustomButton variant="text" color="primary" onClick={toggle} >
            {theme === "dark" ? '🌞' : '🌚'}
        </CustomButton>
    );
};

export default ThemeToggle;
