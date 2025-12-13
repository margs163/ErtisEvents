"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useUserStore } from "@/lib/userStore";
import EventCreationForm from "@/components/dashboard/EventCreationForm";
import Navbar from "@/components/Navbar";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function Dashboard() {
  const userData = useUserStore((state) => state);
  const router = useRouter();
  const { data: session, isPending, error, refetch } = authClient.useSession();

  useEffect(() => {
    if (!session?.user.email) {
      router.replace("/");
    }
  }, [session?.user]);

  return (
    <div className="min-h-screen bg-orn font-mont space-y-10 lg:space-y-14">
      <Script src="https://js.puter.com/v2/" strategy={"lazyOnload"} />
      <Navbar />
      <EventCreationForm />
      <Footer />
    </div>
  );
}
