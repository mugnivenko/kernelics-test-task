import { Effect } from "effect";
import { Schema } from "@effect/schema";

import { EmployeeSchema } from "../model";
import type { Employee } from "../lib";

import { patch, post } from "./base";

export const createEmployee = (employee: Omit<Employee, "id">) =>
	Effect.gen(function* () {
		const res = yield* post("employees", { json: employee });

		return yield* Schema.decodeUnknown(EmployeeSchema)(res);
	});

export const changeEmployeeStatus = (
	id: Employee["id"],
	status: Employee["status"],
) =>
	Effect.gen(function* () {
		const res = yield* patch(`employees/${id}`, { json: { status } });

		return yield* Schema.decodeUnknown(EmployeeSchema)(res);
	});
