import { useState } from "react";

import { String as EffectString } from "effect";

import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { effectTsResolver } from "@hookform/resolvers/effect-ts";

import { Loader2, Plus } from "lucide-react";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Label,
} from "@/shared/ui";

import { CreateUserSchema, useEmployeeCreate } from "../../../model";
import type { CreateUserForm } from "../../../lib";

import { StatusSelect } from "../status-select";

export function CreateUserDialog() {
	const { mutateAsync, isPending } = useEmployeeCreate();

	const [open, setOpen] = useState(false);

	const methods = useForm<CreateUserForm>({
		resolver: effectTsResolver(CreateUserSchema),
		defaultValues: {
			firstName: EffectString.empty,
			lastName: EffectString.empty,
			avatarLink: EffectString.empty,
		},
	});

	const onSubmit: SubmitHandler<CreateUserForm> = async (data) => {
		await mutateAsync({
			avatarLink: data.avatarLink,
			status: data.status,
			name: { first: data.firstName, last: data.lastName },
		});
		methods.reset();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="px-8 py-6 gap-2 rounded-md shadow">
					<p className="text-white font-bold text-lg">Create</p>
					<Plus className="stroke-white" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create user</DialogTitle>
					<DialogDescription>
						Create a new user here. Click create when you're done.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<FormProvider {...methods}>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									First Name
								</Label>
								<Input
									placeholder="Enter user's first name"
									className="col-span-3 border border-input"
									name="firstName"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="username" className="text-right">
									Last Name
								</Label>
								<Input
									placeholder="Enter user's last name"
									className="col-span-3 border border-input"
									name="lastName"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="username" className="text-right">
									Status
								</Label>
								<div className="flex flex-col gap-1 col-start-2 col-end-5">
									<StatusSelect
										name="status"
										className="border border-input w-fit min-w-fit"
										placeholder="Select user's status"
									/>
									<p className="text-error text-sm">
										{methods.formState.errors.status?.message}
									</p>
								</div>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Avatar link
								</Label>
								<Input
									placeholder="Enter user's avatar link"
									className="col-span-3 border border-input"
									name="avatarLink"
								/>
							</div>
						</div>
					</FormProvider>
					<DialogFooter>
						<Button className="text-white" type="submit" disabled={isPending}>
							{isPending && <Loader2 className="animate-spin" />}
							Create
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
