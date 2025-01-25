import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllBooks, getAllReservedBook, actionOnReservedBook } from '../../services/api/adminService';
import Loading from '../../components/Common/Loading';
import Pagination from '../../components/Common/Pagination';
import BookCard from '../../components/Card/Book/BookCard';
import './Book.css';

function Book() {
  const { id } = useParams(); 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true);
        let resp;
        console.log(id);
        if (id === 'res') {
          resp = await getAllReservedBook(currentPage);
        } else {
          resp = await getAllBooks(currentPage);
        }
        console.log(resp.data.content);
        setBooks(resp.data.content);
        setTotalPages(resp.data.totalPages);
      } catch (error) {
        console.error(error.message || error);
        setError('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, [currentPage, id]);  

  //  handling the book accept or reject request
  const bookAction = async (reservationId, actionStatus) => {
    try {
      await actionOnReservedBook({ id: reservationId, actionStatus: actionStatus });
      setBooks((prevBooks) => {
       
        return prevBooks.filter((book) => book.reservationId !== reservationId);
      });
    } catch (error) {
      setError(error?.message || "Failed to update reservation");
    }
  };

  return (
    <div className='Book-container'>
      <div className="book-content-container">
        {books && books.map((book) => (
          <BookCard bookAction={bookAction} key={book.isbn} book={book} />
        ))}
      </div>

      {loading && <Loading />}

      {/* Pagination */}
      {!loading && !error && currentPage > 1 && (
        <div className='pagination-container'>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Book;
