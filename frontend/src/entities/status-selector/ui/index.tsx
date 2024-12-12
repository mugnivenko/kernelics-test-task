import type { SelectProps } from "@radix-ui/react-select";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Circle,
} from "@/shared/ui";
import type { EmployeeWorkStatus } from "@/shared/model/enums";

import { matchDisplayingStatus, statuses } from "../model";

export function StatusSelector({
	value,
	disabled,
	onValueChange,
}: { value: EmployeeWorkStatus } & Pick<
	SelectProps,
	"onValueChange" | "disabled"
>) {
	return (
		<Select value={value} onValueChange={onValueChange} disabled={disabled}>
			<SelectTrigger className="w-[180px] rounded-none border-b border-b-select-border p-0 h-6">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{statuses.map(({ status, color }) => (
					<SelectItem key={status} value={status}>
						<div className="flex items-center gap-1">
							<Circle stroke={color} />
							{matchDisplayingStatus(status)}
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
