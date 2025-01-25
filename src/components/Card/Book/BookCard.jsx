import "./BookCard.css";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function BookCard({ book, setAction, bookAction }) {
  // Extract authors
  console.log(book.image);  
  const authorNames =
    book?.authors &&
    book.authors.map((author) => {
      const nameMatch = author.match(/name=([^,]+)/);
      return nameMatch ? nameMatch[1] : "Unknown";
    });

  return (
    <div className="book-card">
      <div className="book-image-container">
        {book.image ? (
          <img
            src={book.image}
            alt={`Cover of ${book.title}`}
            className="book-image"
          />
        ) : (
          <div className="placeholder">
            <p className="placeholder-text">Image Not Available</p>
          </div>
        )}
      </div>
      <div className="book-content">
        <h2 className="book-title">{book.title || book.bookTitle}</h2>
        {book?.isbn && (
          <Link
            to={`/admin/bookdetails?isbn=${book.isbn}`} 
            className="book-info"
          >
            ISBN: {book.isbn}
          </Link>
        )}
        {book?.bookCopy && <p>Book ID: {book.bookCopy}</p>}
        {book?.reservationId && <p>Reservation Id: {book.reservationId}</p>}
        {book?.reservationDate && (
          <p>Reservation Date: {book.reservationDate}</p>
        )}
        {authorNames && (
          <p className="book-info">Authors: {authorNames.join(", ")}</p>
        )}
        {book?.publisher && (
          <p className="book-info">
            Publisher: {book.publisher?.name || "Unknown"}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      {book?.reservationDate && (
        <div className="book-action-buttons">
          <button
            className="approve-button"
            onClick={() => {
              bookAction(book.reservationId, "APPROVE");
            }}
            disabled={book.status === "APPROVED"}
          >
            <FaCheckCircle size={20} /> Approve
          </button>
          <button
            className="reject-button"
            onClick={() => {
              bookAction(book.reservationId, "REJECT");
            }}
            disabled={book.status === "REJECTED"}
          >
            <FaTimesCircle size={20} /> Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default BookCard;
