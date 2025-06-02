import React from "react";
import { ImBin2 } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { toast } from "sonner";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { editNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="my-2 sm:m-2 justify-center flex w-full sm:w-fit ">
      <Card className="w-full sm:w-[350px]">
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent className="mb-3">
          <p> {note.description}</p>
        </CardContent>
        <CardFooter>
          {note.tag && <p className="text-sm text-gray-400">#{note.tag}</p>}

          <div className="w-full flex justify-end">
            <ImBin2
              className="delbtn mr-2"
              onClick={() => {
                deleteNote(note._id);
                toast.success("Note Deleted");
              }}
            />
            <FaEdit
              className="editbtn "
              onClick={() => {
                updateNote(note);
              }}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Noteitem;
