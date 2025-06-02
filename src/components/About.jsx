import React, { useEffect, useState } from "react";
import userImg from "../assets/pro-pic.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CalendarDays, User } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

const About = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if (json.success && json.user) {
        setUser(json.user);
      } else {
        setError("Failed to fetch user details.");
      }
    } catch (e) {
      setError(`There was an error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="flex items-center">
      {loading && <Skeleton className="w-[30px] h-[30px] rounded-full" />}
      {error && toast.error(error)}
      {user && (
        <Popover>
          <PopoverTrigger className="flex items-center justify-start gap-2 w-full dark:hover:bg-[#1e1e1e] py-2 px-2 rounded-md hover:bg-[#f5f5f5]">
            <User className="h-4" />
            <span className="text-sm">Profile</span>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex gap-5">
              <Avatar>
                <AvatarImage src={userImg} />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{user.name}</h4>
                <p className="text-sm">{user.email}</p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Joined on {format(user.date, "yyyy-MM-dd")}
                  </span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default About;
