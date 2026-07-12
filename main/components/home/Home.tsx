import SignInDialog from "../auth/SignInDialog";
import SignUpDialog from "../auth/SignUpDialog";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Categories from "./Categories";
import EventsCarousel from "./EventsCarousel";
import Hero from "./Hero";
import NewsLine from "./NewsLine";

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-mont space-y-8 lg:space-y-10 mb-10">
      <Navbar />
      <Hero />
      <div className="bg-blue-500 py-12 pt-22 lg:pt-90 lg:pb-12 mb-0">
        <EventsCarousel />
      </div>
      <NewsLine />
      <Categories />
      <SignUpDialog />
      <SignInDialog />
      <Footer />
    </div>
  );
}
