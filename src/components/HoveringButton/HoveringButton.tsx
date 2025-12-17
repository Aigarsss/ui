import React, { type ReactNode, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router";

interface HoveringButtonProps {
	to: string;
	children: ReactNode;
	classNames?: string;
}

const HoveringButton = ({ to, children, classNames }: HoveringButtonProps) => {
	return (
		<Link
			to={to}
			className={clsx(
				"flex justify-center items-center p-1 text-[var(--color-text-3)] rounded-[var(--border-radius-small)] shadow-[0_0_1px_rgba(0,0,0,0.06),0_8px_23px_rgba(0,0,0,0.08)] hover:shadow-none",
				classNames,
			)}
		>
			{children}
		</Link>
	);
};

export default HoveringButton;
