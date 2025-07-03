import { Button } from "@mui/material";
import "./customButton.scss"

interface CustomButtonProps {
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    variant?: "text" | "outlined" | "contained";
    color?: "primary" | "secondary" | "inherit";
    children: React.ReactNode;

}

const CustomButton = (props: CustomButtonProps) => {
    const { onClick, disabled = false, className = '', variant = 'contained', color = 'primary', children } = props;

    return (

        <Button onClick={onClick} disabled={disabled} className={`customButton ${className}`} variant={variant} color={color}>
            {children}
        </Button>

    );
};

export default CustomButton;
