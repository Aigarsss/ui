const ReadmePage = () => {
	return (
		<div className="p-4">
			<h2 className="font-bold">UI/UX</h2>
			<ul className="list-disc ml-4">
				<li>
					Assumed it should take the filtered values into account when showing
					options.
				</li>
				<li>
					Filter values are remembered when switching between products in the
					product page.
				</li>
				<li>Very basic mobile styling, did not spend time on that.</li>
			</ul>

			<h2 className="font-bold mt-4">Design</h2>
			<ul className="list-disc ml-4">
				<li>
					I took the icons from Lucide library, instead of the ones in the
					designs.
				</li>
				<li>Fonts/colors/box-shadows might not be pixel perfect.</li>
				<li>Added a filter status, so we would know that a filter is active</li>
				<li>Added "showing x of y Devices"</li>
			</ul>

			<h2 className="font-bold mt-4">Technical</h2>
			<ul className="list-disc ml-4">
				<li>
					I wouldn't say that the setup in index.css is the best (like
					text-text-2 is a pretty bad name for the class), but it works for this
					mini-project. In the case of a complete design system, that would need
					to be refactored.
				</li>
				<li>
					Added "infinite" scroll to list views, switching seemed snappier.
				</li>
			</ul>
		</div>
	);
};

export default ReadmePage;
