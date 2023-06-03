import React from "react";
import cross from './../images/cross.svg';
import api from "../utils/api";
import Card from "./Card";

function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {

  const [userName, setUserName] = React.useState("Жак-Ив Кусто");
  const [userDescription, setUserDescription] = React.useState("Исследователь океанов");
  const [userAvatar, setUserAvatar] = React.useState("https://taxpert.ru/neuroavatar/max/f221e4b61503a25f.jpg");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() =>{  
    api.getInfoUser().then(response => {
      setUserName(response.name)
      setUserDescription(response.about)
      setUserAvatar(response.avatar)
    }).catch(err => console.log(err))
  
    api.getInitialCards().then(infoCards => {
      setCards(
        infoCards.map((info) => ({
          likes: info.likes,
          cardId: info._id,
          name: info.name,
          url: info.link,
        }))
      )
    }).catch(err => console.log(err))
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info-user">
          <button onClick = {onEditAvatar} type="button" className="profile__edit-photo">
            <img src={userAvatar} alt="Фото профиля." className="profile__avatar"/>
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__specialization">{userDescription}</p>
            <button onClick = {onEditProfile} type="button" className="profile__edit-button"></button>
          </div>
        </div>
        <button onClick = {onAddPlace} type="button" className="profile__add-button"><img src={cross} alt="Кнопка добавления." className="profile__add-button-img"/></button>
      </section>

      <section className="elements">
        {
          cards.map(({id, ...props}) => (
            <Card 
              id = {id}
              name = {props.name}
              url = {props.url}
              likes = {props.likes}
              lilesLength = {props.likes.length}
              onCardClick = {onCardClick}
            />
          ))
        }
      </section>
    </main>
  )
}

export default Main;