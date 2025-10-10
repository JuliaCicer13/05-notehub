import { useState } from 'react'
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

export default function App() {
  const queryClient = useQueryClient(); 
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [note, setNote] = useState(0);
  const [page, setPage] = useState(1);

  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['notes', note, page],
    queryFn: () => fetchNotes(note, page, perPage),
    placeholderData: keepPreviousData,
  });

   const totalPages = data?.perPage ?? 0;


   const handleSearch = async(newNote: string) => {
      setNote(newNote);
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
		<SearchBox onSubmit={handleSearch}/>
    
    {isSuccess && totalPages > 1 && (
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    )}
		<button className={css.button}>Create note +</button>
    {isLoading && <Loader/>}
    {isError && <ErrorMessage/>}
    {isSuccess && data?.results.length > 0 && ( <NoteList onSelect={openModal} notes={data.results}/>)}
    {selectedNote && <Modal movie={selectedNote} onClose={closeModal}/>}
     <Toaster position="top-right" reverseOrder={false}/>
  </header>
  {}
</div>
   
  )
}
