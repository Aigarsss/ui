import React from "react";

const ReadmePage = () => {
	return (
		<div className="p-4">
			<p className="mb-4">Just a couple of notes form my side.</p>

			<h2 className="font-bold">UI/UX</h2>
			<ul>
				<li>
					I wasn't sure how the search should work, I assumed it should take the
					filtered values into account when showing options.
				</li>
				<li>
					I also remember the filter values when switching between products in
					the product page.
				</li>
				<li>
					Wasnt clear if search should be available only with "starts with" or
					any string. I did "any".
				</li>
				<li>
					Wasnt sure how json details should be show, went for the simplest
					solution.
				</li>
				<li>Very, very basic mobile styling, did not spend time on that.</li>
			</ul>

			<h2 className="font-bold mt-4">Design</h2>
			<ul>
				<li>
					I took the icons from Lucide library, instead of the ones in the
					designs.
				</li>
				<li>
					Fonts/colors/box-shadows might not be pixel perfect, because of figma
					shenanigans.
				</li>
				<li>Added a filter status, so we would know that a filter is active</li>
				<li>Added "showing x of y Devices"</li>
			</ul>

			<h2 className="font-bold mt-4">Technical</h2>
			<ul>
				<li>
					Put everything into context, probably could be handled differently,
					but for this use case, I think its fine. Same with data fetching,
					didnt think it would make sense to use react query or something.
				</li>
				<li>
					I wouldn't say that the setup in index.css is the best (like
					text-text-2 is a pretty bad name for the class), but again, it works
					for this project. In the case of a complete design system, that would
					need to be refactored.
				</li>
				<li>
					I was also not entirely sure about the Product page, what data should
					or should not be shown. So maybe there is something off there.
				</li>
			</ul>
		</div>
	);
};

export default ReadmePage;
