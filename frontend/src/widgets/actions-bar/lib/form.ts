import type { Schema } from "@effect/schema";

import type { CreateUserSchema } from "../model/schema";

export type CreateUserForm = Schema.Schema.Type<typeof CreateUserSchema>;
