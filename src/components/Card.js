import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props){  
  function handleClick() {
    props.onCardClick({
      open: true,
      link: props.link,
      nameImg: props.name,
    })
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.owner._id === currentUser.userId;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.likes.some(element => element._id === currentUser.userId);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && 'element__like_active'} ${!isLiked && 'element__like_disabled'}` 
  );

  return (
    <>
      <article className="element">
        <button onClick = {handleClick} type='button' className="element__button-img"><img src={props.link} alt={props.name} className="element__image"/></button>                
        <div className="element__info">
          <h2 className="element__name">{props.name}</h2>
          <div className="element__likes">
            <button onClick = {handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
            <p className="element__counter-like">
              {props.lilesLength}</p>
          </div>
        </div>
        {isOwn &&<button type="button" className="element__trash" onClick={handleDeleteClick}/>}
      </article>
    </>
  )
}

export default Card;