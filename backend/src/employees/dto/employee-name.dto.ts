import { IsEnum, IsNotEmpty, IsUrl } from "class-validator";

import { EmployeeWorkStatus } from "../enums/employee-work-status.enum";

export class EmployeeNameDto {
	@IsNotEmpty()
	first: string;

	@IsNotEmpty()
	last: string;
}
