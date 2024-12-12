import {
	Injectable,
	NotFoundException,
	type OnModuleInit,
} from "@nestjs/common";

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";

import {
	Effect,
	Array as EffectArray,
	Match,
	Option,
	pipe,
	Predicate,
	String as EffectString,
} from "effect";

import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { SearchEmployeesDto } from "./dto/search-employees.dto";

@Injectable()
export class EmployeesService implements OnModuleInit {
	private data: CreateEmployeeDto[] = [];

	async onModuleInit() {
		const mockData = await readFile(
			resolve(__dirname, "./mock/employees-data.mock.json"),
			{
				encoding: "utf8",
			},
		);

		this.data = JSON.parse(mockData);
	}

	create(createEmployeeDto: CreateEmployeeDto) {
		const newEmployee = { id: randomUUID(), ...createEmployeeDto };

		this.data = pipe(this.data, EffectArray.prepend(newEmployee));

		return newEmployee;
	}

	findAll(searchDto: SearchEmployeesDto) {
		return Match.value(searchDto).pipe(
			Match.when(
				{ status: Match.undefined, searchName: EffectString.isEmpty },
				() => this.data,
			),
			Match.when(
				{
					status: Predicate.isNotUndefined,
					searchName: EffectString.isNonEmpty,
				},
				({ status, searchName }) =>
					pipe(
						this.data,
						EffectArray.filter(
							(employee) =>
								employee.status === status &&
								`${employee.name.first} ${employee.name.last}`.includes(
									searchName,
								),
						),
					),
			),
			Match.when(
				{
					status: Predicate.isNotUndefined,
				},
				({ status }) =>
					pipe(
						this.data,
						EffectArray.filter((employee) => employee.status === status),
					),
			),
			Match.when(
				{
					searchName: EffectString.isNonEmpty,
				},
				({ searchName }) =>
					pipe(
						this.data,
						EffectArray.filter((employee) =>
							`${employee.name.first} ${employee.name.last}`.includes(
								searchName,
							),
						),
					),
			),
			Match.orElse(() => this.data),
		);
	}

	update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
		const employeeIndexOption = pipe(
			this.data,
			EffectArray.findFirstIndex((employee) => employee.id === id),
		);

		return Option.match(employeeIndexOption, {
			onSome: (index) => {
				this.data = pipe(
					this.data,
					EffectArray.modify(index, (employee) => ({
						...employee,
						status: updateEmployeeDto.status,
					})),
				);

				return this.data[index];
			},
			onNone() {
				throw new NotFoundException(
					`We couldn't find a user with that ID. Please check and try again.`,
				);
			},
		});
	}
}
