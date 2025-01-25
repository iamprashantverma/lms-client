import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  findMember,
  memberReservedBooks,
  deactivateMember,
  activateMember,
  memberBorrowedBooks,
  actionOnReservedBook,
  findUser,
  rejectMember,
  approveUser
} from "../../services/api/adminService";
import Loading from "../../components/Common/Loading";
import BookCard from '../../components/Card/Book/BookCard';
import MemberDetails from "../../components/Card/Member/MemberDetails";
import './MemberDetailsPage.css';

function MemberDetailsPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [member, setMember] = useState(null);
  const [action, setAction] = useState(null);
  const [bookList, setBookList] = useState(null); 
  const [refresh, setRefresh] = useState(false); 

  //  fetching the data based on the userId Or Registration Id
  useEffect(() => {
    if (!id) {
      setError("Please enter a valid User ID");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        let resp;
        if (id.startsWith("USER-")) {
          resp = await findMember(id); 

        } else {
          resp = await findUser(id); 
        }
        setMember(resp);
      } catch (err) {
        setError(err.error?.message || "Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, refresh]);

  //  fecthing the book data eg reserved Book or Borrowed Book , and also taling the action on the member
  useEffect(() => {
    const handleAdminAction = async () => {
      if (!action) return;

      try {
        if (action === "deactive") {
          await deactivateMember(id);
          setRefresh((prev) => !prev);
        } else if (action === "active") {
          await activateMember(id);
          setRefresh((prev) => !prev);
        } else if (action === "borrowed") {
          const { data } = await memberBorrowedBooks(id);
          console.log(data);
          setBookList({ type: "borrowed", books: data });
        } else if (action === "reserved") {
          const { data } = await memberReservedBooks(id);
          setBookList({ type: "reserved", books: data });
        }
      } catch (err) {
        setError(err.error?.message || "Action failed");
      } finally {
        setAction(null);
      }
    };

    handleAdminAction();
  }, [action, id]);

  //  rejecting or accepting the reserved book of the users
  const bookAction = async (reservationId, actionStatus) => {
    try {
      await actionOnReservedBook({ id: reservationId, actionStatus: actionStatus });
      setBookList((prevBookList) => {
        if (Array.isArray(prevBookList?.books)) {
          return {
            ...prevBookList,
            books: prevBookList.books.filter((book) => book.reservationId !== reservationId),
          };
        }
        return prevBookList;
      });
    } catch (error) {
      setError(error?.error?.message || "Failed to update reservation");
    }
  };

  //  taking action on memberShip Requests
  const userAction = async(id , memAction)=>{
    console.log(id,memAction)
    try {
      let resp;
        if (memAction ==='approve') {
          resp = await approveUser(id);
        } else if (memAction === 'reject') {
         resp = await rejectMember(id);
        }
        setMember(resp.data);
    } catch (err) {
      console.log(err);
      setError(err.error.message);
    }
  }

  
  return (
    <>
      {member && (
        <div className="member-container">
          <div className="member-info">
            <MemberDetails  userAction ={userAction} setAction={setAction} member={member} />
          </div>

          <div className="book-info">
            {/* Display Reserved or Borrowed Books */}
            {bookList?.type === "borrowed" && (
              <div>
                <h3>Borrowed Books</h3>
                <ul>
                  {bookList.books.map((book) => (
                    <BookCard bookAction={bookAction} book={book} key={book.isbn} />
                  ))}
                </ul>
              </div>
            )}
            {bookList?.type === "reserved" && (
              <div>
                <h3>Reserved Books</h3>
                <ul>
                  {bookList.books.map((book) => (
                    <BookCard bookAction={bookAction} book={book} key={book.reservationId} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {loading && <Loading />}
      {error && <p>{error}</p>}
    </>
  );
}

export default MemberDetailsPage;
