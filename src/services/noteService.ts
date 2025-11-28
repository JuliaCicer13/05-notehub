import axios from "axios";
import type { Note }from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

interface FetchNotesResponse {
    results: Note[];
    page: number;
    perPage: number;
}
interface CreateNotePayload {
    title: string;
    content: string;
    tag?: string;
}

export const fetchNotes = async (
  searchQuery: string,
  page: number,
  perPage: number,

): Promise<FetchNotesResponse> => {
   const response =  await axios.get<FetchNotesResponse>(BASE_URL,
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

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
    const response = await axios.post<Note>(
    BASE_URL,
    payload,
    {
       headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
    },
  }
);
 return response.data;
};
export const deleteNote = async (noteId: number): Promise<Note> => {
    const response = await axios.delete<Note>(
  `BASE_URL/${noteId}`,
  {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  }
);
return response.data; 
}