import { IsEnum, IsNotEmpty, IsUrl, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { EmployeeWorkStatus } from "../enums/employee-work-status.enum";

import { EmployeeNameDto } from "./employee-name.dto";

export class CreateEmployeeDto {
	id: string;

	@ValidateNested()
	@Type(() => EmployeeNameDto)
	name: EmployeeNameDto;

	@IsEnum(EmployeeWorkStatus)
	status: EmployeeWorkStatus;

	@IsUrl()
	avatarLink: string;
}
