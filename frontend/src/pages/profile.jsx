import { useState } from 'react';
import '../styles/Profile.css';
import Button from '../components/common/Button';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setProfileImage(null);
  };

  const trips = [
    { id: 1, title: 'Paris Getaway' },
    { id: 2, title: 'Bali Adventure' },
    { id: 3, title: 'Dubai Escape' },
  ];

  return (
    <div className="profile-page">
      {/* PROFILE HEADER */}
      <div className="profile-card">
        <div className="profile-image-section">
          <div className="profile-image">
            {profileImage ? (
              <img src={profileImage} alt="User" />
            ) : (
              <span>Photo</span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          {profileImage && (
            <button className="remove-img" onClick={removeImage}>
              Remove
            </button>
          )}
        </div>

        <div className="profile-details">
          <h2>User Details</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john@example.com</p>
          <p><strong>Country:</strong> India</p>

          <Button>Edit Profile</Button>
        </div>
      </div>

      {/* PREPLANNED TRIPS */}
      <section>
        <h3 className="section-title">Preplanned Trips</h3>
        <div className="trip-grid">
          {trips.map(trip => (
            <div key={trip.id} className="trip-card">
              <h4>{trip.title}</h4>
              <Button>View</Button>
            </div>
          ))}
        </div>
      </section>

      {/* PREVIOUS TRIPS */}
      <section>
        <h3 className="section-title">Previous Trips</h3>
        <div className="trip-grid">
          {trips.map(trip => (
            <div key={trip.id} className="trip-card">
              <h4>{trip.title}</h4>
              <Button>View</Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
