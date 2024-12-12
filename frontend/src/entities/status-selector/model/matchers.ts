import { Match } from "effect";

import { EmployeeWorkStatus } from "@/shared/model/enums";

export const matchDisplayingStatus = Match.type<EmployeeWorkStatus>().pipe(
	Match.when(EmployeeWorkStatus.Working, () => "Working"),
	Match.when(EmployeeWorkStatus.OnVacation, () => "On Vacation"),
	Match.when(EmployeeWorkStatus.BusinessTrip, () => "Business Trip"),
	Match.when(EmployeeWorkStatus.LunchTime, () => "Lunch Time"),
	Match.orElse(() => "Something went wrong"),
);
