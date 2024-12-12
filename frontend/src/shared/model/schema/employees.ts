import { Schema } from "@effect/schema";

import { EmployeeWorkStatus } from "../enums";

const EmployeeNameSchema = Schema.Struct({
	first: Schema.String,
	last: Schema.String,
});

export const EmployeeSchema = Schema.Struct({
	id: Schema.String.pipe(Schema.brand("EmployeeId")),
	name: EmployeeNameSchema,
	status: Schema.Enums(EmployeeWorkStatus),
	avatarLink: Schema.String,
});

export const EmployeesSchema = Schema.Array(EmployeeSchema);
