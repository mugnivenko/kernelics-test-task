import { Match, Array as EffectArray } from "effect";

import { EmployeeCard, EmployeeCardSkeleton } from "@/features/employee-card";

import { Button } from "@/shared/ui";

import { useWatch } from "react-hook-form";

import type { EmployeesSearchAndFilters } from "@/shared/lib";

import { useEmployees } from "../model";

export function EmployeesList() {
	const searchAndFilters = useWatch() as EmployeesSearchAndFilters;

	const { data, status, refetch } = useEmployees(searchAndFilters);

	const handleTryAgain = () => {
		refetch();
	};

	return (
		<div className="p-8 pt-24 w-4/5 flex flex-wrap justify-center gap-16">
			{Match.value(status).pipe(
				Match.when("pending", () =>
					EffectArray.makeBy(6, (idx) => <EmployeeCardSkeleton key={idx} />),
				),
				Match.when("success", () =>
					Match.value(data).pipe(
						Match.when(Match.undefined, () => "No data found"),
						Match.when(EffectArray.isEmptyReadonlyArray, () => (
							<p className="text-nowrap">
								No user was found by current filters
							</p>
						)),
						Match.orElse((data) =>
							data.map(({ id, avatarLink, name, status }) => (
								<EmployeeCard
									key={id}
									id={id}
									avatarLink={avatarLink}
									name={`${name.first} ${name.last}`}
									status={status}
								/>
							)),
						),
					),
				),
				Match.when("error", () => (
					<div className="flex flex-col items-center gap-2">
						<p className="text-nowrap">An error occurred while fetching</p>
						<Button
							className="w-fit"
							variant="outline"
							onClick={handleTryAgain}
						>
							Try again
						</Button>
					</div>
				)),
				Match.orElse(() => "Something went wrong"),
			)}
		</div>
	);
}
