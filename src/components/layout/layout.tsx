"use client";

import type { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow pt-[125px]">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
