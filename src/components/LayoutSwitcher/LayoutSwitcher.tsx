import clsx from "clsx";
import { LayoutGrid, List } from "lucide-react";
import Icon from "@/components/Icon";
import {
	useAppliedLayout,
	useProductsStoreActions,
} from "@/stores/productsStore";

const LayoutSwitcher = () => {
	const appliedLayout = useAppliedLayout();
	const { setAppliedLayout } = useProductsStoreActions();

	return (
		<>
			<Icon onClick={() => setAppliedLayout("list")}>
				<List
					size={20}
					className={clsx({
						"text-blue-6": appliedLayout === "list",
						"text-neutral-8": appliedLayout !== "list",
					})}
				/>
			</Icon>
			<Icon onClick={() => setAppliedLayout("grid")}>
				<LayoutGrid
					size={20}
					className={clsx({
						"text-blue-6": appliedLayout === "grid",
						"text-neutral-8": appliedLayout !== "grid",
					})}
				/>
			</Icon>
		</>
	);
};

export default LayoutSwitcher;
