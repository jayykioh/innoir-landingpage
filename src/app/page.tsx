import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Community from "@/components/Community";
import Services from "@/components/Services";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <Hero />
            <Marquee />
            <About />
            <Community />
            <Services />
            <Location />
            <Footer />
        </main>
    );
}
