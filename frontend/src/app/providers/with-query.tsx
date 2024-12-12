import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const withQuery = (node: React.ReactNode) => (
	<QueryClientProvider client={queryClient}>{node}</QueryClientProvider>
);
