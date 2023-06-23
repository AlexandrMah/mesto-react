import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading}){
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      specialization: description,
    });
  }

  return (
    <>
      <PopupWithForm
            nameClass = "edit-profile"
            title = "Редактировать профиль"
            isOpen = {isOpen}
            onClose = {onClose}
            buttonText = {isLoading ? 'Сохранение...' : 'Сохранить'}
            onSubmit = {handleSubmit}
          >
          <label className="popup__field">
            <input 
              type="text" 
              value={name || ''} 
              placeholder="Имя" 
              name="name" 
              id="profileName-input" 
              className="popup__element popup__element_key_name" 
              required 
              minLength="2" 
              maxLength="40"
              onChange = {evt => setName(evt.target.value)}
            />
            <span className="profileName-input-error popup__input-error"></span>
          </label>
          <label className="popup__field">
            <input
              type="text" 
              value={description || ''} 
              placeholder="Занятие" 
              name="specialization" 
              id="specialization-input" 
              className="popup__element popup__element_key_specialization" 
              required 
              minLength="2" 
              maxLength="200"
              onChange = {evt => setDescription(evt.target.value)}
            />
            <span className="specialization-input-error popup__input-error"></span>
          </label>
        </PopupWithForm>
    </>
  )
}

export default EditProfilePopup;