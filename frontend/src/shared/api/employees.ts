import { Effect, Predicate, Record } from "effect";
import { Schema } from "@effect/schema";

import { EmployeesSchema } from "../model";
import type { EmployeesSearchAndFilters } from "../lib";

import { get } from "./base";

export const getEmployees = (data?: EmployeesSearchAndFilters) =>
	Effect.gen(function* () {
		const searchParams = Predicate.isUndefined(data)
			? undefined
			: Record.filter(data, (val) => Predicate.isNotUndefined(val));

		const res = yield* get("employees", { searchParams });

		return yield* Schema.decodeUnknown(EmployeesSchema)(res);
	});
