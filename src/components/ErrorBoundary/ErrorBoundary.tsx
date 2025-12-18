// https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary

import type { ErrorInfo } from "react";
import * as React from "react";

class ErrorBoundary extends React.Component {
	// @ts-expect-error
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static getDerivedStateFromError(_err: { error: Error; info: ErrorInfo }) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	componentDidCatch(error: Error, _info: ErrorInfo) {
		// eslint-disable-next-line no-console
		console.error({
			ErrorBoundary: error.message,
		});
	}

	render() {
		// @ts-expect-error Override class based ts error
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <div className="text-crimson400">Something went wrong! ⚠️</div>;
		}

		// @ts-expect-error Override class based ts error
		return this.props.children;
	}
}

export default ErrorBoundary;
