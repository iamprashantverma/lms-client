import React, { useState, useEffect } from 'react';
import { findMember } from '../../services/api/adminService';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { FaEdit } from 'react-icons/fa';

function Profile() {
  const { user } = useContext(AuthContext);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  const [editedAddress, setEditedAddress] = useState('');
  const [editedContact, setEditedContact] = useState('');
  const [editedImage, setEditedImage] = useState('');

  useEffect(() => {
    setError(null);
    const getData = async () => {
      try {
        const data = await findMember(user.userId);
        setMember(data);
        setEditedAddress(data.address);
        setEditedContact(data.contactNo);
        setEditedImage(data.image || 'default_image_url.jpg');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [user.userId]);

  const handleUpdate = () => {
    setMember((prevMember) => ({
      ...prevMember,
      address: editedAddress,
      contactNo: editedContact,
      image: editedImage,
    }));

    setIsEditingAddress(false);
    setIsEditingContact(false);
    setIsEditingImage(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile: {error}</div>;
  }

  if (!member) {
    return <div>No member data available</div>;
  }

  return (
    <div className="profile-container">
      <h1>Admin Profile</h1>
      
      {/* Profile Image */}
      <div className="profile-image-container">
        <img
          src=""
          alt="Profile"
          className="profile-image"
        />
        <div className="edit-icon" onClick={() => setIsEditingImage(true)}>
          <FaEdit />
        </div>
        {isEditingImage && (
          <input
            type="file"
            className="file-input"
            accept="image/*"
            onChange={handleImageChange}
          />
        )}
      </div>
      
      <div className="profile-details">
        <p><strong>Name:</strong> {member.name}</p>
        <p><strong>Email:</strong> {member.email}</p>
        <p><strong>Status:</strong> {member.isActive ? 'Active' : 'Inactive'}</p>
        <p><strong>Enrollment Date:</strong> {member.enrollmentDate}</p>
        <p><strong>Gender:</strong> {member.gender}</p>

        {/* Editable Address */}
        <div className="editable-field">
          <strong>Address:</strong>
          <div className="field-container">
            {isEditingAddress ? (
              <input
                type="text"
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
              />
            ) : (
              <span>{member.address}</span>
            )}
            {!isEditingAddress && (
              <FaEdit onClick={() => setIsEditingAddress(true)} className="edit-icon-inline" />
            )}
          </div>
        </div>

        {/* Editable Contact No */}
        <div className="editable-field">
          <strong>Contact No:</strong>
          <div className="field-container">
            {isEditingContact ? (
              <input
                type="text"
                value={editedContact}
                onChange={(e) => setEditedContact(e.target.value)}
              />
            ) : (
              <span>{member.contactNo}</span>
            )}
            {!isEditingContact && (
              <FaEdit onClick={() => setIsEditingContact(true)} className="edit-icon-inline" />
            )}
          </div>
        </div>

        {/* Update Button */}
        <button onClick={handleUpdate} className="update-button">
          Update
        </button>
      </div>
    </div>
  );
}

export default Profile;
