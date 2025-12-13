"use client";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Header from "./Header";
import Recommendations from "./Recommendations";
import { authClient } from "@/lib/auth-client";
import { useEffect, useTransition } from "react";
import { useUserStore } from "@/lib/userStore";
import { useEventsStore } from "@/lib/eventStore";
import { getRecommendations } from "@/lib/actions";
import { toast } from "sonner";
import LoadingSmallUI from "../LoadingSmallUI";
import LoadingUI from "../LoadingUI";

export default function Dashboard() {
  const setUserData = useUserStore((state) => state.setUserData);
  const { data: session, error, refetch } = authClient.useSession();
  const setRecommendedEvents = useEventsStore(
    (state) => state.setRecommendations
  );

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (session?.user) {
      setUserData({ ...JSON.parse(JSON.stringify(session.user)), image: "" });

      startTransition(async () => {
        const data = await getRecommendations({
          ...session.user,
          image: undefined,
        });

        if (!Array.isArray(data) && data.error) {
          toast.error("Could not make recommendations", {
            description: "Please Try Again later",
          });
          return;
        }

        if (Array.isArray(data)) {
          setRecommendedEvents(data);
          console.log(data);
          toast.success("Successfuly Generated Recommendations", {
            description: "View the most suitable events for you",
          });
          return;
        }
      });
    }
  }, [session?.user.id]);
  return (
    <div className="min-h-screen bg-orn font-mont space-y-10 lg:space-y-14">
      <Navbar />
      <Header />
      {isPending ? <LoadingUI mode="dark" /> : <Recommendations />}
      <Footer />
    </div>
  );
}
