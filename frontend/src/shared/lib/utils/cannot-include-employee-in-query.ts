import { String as EffectString, Predicate } from "effect";

import type { QueryKey } from "@tanstack/react-query";

import type { employeesQueryKeys } from "@/shared/model";

import type { Employee } from "../types";

export const cannotIncludeEmployeeInQuery = (
	employee: Employee,
	keys: QueryKey,
) => {
	const [, status, searchName] = keys as ReturnType<
		typeof employeesQueryKeys.searchAndFilters
	>;

	const doesStatusFilterNotMatch =
		Predicate.isNotUndefined(status) && employee.status !== status;

	const doesSearchNameNotMatch =
		Predicate.isNotUndefined(searchName) &&
		EffectString.isNonEmpty(searchName) &&
		!`${employee.name.first} ${employee.name.last}`
			.toLowerCase()
			.includes(searchName.toLowerCase());

	return doesStatusFilterNotMatch || doesSearchNameNotMatch;
};
