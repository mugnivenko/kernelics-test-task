import type { Employee, EmployeesSearchAndFilters } from "../../lib";

export const employeesQueryKeys = {
	all: ["employees"],
	searchAndFilters: (data?: EmployeesSearchAndFilters) => [
		"employees",
		data?.status,
		data?.searchName,
	],
};

export const employeeKeys = {
	employee: ["employee"],
	employeeStatus: ["employee", "status"],
};
