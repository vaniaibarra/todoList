import { createContext, useContext, useState, useEffect } from 'react';
import { uploadAvatarRequest } from '../api/upload';
import { editProfileRequest } from '../api/auth';
import { useAuth } from './AuthContext';


export const ProfileContext = createContext();


export const ProfileProvider = ({ children }) => {
  
  const { user, setUser } = useAuth(); 
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatarUrl: ''
  });

  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        avatarUrl: user.avatar_url || ''
      });
    }
  }, [user]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);

      const res = await uploadAvatarRequest(file);
      
      setFormData((prev) => ({ ...prev, avatarUrl: res.data.url }));
      
      return res.data.url; 
    } catch (error) {
      console.error('Error subiendo imagen:', error);
    } finally {
      setUploadingAvatar(false);
    }
  };

  
  const handleSaveProfile = async () => {
    if (!user?.id) return;

    try {
      const res = await editProfileRequest(user.id, {
        name: formData.name,
        email: formData.email,
        avatar_url: formData.avatarUrl
      });
      
      setUser(res.data); 
      
    } catch (error) {
      console.error('Error guardando perfil:', error);
    }
  };

  
  const value = {
    user,
    setUser, 
    formData,
    setFormData,
    uploadingAvatar,
    handleInputChange,
    handleFileUpload,
    handleSaveProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};


export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile debe usarse dentro de un ProfileProvider');
  }
  return context;
};