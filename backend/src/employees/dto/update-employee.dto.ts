import { PartialType, PickType } from "@nestjs/mapped-types";
import { CreateEmployeeDto } from "./create-employee.dto";

export class UpdateEmployeeDto extends PickType(CreateEmployeeDto, [
	"status",
]) {}
