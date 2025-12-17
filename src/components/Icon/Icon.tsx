import clsx from "clsx";
import type { ReactNode } from "react";
import classes from "./Icon.module.scss";

interface IconProps {
	onClick: () => void;
	className?: string;
	children: ReactNode;
}

const Icon = ({ onClick, className, children }: IconProps) => {
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
