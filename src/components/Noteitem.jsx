import React from "react";
import { ImBin2 } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <ImBin2 className="delbtn mr-2" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your note and remove your data from our database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deleteNote(note._id);
                      toast.success("Note Deleted");
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

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
