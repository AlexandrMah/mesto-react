import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Card from "./Card";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser,  setCurrentUser] = React.useState([]);

  React.useEffect(() =>{  
    api.getInfoUser().then(infoUser => {
      setCurrentUser(
        () =>({
          name: infoUser.name,
          about: infoUser.about,
          avatar: infoUser.avatar,
          userId: infoUser._id,
        })
      )
    }).catch(err => console.log(err))
  }, [])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    open: false,
    url: '',
    nameImg: ''
  });

  function handleClickEditProfile(){
    setIsEditProfilePopupOpen(true);
  }

  function handleClickEditAvatar(){
    setIsEditAvatarPopupOpen(true)
  }

  function handleClickAddPlace(){
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
        open: false,
        url: '',
        nameImg: ''
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>  
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditProfile = {handleClickEditProfile}
            onEditAvatar = {handleClickEditAvatar}
            onAddPlace = {handleClickAddPlace}
            onCardClick = {setSelectedCard}
          />
          <Footer />
        </div>

        <PopupWithForm
            name = "edit-profile"
            title = "Редактировать профиль"
            isOpen = {isEditProfilePopupOpen}
            onClose = {closeAllPopups}
            buttonText = "Сохранить"
          >
          <label className="popup__field">
            <input 
              type="text" 
              value="" 
              placeholder="Имя" 
              name="name" 
              id="profileName-input" 
              className="popup__element popup__element_key_name" 
              required 
              minLength="2" 
              maxLength="40"
              onChange = {evt => console.log(evt.target.value)}
            />
            <span className="profileName-input-error popup__input-error"></span>
          </label>
          <label className="popup__field">
            <input
              type="text" 
              value="" 
              placeholder="Занятие" 
              name="specialization" 
              id="specialization-input" 
              className="popup__element popup__element_key_specialization" 
              required 
              minLength="2" 
              maxLength="200"
              onChange = {evt => console.log(evt.target.value)}
            />
            <span className="specialization-input-error popup__input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
            name = "edit-avatar"
            title = "Обновить аватар"
            isOpen = {isEditAvatarPopupOpen}
            onClose = {closeAllPopups}
            buttonText = "Сохранить"
          >
          <label className="popup__field">
            <input 
              type="url" 
              value=" " 
              placeholder="Ссылка на фото" 
              name="avatar" 
              id="profileAvatar-input" 
              className="popup__element popup__element_key_img" 
              required
              onChange = {evt => console.log(evt.target.value)}
            />
            <span className="profileAvatar-input-error popup__input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
            name = "create-card"
            title = "Новое место"
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
            buttonText = "Сохранить"
          >
          <label className="popup__field">
            <input 
            type="text" 
            placeholder="Название" 
            value="" 
            name="name" 
            id="name-input" 
            className="popup__element popup__element_key_name" 
            required 
            minLength="2" 
            maxLength="30"
            onChange = {evt => console.log(evt.target.value)}
            />
            <span className="name-input-error popup__input-error"></span>
          </label>
          <label className="popup__field">
            <input 
              type="url" 
              placeholder="Ссылка на картинку" 
              value="" 
              name="url" 
              id="url-input" 
              className="popup__element popup__element_key_img" 
              required
              onChange = {evt => console.log(evt.target.value)}
            />
            <span className="url-input-error popup__input-error"></span>
          </label>
        </PopupWithForm>

        <ImagePopup 
          name = "open-image"
          card = {selectedCard}
          onClose = {closeAllPopups}        
        />

      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
