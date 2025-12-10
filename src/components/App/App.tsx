import { useState } from 'react'
import css from '../App/App.module.css'
import SearchBox from "../SearchBox/SearchBox";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import { useDebouncedCallback } from 'use-debounce';
import Loader from "../Loader/Loader";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NoteForm from '../NoteForm/NoteForm';
import Modal from "../Modal/Modal";
import NoteList from '../NoteList/NoteList';
import {Toaster} from "react-hot-toast";
import ReactPaginate from 'react-paginate';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const perPage = 12;

  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const handleSearch = useDebouncedCallback(
    (value:string) => {
    setSearchQuery(value);
    setPage(1);
   },
    500
  );

  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(search, page, perPage),
    placeholderData: keepPreviousData,
  });

   const totalPages = data?.totalPages ?? 1;


return (
 <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox value={search} onChange={handleSearch}/>
    
    {isSuccess && data?.results.length > 0  && totalPages > 1 && (
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
      />
    )}
		<button onClick={openModal} className={css.button}>Create note +</button>
  </header>
    {isLoading && <Loader/>}
    {isError && <ErrorMessage/>}
    {isSuccess && data?.results.length > 0 && ( <NoteList notes={data.results}/>)}
     <Toaster position="top-right" reverseOrder={false}/>
     {isModalOpen && (<Modal onClose={closeModal}>
      <NoteForm onSuccess={closeModal}/>
     </Modal>
     )}
</div>
   
  )
}