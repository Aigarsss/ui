import type React from "react";
import type { ReactNode } from "react";
import classes from "./Icon.module.scss";
import clsx from "clsx";

interface IconProps {
	onClick: () => void;
	className?: string;
	children: ReactNode;
}

const Icon: React.FC<IconProps> = ({ onClick, className, children }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={clsx(classes.container, className)}
		>
			{children}
		</button>
	);
};

export default Icon;
