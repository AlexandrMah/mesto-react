import React from "react";
import cross from './../images/cross.svg';
import api from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {

  const currentUser = React.useContext(CurrentUserContext);
  const userName = currentUser.name;
  const userDescription = currentUser.about;
  const userAvatar = currentUser.avatar;

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
          cards.map(({_id, ...props}) => (
            <Card
              key = {_id}
              _id = {_id}
              name = {props.name}
              link = {props.link}
              likes = {props.likes}
              lilesLength = {props.likes.length}
              onCardClick = {onCardClick}
              onCardLike = {onCardLike}
              onCardDelete = {onCardDelete}
              owner = {props.owner}
            />
          ))
        }
      </section>
    </main>
  )
}

export default Main;