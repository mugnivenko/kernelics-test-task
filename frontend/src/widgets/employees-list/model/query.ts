import { Effect } from "effect";

import { useQuery } from "@tanstack/react-query";

import { getEmployees } from "@/shared/api";
import { employeesQueryKeys } from "@/shared/model";
import type { EmployeesSearchAndFilters } from "@/shared/lib";

export const useEmployees = (data?: EmployeesSearchAndFilters) =>
	useQuery({
		queryKey: employeesQueryKeys.searchAndFilters(data),
		queryFn: () => getEmployees(data).pipe(Effect.runPromise),
	});
