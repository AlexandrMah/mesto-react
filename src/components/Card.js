import React from "react";

function Card(props){  
  function handleClick() {
    props.onCardClick({
      open: true,
      url: props.url,
      nameImg: props.name
    })
  }  

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
        <button type="button" className="element__trash"></button>
      </article>
    </>
  )
}

export default Card;