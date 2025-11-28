import axios from "axios";
import type { Note }from "../types/note";

interface FetchNotesResponse {
    results: Note[];
    page: number;
    perPage: number;
}

export const fetchNotes = async (
  searchQuery: string,
  page: number,
  perPage: 12,

): Promise<FetchNotesResponse> => {
   const response =  await axios.get<FetchNotesResponse>("https://notehub-public.goit.study/api/docs",
    {
     params: {
      searchQuery,
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