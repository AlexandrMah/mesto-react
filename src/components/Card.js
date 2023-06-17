import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props){  
  function handleClick() {
    props.onCardClick({
      open: true,
      url: props.url,
      nameImg: props.name,
    })
  }

  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.owner._id === currentUser.userId;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.likes.some(element => element._id === currentUser.userId);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  );; 
  console.log(isLiked, props.likes, currentUser.userId)

  return (
    <>
      <article className="element">
        <button onClick = {handleClick} type='button' className="element__button-img"><img src={props.url} alt={props.name} className="element__image"/></button>                
        <div className="element__info">
          <h2 className="element__name">{props.name}</h2>
          <div className="element__likes">
            <button type="button" className="element__like element__like_disabled"></button>
            <p className="element__counter-like">
              {props.lilesLength}</p>
          </div>
        </div>
        {isOwn &&<button type="button" className="element__trash" /*onClick={handleDeleteClick}*//>}
      </article>
    </>
  )
}

export default Card;