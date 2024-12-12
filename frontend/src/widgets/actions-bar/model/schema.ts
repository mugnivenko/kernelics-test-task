import { Schema } from "@effect/schema";
import { Effect, Function as EffectFunction } from "effect";

import { EmployeeWorkStatus } from "@/shared/model/enums";

export const CreateUserSchema = Schema.Struct({
	firstName: Schema.NonEmptyString.annotations({
		message: () => "First name must be non-empty",
	}),
	lastName: Schema.NonEmptyString.annotations({
		message: () => "First name must be non-empty",
	}),
	status: Schema.Enums(EmployeeWorkStatus).annotations({
		message: () => "Status must be non-empty",
	}),
	avatarLink: Schema.NonEmptyString.annotations({
		message: () => "Avatar link name must be non-empty",
	}).pipe(
		Schema.filter(
			(link) =>
				Effect.match(
					Effect.try(() => new URL(link)),
					{
						onSuccess: EffectFunction.constTrue,
						onFailure: EffectFunction.constFalse,
					},
				).pipe(Effect.runSync),
			{ message: () => "Avatar link must be a valid URL" },
		),
	),
});
