import { Effect, Option, Array as EffectArray, pipe } from "effect";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeEmployeeStatus } from "@/shared/api";
import {
	type Employees,
	useToast,
	type Employee,
	cannotIncludeEmployeeInQuery,
} from "@/shared/lib";
import { employeeKeys, employeesQueryKeys } from "@/shared/model";

export const useEmployeeStatus = (id: Employee["id"]) => {
	const queryClient = useQueryClient();

	const { toast } = useToast();

	return useMutation({
		mutationKey: employeeKeys.employeeStatus,
		mutationFn: (status: Employee["status"]) =>
			changeEmployeeStatus(id, status).pipe(Effect.runPromise),
		onSuccess(updatedEmployee) {
			const queries = queryClient.getQueriesData<Employees>({
				queryKey: employeesQueryKeys.all,
			});

			pipe(
				queries,
				EffectArray.map(([keys, prevData]) => {
					return pipe(
						prevData,
						Option.fromNullable,
						Option.andThen((prevData) =>
							pipe(
								prevData,
								EffectArray.findFirstIndex(
									(employee) => employee.id === updatedEmployee.id,
								),
								Option.andThen((index) => {
									if (cannotIncludeEmployeeInQuery(updatedEmployee, keys)) {
										queryClient.setQueryData<Employees>(keys, () =>
											pipe(prevData, EffectArray.remove(index)),
										);
										return;
									}
									queryClient.setQueryData<Employees>(keys, () =>
										pipe(
											prevData,
											EffectArray.modify(index, () => updatedEmployee),
										),
									);
								}),
							),
						),
					);
				}),
			);
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "An error has occurred",
				description: "There was an error while updating employee's status",
			});
		},
	});
};
