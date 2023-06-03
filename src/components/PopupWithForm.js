import React from "react";

function PopupWithForm(props) {
  return (
    <section className={`popup popup_${props.name} ${props.isOpen ? `popup_opened` : ""}`}>
        <div className={`popup__container`}>
          <h2 className="popup__title">{props.title}</h2>
          <form action="/apply/" method="POST" name={props.name} className="popup__input popup__input_edit-profile" noValidate>
            {props.children}
            <button type="submit" className="popup__btn">Сохранить</button>
          </form>
          <button onClick = {props.onClose} type="button" className="popup__close-btn"></button>
        </div>
      </section>  



    /*<>
      <section className={`popup popup_edit-profile ${props.isOpen ? `popup_opened` : ""}`}>
        <div className={`popup__container popup__container_edit-profile`}>
          <h2 className="popup__title popup__title_edit-profile">Редактировать профиль</h2>
          <form action="/apply/" method="POST" name="formEditProfile" className="popup__input popup__input_edit-profile" novalidate>
            <label className="popup__field">
              <input type="text" value=" " placeholder="Имя" name="name" id="profileName-input" className="popup__element popup__element_key_name" required minlength="2" maxlength="40"/>
              <span className="profileName-input-error popup__input-error"></span>
            </label>
            <label className="popup__field">
              <input type="text" value=" " placeholder="О себе" name="specialization" id="specialization-input" className="popup__element popup__element_key_specialization" required minlength="2" maxlength="200"/>
              <span className="specialization-input-error popup__input-error"></span>
            </label>
            <button type="submit" className="popup__btn popup__btn_edit-profile">Сохранить</button>
          </form>
          <button onClick = {props.onClose} type="button" className="popup__close-btn popup__close-btn_edit-profile"></button>
        </div>
      </section>

      <section className="popup popup_edit-avatar">
        <div className="popup__container popup__container_edit-avatar">
          <h2 className="popup__title popup__title_edit-avatar">Обновить аватар</h2>
          <form action="/apply/" method="POST" name="formEditAvatar" className="popup__input popup__input_edit-avatar" novalidate>
            <label class="popup__field">
              <input type="url" value=" " placeholder="Ссылка на фото" name="avatar" id="profileAvatar-input" className="popup__element popup__element_key_img" required/>
              <span className="profileAvatar-input-error popup__input-error"></span>
            </label>        
            <button type="submit" className="popup__btn popup__btn_edit-avatar">Сохранить</button>
          </form>
          <button type="button" className="popup__close-btn popup__close-btn_edit-avatar"></button>
        </div>
      </section>

      <section className="popup popup_create-card">
        <div className="popup__container popup__container_create-card">
          <h2 className="popup__title popup__title_create-card">Новое место</h2>
          <form action="/apply/" method="POST" name="formAddCards" className="popup__input popup__input_create-card" novalidate>
            <label className="popup__field">
              <input type="text" placeholder="Название" value="" name="name" id="name-input" className="popup__element popup__element_key_name" required minlength="2" maxlength="30"/>
              <span className="name-input-error popup__input-error"></span>
            </label>
            <label className="popup__field">
              <input type="url" placeholder="Ссылка на картинку" value="" name="url" id="url-input" className="popup__element popup__element_key_img" required/>
              <span className="url-input-error popup__input-error"></span>
            </label>
            <button type="submit" className="popup__btn popup__btn_create-card">Сохранить</button>
          </form>
          <button type="button" className=" popup__close-btn popup__close-btn_create-card"></button>
        </div>
      </section>

      <section className="popup popup_delete-card">
        <div className="popup__container popup__container_delete-card">
          <h2 className="popup__title popup__title_delete-card">Вы уверены?</h2>
          <form action="/apply/" method="POST" name="formDeleteCards" className="popup__input popup__input_delete-card" novalidate>        
            <button type="submit" className="popup__btn popup__btn_delete-card">Да</button>
          </form>
          <button type="button" className=" popup__close-btn popup__close-btn_delete-card"></button>
        </div>
      </section>
    </>*/
  )
}

export default PopupWithForm;