import React, { useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext, useEffect } from "react";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
import light from "../assets/light.png";
import dark from "../assets/dark.png";

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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { useTheme } from "@/components/theme-provider";
import LoadingContext from "@/context/Loader/LoadingContext";

const Notes = () => {
  const { theme } = useTheme();
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchallNotes, editNote } = context;
  const loadContext = useContext(LoadingContext);
  const { showLoading, hideLoading, isLoading } = loadContext;
  useEffect(() => {
    const loadNotes = async () => {
      try {
        showLoading();
        if (localStorage.getItem("token")) {
          await fetchallNotes();
        } else {
          hideLoading();
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        hideLoading();
      }
    };

    loadNotes();
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleSubmit = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    toast.success("Note Updated");
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" ref={ref} className="hidden">
            Launch modal
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Note</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-1 mb-3">
              <Label htmlFor="etitle">Title</Label>
              <Input
                type="text"
                value={note.etitle}
                id="etitle"
                name="etitle"
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="grid gap-1 mb-3">
              <Label htmlFor="edescription">Description</Label>
              <Textarea
                rows="4"
                value={note.edescription}
                id="edescription"
                name="edescription"
                style={{ resize: "none" }}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="grid gap-1 mb-3">
              <Label htmlFor="etag">Tag</Label>
              <Input
                type="text"
                value={note.etag}
                id="etag"
                name="etag"
                onChange={onChange}
              />
            </div>
          </form>
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button type="button" ref={refClose}>
                Close
              </Button>
            </DialogClose>
            <Button
              disabled={note.etitle.length < 5 || note.edescription.length < 0}
              onClick={handleSubmit}
            >
              Update Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex flex-wrap">
        {notes.length == 0 ? (
          <div className=" mt-10 w-full justify-center items-center flex gap-5 flex-col">
            {theme == "light" ? (
              <img
                src={light}
                className="h-[150px] md:h-[200px] w-fit "
                alt="Add Note"
              />
            ) : (
              <img
                src={dark}
                className="h-[150px] md:h-[200px] w-fit"
                alt="Add Note"
              />
            )}

            <p className="text-center">
              Start creating your note! Click the 'Add' button to jot down your
              thoughts, ideas and <br /> reminders. Let's get started
            </p>
          </div>
        ) : (
          ""
        )}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
