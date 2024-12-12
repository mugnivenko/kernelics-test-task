import { StatusSelector } from "@/entities/status-selector";

import type { Employee } from "@/shared/lib";

import { useEmployeeStatus } from "../model/query";

import { CardSkeleton } from "./components/skeleton";
import clsx from "clsx";
import { Loader } from "lucide-react";
import { memo } from "react";

export const EmployeeCard = memo(function EmployeeCard({
	id,
	name,
	avatarLink,
	status,
}: Omit<Employee, "name"> & { name: string }) {
	const { mutateAsync, isPending } = useEmployeeStatus(id);

	const handleValueChange = (status: Employee["status"]) => {
		mutateAsync(status);
	};

	return (
		<div
			className={clsx(
				"flex flex-col md:flex-row bg-white w-fit min-w-fit px-6 py-8 rounded-md shadow-xl hover:shadow-shadow gap-8 relative",
				{
					"opacity-60": isPending,
				},
			)}
		>
			<img
				src={avatarLink}
				className="rounded-full md:w-[200px] md:h-[200px] w-[100px] h-[100px]"
				alt="a person avatar"
			/>
			<div className="flex flex-col justify-end gap-1">
				<p className="font-medium">{name}</p>
				<StatusSelector
					value={status}
					onValueChange={handleValueChange}
					disabled={isPending}
				/>
			</div>
			{isPending && (
				<Loader className="animate-spin absolute top-1/2 left-1/2" />
			)}
		</div>
	);
});

export const EmployeeCardSkeleton = CardSkeleton;
