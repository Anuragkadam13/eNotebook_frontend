import React, { useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

const AddNote = ({ closeModal }) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({
      title: "",
      description: "",
      tag: "",
    });
    closeModal();
    toast.success("Note Added");
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="grid gap-1 mb-3">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            onChange={onChange}
            required
            value={note.title}
            placeholder="Type Title here."
          />
        </div>
        <div className="grid gap-1 mb-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            rows="4"
            id="description"
            name="description"
            style={{ resize: "none" }}
            onChange={onChange}
            required
            value={note.description}
            placeholder="Type description here."
          />
        </div>
        <div className="grid gap-1 mb-3">
          <Label htmlFor="tag">Tag</Label>
          <Input
            type="text"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
            placeholder="Add tag here."
          />
        </div>
        <Button type="submit" className="hover:cursor-pointer w-full">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddNote;
