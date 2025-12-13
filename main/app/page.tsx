import Dashboard from "@/components/dashboard/Dashboard";
import Footer from "@/components/Footer";
import Categories from "@/components/home/Categories";
import EventsCarousel from "@/components/home/EventsCarousel";
import Hero from "@/components/home/Hero";
import Home from "@/components/home/Home";
import NewsLine from "@/components/home/NewsLine";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { useUserStore } from "@/lib/userStore";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    return <Dashboard />;
  }

  return <Home />;
}
