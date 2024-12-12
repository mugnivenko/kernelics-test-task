import { FormProvider, useFormContext } from "react-hook-form";

import { Search } from "lucide-react";

import { Button, Input } from "@/shared/ui";
import type { EmployeesSearchAndFilters } from "@/shared/lib";

import { StatusSelect } from "./components/status-select";
import { CreateUserDialog } from "./components/create-user-dialog";

export function ActionsBar() {
	const methods = useFormContext<EmployeesSearchAndFilters>();

	const handleSerchAndFiltersClear = async () => {
		methods.reset({ status: undefined, searchName: "" });
	};

	return (
		<div className="flex flex-col md:flex-row justify-center w-full gap-2">
			<CreateUserDialog />
			<FormProvider {...methods}>
				<div className="flex flex-col md:flex-row items-center bg-white w-full md:w-3/5 px-2 md:px-4 gap-2 md:gap-4">
					<div className="flex items-center justify-between w-full pt-2 md:pt-0">
						<Search className="stroke-icon-secondary mr-2" />
						<Input
							className="w-full"
							placeholder="Type to search"
							{...methods.register("searchName")}
						/>
					</div>
					<div className="h-1/2 w-full md:w-0 border-t-1 border-t-divider border-l-1 border-divider border-l-divider border-solid" />
					<div className="flex items-start justify-between pb-2 md:pb-0 w-full md:w-fit">
						<StatusSelect name="status" placeholder="Filter by status" />
						{methods.formState.isDirty && (
							<Button variant="outline" onClick={handleSerchAndFiltersClear}>
								Clear
							</Button>
						)}
					</div>
				</div>
			</FormProvider>
		</div>
	);
}
