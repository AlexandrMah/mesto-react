import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }){
  const [url, setUrl] = React.useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: url,
    }); 
  }

  React.useEffect(() => {
    if (isOpen === false){
      setUrl('');  
    }
  }, [isOpen]);
  
  return (
    <>
      <PopupWithForm
            name = "edit-avatar"
            title = "Обновить аватар"
            isOpen = {isOpen}
            onClose = {onClose}
            buttonText = {isLoading ? 'Сохранение...' : 'Сохранить'}
            onSubmit={handleSubmit}
          >
          <label className="popup__field">
            <input 
              type="url" 
              value={url} 
              placeholder="Ссылка на фото" 
              name="avatar" 
              id="profileAvatar-input" 
              className="popup__element popup__element_key_img" 
              required
              onChange = {evt => setUrl(evt.target.value)}
            />
            <span className="profileAvatar-input-error popup__input-error"></span>
          </label>
        </PopupWithForm>
    </>
  )
}

export default EditAvatarPopup;