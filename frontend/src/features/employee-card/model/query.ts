import {
	Effect,
	Option,
	Array as EffectArray,
	Function as EffectFunction,
	pipe,
} from "effect";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeEmployeeStatus } from "@/shared/api";
import { type Employees, useToast, type Employee } from "@/shared/lib";
import { employeeKeys, employeesQueryKeys } from "@/shared/model";

export const useEmployeeStatus = (id: Employee["id"]) => {
	const queryClient = useQueryClient();

	const { toast } = useToast();

	return useMutation({
		mutationKey: employeeKeys.employeeStatus,
		mutationFn: (status: Employee["status"]) =>
			changeEmployeeStatus(id, status).pipe(Effect.runPromise),
		onSuccess(updatedEmployee) {
			queryClient.setQueriesData<Employees>(
				{
					queryKey: employeesQueryKeys.all,
				},
				(prevData) =>
					Option.fromNullable(prevData).pipe(
						Option.match({
							onSome: (prevData) =>
								pipe(
									prevData,
									EffectArray.findFirstIndex(
										(employee) => employee.id === updatedEmployee.id,
									),
									Option.andThen((index) =>
										pipe(
											prevData,
											EffectArray.modify(index, () => updatedEmployee),
										),
									),
									Option.getOrElse(() => prevData),
								),
							onNone: EffectFunction.constUndefined,
						}),
					),
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
