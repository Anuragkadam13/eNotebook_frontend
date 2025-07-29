import { React } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import About from "./About";
import { toast } from "sonner";
import { ModeToggle } from "./mode-toggle";
import { LogOut, Menu, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");
    navigate("/login");
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full z-50">
      <nav className="px-5 py-2 flex items-center justify-between font-medium shadow bg-white dark:bg-[#0A0A0A] dark:border-b">
        <div className="flex items-center gap-1 ">
          <img src={logo} className="h-12 md:h-14" alt="" />
          <h1 className=" text-[26px]">CloudNotes</h1>
        </div>

        {localStorage.getItem("token") ? (
          <div className="flex items-center">
            <Popover onOpenChange={setIsOpen}>
              <PopoverTrigger className="hover:cursor-pointer border-2 rounded">
                {!isOpen ? (
                  <Menu className="w-fit h-7" />
                ) : (
                  <X className="w-fit h-7" />
                )}
              </PopoverTrigger>
              <PopoverContent className="z-60">
                <div className="w-full ">
                  <About className="z-70" />
                  <ModeToggle className="z-70" />
                  <Button
                    className="hover:cursor-pointer w-full justify-start "
                    variant="ghost"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    <span>Log out</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
};

export default Navbar;
