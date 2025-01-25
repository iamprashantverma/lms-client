import React, { useEffect, useState } from "react";
import {
  getAllMembers,
  membershipRequests,
  approveUser,
  rejectMember
} from "../../services/api/adminService";
import Loading from "../../components/Common/Loading";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Common/Pagination";
import MemberCard from "../../components/Card/Member/MemberCard";
import "./Member.css";

function Member() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  //  calling the appropriate api call based on the member Type
  useEffect(() => {
    const memberHandler = async () => {
      try {
        setError(null);
        setLoading(true);
        const { data } = await getAllMembers(currentPage);
        setTotalPages(data.totalPages);
        setMembers(data.content);
      } catch (err) {
        setError(err.error.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const userHandler = async () => {
      try {
        setError(null);
        setLoading(true);
        const { data } = await membershipRequests(currentPage);
        setMembers(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.error.message);
      } finally {
        setLoading(false);
      }
    };

    if (from === "member") {
      memberHandler();
    } else if (from === "user") {
      userHandler();
    }
  }, [from, currentPage]);

 //  taking action on memberShip Requests
  const userAction = async(id , memAction)=>{
    console.log(id,memAction)
    try {
        if (memAction ==='approve') {
          await approveUser(id);
        } else if (memAction === 'reject') {
          await rejectMember(id);
        }
        setMembers((members).filter(member=>member.registrationId !== id)); 
    } catch (err) {
      console.log(err);
      setError(err.error.message);
    }
  }

  return (
    <div>
      {from === "member" && (
        <div className="member-container">
          <div className="member-card">
            {members.map((member) => (
              <MemberCard
                key={member.userId || member.registrationId}
                member={member}
              />
            ))}
          </div>
          <div className="pagination">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}

      {from === "user" && (
        <div className="member-container">
          <div className="member-card">
            {members.map((member) => (
              <MemberCard
                key={member.userId || member.registrationId}
                member={member} userAction ={userAction}
              />
            ))}
          </div>
          <div className="pagination">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}
      {loading && <Loading />}
      {error && <p className="error-message">{error}</p>}
      {members.length === 0 && <p>No Data Available</p>}
    </div>
  );
}

export default Member;
