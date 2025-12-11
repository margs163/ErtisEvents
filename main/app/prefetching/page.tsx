import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getQueryClient from "@/components/core/GetQueryClient";

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: async () => "data",
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <h2 className="font-mont text-3xl text-gray-800 font-semibold mb-8">
          Prefetching in a Server Component with TanStack Query
        </h2>
      </div>
    </HydrationBoundary>
  );
}
