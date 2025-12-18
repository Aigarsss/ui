import { useNavigate } from "react-router";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { Device } from "@/types/types";
import { getImageUrl } from "@/utils/getImageUrl";
import classes from "./ProductList.module.scss";

const ProductList = ({ filteredDevices }: { filteredDevices: Device[] }) => {
	const navigate = useNavigate();
	const { visibleItemsCount } = useInfiniteScroll({ filteredDevices });

	return (
		<table className={classes.table}>
			<thead>
				<tr>
					<th />
					<th className="text-sm text-text-1 font-medium">Product line</th>
					<th className="text-sm text-text-1 font-medium">Name</th>
				</tr>
			</thead>

			<tbody>
				{filteredDevices?.slice(0, visibleItemsCount).map((device) => {
					return (
						<tr
							key={device.id}
							tabIndex={0}
							onClick={() => navigate(`/${device.id}`)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									navigate(`/${device.id}`);
								}
							}}
						>
							<td>
								<div className="flex justify-center items-center">
									<img
										src={getImageUrl(device.id, device.images.default)}
										width={20}
										height={20}
										alt=""
									/>
								</div>
							</td>
							<td className="text-sm text-text-2">{device.line.name}</td>
							<td className="text-sm text-text-3">{device.product.name}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default ProductList;
