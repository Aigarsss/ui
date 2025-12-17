interface ProductTextLineProps {
	text1: string | undefined;
	text2: string | number | undefined;
}

const ProductTextLine = ({ text1, text2 }: ProductTextLineProps) => {
	return (
		<div className="flex justify-between py-2">
			<span className="text-text-1 text-sm">{text1}</span>
			<span className="text-text-3 text-sm max-w-[100px] text-end">
				{text2}
			</span>
		</div>
	);
};

export default ProductTextLine;
