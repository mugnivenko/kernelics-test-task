import type { Schema } from "@effect/schema";

import type { EmployeeSchema } from "../../model";

export type Employee = Schema.Schema.Type<typeof EmployeeSchema>;
