import { cn } from "../../lib";
import { useController } from "react-hook-form";

function Input({
	className,
	type,
	name,
	...props
}: React.ComponentProps<"input"> & { name: string }) {
	const { field, fieldState } = useController({ name });

	return (
		<div className="flex flex-col gap-1 col-start-2 col-end-5 w-full">
			<input
				type={type}
				className={cn(
					"flex h-10 w-full rounded-md bg-white px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					className,
				)}
				{...props}
				{...field}
			/>
			{fieldState.invalid && (
				<p className="text-error text-sm">{fieldState.error?.message}</p>
			)}
		</div>
	);
}

export { Input };
