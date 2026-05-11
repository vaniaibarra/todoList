import { useNavigate } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";
import { useAuth } from "../../context/AuthContext";

const EditProfile = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  
  
  const { 
    formData, 
    uploadingAvatar, 
    handleInputChange, 
    handleFileUpload, 
    handleSaveProfile 
  } = useProfile();

  
  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSaveProfile();
    navigate('/profile')
  };
  if (!user) return <div className="p-10 text-center">Cargando datos...</div>;

  return (
    <div className="p-10 flex flex-col gap-5">
      <p className="text-5xl text-center font-outfit">Editar perfil</p>

      <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-10">
        
        
        <div className="flex flex-col gap-4 items-center">
          <div className="relative">
            <img
              className={`flex shrink-0 rounded-full w-40 h-40 object-cover object-center border border-[#f0bfce] ${uploadingAvatar ? 'opacity-50' : 'opacity-100'}`}
              
              src={formData.avatarUrl || `https://ui-avatars.com/api/?name=${formData.name}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${formData.name}`;
              }}
              alt="Avatar"
            />
            {uploadingAvatar && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
          
          <label className="cursor-pointer bg-blue-400 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-500 transition-colors">
            {uploadingAvatar ? "Subiendo..." : "Cambiar foto"}
            <input
              type="file"
              name="avatar_url"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden" 
              disabled={uploadingAvatar}
            />
          </label>
        </div>

        
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium font-outfit">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium font-outfit">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploadingAvatar}
            className="bg-blue-600 text-white rounded-md p-2 mt-4 font-outfit hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {uploadingAvatar ? "Espere un momento..." : "Guardar cambios"}
          </button>
          <button
      className="bg-blue-600 text-white rounded-md p-2 mt-4 font-outfit hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      onClick={() => navigate('/profile')}
      >
        Cancelar
      </button>
        </div>
      </form>
      
    </div>
  );
};

export default EditProfile;