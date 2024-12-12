import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Option } from "effect";

import { App } from "@/app";

const root = Option.fromNullable(document.getElementById("root"));

Option.match(root, {
	onSome(elem) {
		createRoot(elem).render(
			<StrictMode>
				<App />
			</StrictMode>,
		);
	},
	onNone() {
		console.log("There is no root element");
	},
});
