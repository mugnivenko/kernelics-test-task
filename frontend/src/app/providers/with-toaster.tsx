import { Toaster } from "@/shared/ui/toaster";

export const withToaster = (node: React.ReactNode) => (
	<>
		{node}
		<Toaster />
	</>
);
