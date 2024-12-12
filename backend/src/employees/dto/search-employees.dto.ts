import { IsEnum, IsNotEmpty, IsString, IsOptional } from "class-validator";

import { EmployeeWorkStatus } from "../enums/employee-work-status.enum";

export class SearchEmployeesDto {
	@IsOptional()
	@IsEnum(EmployeeWorkStatus)
	status?: EmployeeWorkStatus;

	@IsOptional()
	@IsString()
	searchName?: string;
}
