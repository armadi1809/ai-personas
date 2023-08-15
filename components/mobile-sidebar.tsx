import { FC } from "react";
import { Menu } from "lucide-react";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";

const MobileSidebar: FC = ({}) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4">
        <Menu></Menu>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
