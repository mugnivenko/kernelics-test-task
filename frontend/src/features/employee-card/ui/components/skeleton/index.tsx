import { Skeleton } from "@/shared/ui";

export function CardSkeleton() {
	return (
		<div className="flex flex-col md:flex-row md:items-center bg-white space-y-4 md:space-x-4 px-6 py-8">
			<Skeleton className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded-full" />
			<div className="flex flex-col justify-end space-y-2 md:h-full">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[250px]" />
			</div>
		</div>
	);
}
