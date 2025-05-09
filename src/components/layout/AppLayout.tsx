
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { PageTransition } from "../ui/page-transition";
import "../../animations.css";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
