import React, { useState } from 'react'
import css from '../App/App.module.css'
import SearchBox from "../SearchBox/SearchBox";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import { useMutation, useQueryClient  } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import Loader from "../Loader/Loader";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import type { Note } from '../../types/note';
import NoteList from '../NoteList/NoteList';
import Modal from "../Modal/Modal";
import {Toaster} from "react-hot-toast";
import ReactPaginate from 'react-paginate';
import axios from 'axios';

export default function App() {
  const queryClient = useQueryClient(); 
  const [searchQuery, setSearchQuery] = useState<Note | null>(null);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['notes', searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page, perPage),
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    mutationFn: async (newNote) => {
    const res = await axios.post("https://notehub-public.goit.study/api/notes", newNote);
       return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['notes']});
     console.log("Todo added successfully");
    }, 
    onError: (error) => {
      
    }
  });

  const handleCreateNote = () => {
    mutation.mutate({
      title: "My new note",
      completed: false
    })
  };


   const totalPages = data?.perPage ?? 0;

   const handleSearch = async(newNote: string) => {
      setSearchQuery(searchQuery);
      setPage(1);

   }

   const openModal = (note: Note) => {
    setSelectedNote(note);
  };

  const closeModal = () => {
    setSelectedNote(null);
  };

return (
 <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox onSearch={handleSearch}/>
    
    {isSuccess && totalPages > 1 && (
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
      />
    )}
		<button onClick={handleCreateNote} className={css.button}>Create note +</button>
  </header>
  {mutation.isPending && <div>Adding note...</div>}
  {mutation.isError && <div>An error occurred</div>}
	{mutation.isSuccess && <div>Note added!</div>}
    {isLoading && <Loader/>}
    {isError && <ErrorMessage/>}
    {isSuccess && data?.results.length > 0 && ( <NoteList onSelect={openModal} notes={data.results}/>)}
     <Toaster position="top-right" reverseOrder={false}/>
</div>
   
  )
}
