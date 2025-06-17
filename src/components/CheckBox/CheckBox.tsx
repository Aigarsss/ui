import type React from "react";
import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import classes from "./CheckBox.module.scss";

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
			<input
				{...props}
				id={id}
				type="checkbox"
				checked={isChecked}
				onChange={onChangeHandler}
			/>
			<label htmlFor={id} className="text-sm text-text-2 font-light ml-2">
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
