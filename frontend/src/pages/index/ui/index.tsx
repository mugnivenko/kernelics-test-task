import { String as EffectString } from "effect";

import { FormProvider, useForm } from "react-hook-form";

import { AppBar } from "@/widgets/app-bar";
import { ActionsBar } from "@/widgets/actions-bar";
import { EmployeesList } from "@/widgets/employees-list";

import type { EmployeesSearchAndFilters } from "@/shared/lib";

export function Index() {
	const methods = useForm<EmployeesSearchAndFilters>({
		defaultValues: { status: undefined, searchName: EffectString.empty },
	});

	return (
		<div className="flex flex-col md:h-screen">
			<AppBar />
			<div className="flex flex-col items-center p-4 bg-light-gray">
				<FormProvider {...methods}>
					<ActionsBar />
					<EmployeesList />
				</FormProvider>
			</div>
		</div>
	);
}
