import {
	Effect,
	Option,
	Function as EffectFunction,
	Array as EffectArray,
	pipe,
} from "effect";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEmployee } from "@/shared/api";
import { useToast, type Employee, type Employees } from "@/shared/lib";
import { employeesQueryKeys } from "@/shared/model";

export const useEmployeeCreate = () => {
	const queryClient = useQueryClient();

	const { toast } = useToast();

	return useMutation({
		mutationKey: ["employee"],
		mutationFn: (employee: Omit<Employee, "id">) =>
			createEmployee(employee).pipe(Effect.runPromise),
		onSuccess: (newEmployee) => {
			queryClient.setQueriesData<Employees>(
				{ queryKey: employeesQueryKeys.all },
				(prevData) =>
					Option.fromNullable(prevData).pipe(
						Option.match({
							onSome: (prevData) =>
								pipe(prevData, EffectArray.prepend(newEmployee)),
							onNone: EffectFunction.constUndefined,
						}),
					),
			);
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "An error has occurred",
				description: "There was an error while creating a new employee",
			});
		},
	});
};