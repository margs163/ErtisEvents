"use client";
import SearchedEvents from "@/components/dashboard/SearchedEvents";
import { authClient } from "@/lib/auth-client";
import { useEffect, useTransition } from "react";
import { useUserStore } from "@/lib/userStore";
import Navbar from "@/components/Navbar";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/Footer";
import EventSearchFilters from "@/components/dashboard/SearchFilters";
import HeaderSearch from "@/components/dashboard/HeaderSearch";
import { fetchAllEvents, fetchEventAndImages } from "@/lib/actions";
import { toast } from "sonner";
import { useEventsStore } from "@/lib/eventStore";
import LoadingSmallUI from "@/components/LoadingSmallUI";
import LoadingUI from "@/components/LoadingUI";

export default function Page() {
  const setUserData = useUserStore((state) => state.setUserData);
  const setEvents = useEventsStore((state) => state.setEvents);
  const events = useEventsStore((state) => state.events);
  const { data: session, error, refetch } = authClient.useSession();

  const [isPending, startTransition] = useTransition();

  const handleFetch = () => {
    startTransition(async () => {
      if (events.length > 20 || !session?.user) {
        return;
      }
      const data = await fetchEventAndImages();

      if (data?.error) {
        toast.error("Could not retrieve events", {
          description: "Please try again later",
        });
      }
      if (data?.events && data?.urls) {
        const mappedEvents = data.events.map((item, index) => ({
          ...item,
          s3Url: data.urls[index],
        }));

        setEvents(mappedEvents);
      }
    });
  };

  useEffect(() => {
    if (session?.user) {
      setUserData({ ...JSON.parse(JSON.stringify(session.user)), image: "" });
      handleFetch();
    }
  }, [session?.user.id]);
  return (
    <div className="min-h-screen bg-orn font-mont space-y-8 lg:space-y-14">
      <Navbar />
      <HeaderSearch />
      {isPending ? <LoadingUI mode="dark" /> : <SearchedEvents />}
      <Footer />
    </div>
  );
}
