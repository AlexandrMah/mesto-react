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
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [currentUser,  setCurrentUser] = React.useState([]);

  React.useEffect(() =>{  
    api.getInfoUser().then(infoUser => {
      setCurrentUser(
        () =>({
          name: infoUser.name,
          about: infoUser.about,
          avatar: infoUser.avatar,
          _id: infoUser._id,
        })
      )
    }).catch(err => console.log(err))
  }, [])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    open: false,
    link: '',
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
        link: '',
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
          _id: info._id,
          name: info.name,
          link: info.link,
          owner: info.owner
        }))
      )
    }).catch(err => console.log(err))
  }, [])

  /*------------ лайки ----------*/
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? {
        likes: newCard.likes,
        _id: newCard._id,
        name: newCard.name,
        link: newCard.link,
        owner: newCard.owner
      } : c));
    }).catch(err => console.log(err)); 
  }
  /*---------- удаление карточки ------------*/
  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id ));
    }).catch(err => console.log(err));
  }
  /*---Редактирование профиля---*/
  function handleUpdateUser({ name, specialization }){
    api.editInfoUser({ name, specialization })
      .then((info) => {
        setCurrentUser(info)
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }
  /*---Редактирование аватара---*/
  function handleUpdateAvatar(avatarLink){
    api.editInfoAvatar(avatarLink)
      .then((info) => {
        setCurrentUser(info)
        closeAllPopups()
      })
      .catch(err => console.log(err));    
  }
  /*---Создание новой карточки---*/
  function handleAddPlaceSubmit(name, link){
    api.getAddNewCard(name, link)
      .then((infoCard) => {
        setCards(
          [infoCard, ...cards].map((info) => (
            {           
            likes: info.likes,
            _id: info._id,
            name: info.name,
            link: info.link,
            owner: info.owner
          })))     
        closeAllPopups()
      })
      .catch(err => console.log(err));    
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

        {/*---Окно редактирования профиля---*/}
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/*---Окно редактирования аватара---*/}
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/*---Окно добавления новой карточки---*/}
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />        
        {/*----------------------------*/}

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
