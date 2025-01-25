import React from "react";
import { HiOutlineBan } from "react-icons/hi";
import { FaBookReader, FaCheckCircle, FaBookmark, FaTimesCircle } from "react-icons/fa";
import "./MemberDetails.css";

function MemberDetails({ member, setAction , userAction }) {
  return (
    <div className="member-details-container">
      {/* Member Header Section */}
      <div className="member-header">
        <div className="member-img">
          {member.name[0]}
        </div>
        <div className="member-info">
          <p>
            <strong>Name:</strong> {member.name}
          </p>
          <p>
            <strong>ID:</strong> {member.userId || member.registrationId}
          </p>
          <p>
            <strong>Status:</strong> {member.isActive ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Gender:</strong> {member.gender}
          </p>
        </div>
      </div>

      {/* Member Details Section */}
      <div className="member-middle">
        <p>
          <strong>Enrollment Date:</strong> {member.enrollmentDate}
        </p>
        <p>
          <strong>Approved By:</strong> {member.approvedBy}
        </p>
        <p>
          <strong>Email:</strong> {member.email}
        </p>
        <p>
          <strong>Contact No:</strong> {member.contactNo}
        </p>
        <p>
          <strong>Address:</strong> {member.address}
        </p>
      </div>

      {/* Member Footer Section */}
      <div className="member-footer">
        {member.registrationId && (
          <div className="member-button-group">
            <button onClick={()=>{userAction(member.registrationId,'approve')}} >
              <FaCheckCircle size={20} /> Approve
            </button>
            <button onClick={()=>{userAction(member.registrationId,'reject')}} >
              <FaTimesCircle size={20} /> Reject
            </button>
          </div>
        )}
        {member.userId && (
          <div className="member-button-group">
            <button onClick={() => setAction("borrowed")}>
              <FaBookReader size={20} /> Borrowed Books
            </button>
            <button onClick={() => setAction("reserved")}>
              <FaBookmark size={20} /> Reserved Books
            </button>
            <button onClick={() => setAction(member.isActive ? "deactive" : "active")}>
              <HiOutlineBan size={20} /> {member.isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberDetails;
