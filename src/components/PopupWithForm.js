import React from "react";

function PopupWithForm({isOpen, onClose, name, title, buttonText, children}) {
  return (
    <section className={`popup popup_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className={`popup__container`}>
        <h2 className="popup__title">{title}</h2>
        <form action="/apply/" method="POST" name={name} className="popup__input popup__input_edit-profile">
          {children}
          <button type="submit" className="popup__btn">{buttonText}</button>
        </form>
        <button onClick = {onClose} type="button" className="popup__close-btn"/>
      </div>
    </section>
  )
}

export default PopupWithForm;