import { useState } from "react";

import type {
	SelectProps,
	SelectTriggerProps,
	SelectValueProps,
} from "@radix-ui/react-select";

import { statuses, matchDisplayingStatus } from "@/entities/status-selector";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui";
import clsx from "clsx";
import { Predicate } from "effect";
import { useController } from "react-hook-form";

export function StatusSelect({
	name,
	placeholder,
	className,
}: { name: string } & Pick<SelectValueProps, "placeholder"> &
	Pick<SelectTriggerProps, "className">) {
	const { field } = useController({ name });
	return (
		<Select
			key={field.value}
			value={field.value}
			onValueChange={field.onChange}
		>
			<SelectTrigger
				className={clsx(
					"w-[180px]",
					{
						"[&>span]:text-select-placeholder": Predicate.isUndefined(
							field.value,
						),
					},
					className,
				)}
				onBlur={field.onBlur}
			>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{statuses.map(({ status }) => (
					<SelectItem key={status} value={status}>
						{matchDisplayingStatus(status)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
