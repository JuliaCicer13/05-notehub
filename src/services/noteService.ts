import axios from "axios";
import type { Note }from "../types/note";

interface FetchNotesResponse {
    results: Note[];
    page: number;
    perPage: number;
}

export const fetchNotes = async (
  query: string,
  page: number,
  perPage:number,

): Promise<FetchNotesResponse> => {
   const response =  await axios.get<FetchNotesResponse>("https://notehub-public.goit.study/api/notes?page=1&perPage=12",
    {
     params: {
      query,
      page,
      perPage
     } ,
     headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
     },
    });
        console.log("Raw response:", response.data);
        return response.data;
}

export const createNote = async () => {
    const newNote = {
        title: "My new Note",
        completed: false
    };
    axios.post("https://notehub-public.goit.study/api/notes", newNote)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
}

export const deleteNote = async () => {
    const noteId = 1;
    axios.delete(`https://notehub-public.goit.study/api/notes/${noteId}`)
    .then((response) => console.log(response.data))
    .catch(error => console.log(error));
}