import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { email, logout, getProfile } = useUser();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setProfileData(data);
    };
    fetchProfile();
  }, [getProfile]);

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {email}</p>  {/* Mostrar el email del usuario */}
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;
