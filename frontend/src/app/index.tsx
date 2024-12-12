import { pipe } from "effect";

import { Index } from "@/pages/index";

import { withQuery } from "./providers/with-query";
import { withToaster } from "./providers/with-toaster";

import "./index.css";

export function App() {
	return pipe(<Index />, withQuery, withToaster);
}
