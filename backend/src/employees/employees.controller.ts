import {
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Controller,
	Query,
} from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { SearchEmployeesDto } from "./dto/search-employees.dto";

@Controller("employees")
export class EmployeesController {
	constructor(private readonly employeesService: EmployeesService) {}

	@Post()
	create(@Body() createEmployeeDto: CreateEmployeeDto) {
		return this.employeesService.create(createEmployeeDto);
	}

	@Get()
	findAll(@Query() searchDto: SearchEmployeesDto) {
		return this.employeesService.findAll(searchDto);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateEmployeeDto: UpdateEmployeeDto,
	) {
		return this.employeesService.update(id, updateEmployeeDto);
	}
}
