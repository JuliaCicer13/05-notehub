import css from "../NoteList/NoteList.module.css";
import type {Note} from "../../types/note";

interface NoteProps {
  notes: Note[];
  onSelect: (note: Note) => void;
}
export default function NoteList({notes, onSelect}: NoteProps) {
       return (
  <ul className={css.list}>
	{notes.map((note) => (
     <li key={note.id}
         className={css.listItem}
         onClick={()=> onSelect(note)}>
    <h2 className={css.title}>{note.title}</h2>
    <p className={css.content}>Note content</p>
    <div className={css.footer}>
      <span className={css.tag}>Note tag</span>
      <button className={css.button}>Delete</button>
    </div>
  </li>
  )
  )}
</ul>
       )
}