import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Card from "./Card";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

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

  /*---------cards-------------*/
  const [cards, setCards] = React.useState([]);

  React.useEffect(() =>{
    api.getInitialCards().then(infoCards => {
      setCards(
        infoCards.map((info) => ({
          likes: info.likes,
          cardId: info._id,
          name: info.name,
          url: info.link,
          owner: info.owner
        }))
      )
    }).catch(err => console.log(err))
  }, [])

  /*------------ лайки ----------*/
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser.userId);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c.cardId === card._id ? {
        likes: newCard.likes,
        cardId: newCard._id,
        name: newCard.name,
        url: newCard.link,
        owner: newCard.owner
      } : c));
    }).catch(err => console.log(err)); 
  }
  /*---------- удаление карточки ------------*/
  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c.cardId !== card._id ));
    }).catch(err => console.log(err));
  }
  /*---Редактирование профиля---*/
  function handleUpdateUser({ name, specialization }){
    api.editInfoUser({ name, specialization })
      .then((info) => setCurrentUser(info))
      .catch(err => console.log(err));
    closeAllPopups()
  }
  /*---Редактирование аватара---*/
  function handleUpdateAvatar(avatarLink){
    api.editInfoAvatar(avatarLink)
      .then((info) => setCurrentUser(info))
      .catch(err => console.log(err));
    closeAllPopups()
  }
  /*----------------------*/
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
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            cards = {cards}
          />
          <Footer />
        </div>

        /*---Окно редактирования профиля---*/
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        /*---Окно редактирования аватара---*/
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        /*----------------------------*/
        
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
