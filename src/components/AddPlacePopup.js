import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }){
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit(name, url);  
  }
  
  React.useEffect(() => {
    if (isOpen === false){
      setName('');
      setUrl('');  
    }
  }, [isOpen]);

  

  return (
    <>
      <PopupWithForm
          name = "create-card"
          title = "Новое место"
          isOpen = {isOpen}
          onClose = {onClose}
          buttonText = {isLoading ? 'Сохранение...' : 'Сохранить'}
          onSubmit={handleSubmit}
        >
        <label className="popup__field">
          <input 
          type="text" 
          placeholder="Название" 
          value={name}
          name="name" 
          id="name-input" 
          className="popup__element popup__element_key_name" 
          required 
          minLength="2" 
          maxLength="30"
          onChange = {evt => setName(evt.target.value)}
          />
          <span className="name-input-error popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input 
            type="url" 
            placeholder="Ссылка на картинку" 
            value={url} 
            name="url" 
            id="url-input" 
            className="popup__element popup__element_key_img" 
            required
            onChange = {evt => setUrl(evt.target.value)}
          />
          <span className="url-input-error popup__input-error"></span>
        </label>
      </PopupWithForm>
    </>
  )
}

export default AddPlacePopup;