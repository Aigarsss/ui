import type React from "react";
import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import classes from "./CheckBox.module.scss";
import { CheckIcon, XIcon } from "lucide-react";
import clsx from "clsx";

interface CheckBoxProps extends ComponentPropsWithoutRef<"input"> {
	id: string;
	label: string;
	customOnChange?: (isChecked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
	id,
	label,
	customOnChange,
	...props
}) => {
	const [isChecked, setIsChecked] = useState(props.checked);

	const onChangeHandler = () => {
		setIsChecked(!isChecked);

		if (typeof customOnChange !== "undefined") {
			customOnChange(!isChecked);
		}
	};

	return (
		<div className={classes.container}>
			<label htmlFor={id}>
				<span
					className={clsx(classes.checkbox, {
						[classes.checked]: isChecked,
					})}
				>
					{isChecked && (
						<CheckIcon size={10} strokeWidth={3} className="text-white" />
					)}
				</span>

				<input
					{...props}
					id={id}
					type="checkbox"
					checked={isChecked}
					onChange={onChangeHandler}
					className="opacity-0"
				/>
				<span className="text-sm text-text-2 font-light ml-2"> {label}</span>
			</label>
		</div>
	);
};

export default CheckBox;
