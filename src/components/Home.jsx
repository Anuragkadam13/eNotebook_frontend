import React, { useRef } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { BsFillPlusSquareFill } from "react-icons/bs";

const Home = () => {
  const refClose = useRef(null);
  const closeModal = () => {
    refClose.current.click();
  };
  return (
    <div className="relative">
      <Notes className="-z-10" />
      <Dialog>
        <div className="flex justify-center">
          <DialogTrigger
            className="w-fit h-12 sm:h-14 fixed bottom-2.5 sm:bottom-5 sm:right-5 right-1/2"
            asChild
          >
            <BsFillPlusSquareFill className="hover:cursor-pointer" />
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Add Note</DialogTitle>
          </DialogHeader>
          <AddNote closeModal={closeModal} />
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild className="hidden">
              <Button type="button" ref={refClose}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
