import { Navbar } from "@/components/navbar";
import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="h-full ">
      <Navbar />
      <main className="md:pl-20 pt-16 h-full">{children}</main>
    </div>
  );
};

export default RootLayout;
