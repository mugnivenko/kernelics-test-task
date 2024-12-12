import type { Schema } from "@effect/schema";

import type { EmployeesSchema } from "../../model";

import type { Employee } from "./employee";

export type Employees = Schema.Schema.Type<typeof EmployeesSchema>;

export type EmployeesSearchAndFilters = {
	status: Employee["status"] | undefined;
	searchName: string;
};
