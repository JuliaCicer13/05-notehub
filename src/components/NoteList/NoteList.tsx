import css from "../NoteList/NoteList.module.css";
import type {Note} from "../../types/note";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
interface NoteProps {
  notes: Note[];
}
export default function NoteList({notes}: NoteProps) {

  const queryClient = useQueryClient();
  const {mutate: deleteNoteM} = useMutation({
     mutationFn: (id: Note["id"]) => deleteNote(id),
     onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]})
     }
})
       return (
  <ul className={css.list}>
	{notes.map((note) => (
     <li key={note.id}
         className={css.listItem}
        >
    <h2 className={css.title}>{note.title}</h2>
    <p className={css.content}>{note.content}</p>
    <div className={css.footer}>
      <span className={css.tag}>{note.tag}</span>
      <button className={css.button} onClick={() => deleteNoteM(note.id)}>Delete</button>
    </div>
  </li>
  )
  )}
</ul>
       )
}