import { lazy, Suspense } from "react";

import { String as EffectString } from "effect";

import { FormProvider, useForm } from "react-hook-form";

import { AppBar } from "@/widgets/app-bar";

import type { EmployeesSearchAndFilters } from "@/shared/lib";

const ActionsBar = lazy(() => import("@/widgets/actions-bar"));
const EmployeesList = lazy(() => import("@/widgets/employees-list"));

export function Index() {
	const methods = useForm<EmployeesSearchAndFilters>({
		defaultValues: { status: undefined, searchName: EffectString.empty },
	});

	return (
		<div className="flex flex-col md:h-screen">
			<AppBar />
			<div className="flex flex-col items-center p-4 bg-light-gray md:h-screen">
				<FormProvider {...methods}>
					<Suspense fallback={<>Please wait...</>}>
						<ActionsBar />
						<EmployeesList />
					</Suspense>
				</FormProvider>
			</div>
		</div>
	);
}
