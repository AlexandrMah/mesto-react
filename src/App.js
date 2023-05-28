import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <body class="root">
      <div class="page">
        <header class="header header_line">
          <img src="<%=require('./images/logo.svg')%>" alt="Логотип Mesto Russia" class="header__logo"/>
        </header>

        <main class="content">
          <section class="profile">
            <div class="profile__info-user">
              <button type="button" class="profile__edit-photo">
                <img src="#" alt="Фото профиля." class="profile__avatar"/>
              </button>
              <div class="profile__info">
                <h1 class="profile__name"></h1>
                <p class="profile__specialization"></p>
                <button type="button" class="profile__edit-button"></button>
              </div>
            </div>
            <button type="button" class="profile__add-button"><img src="<%=require('./images/cross.svg')%>" alt="Кнопка добавления." class="profile__add-button-img"/></button>
          </section>

          <section class="elements" aria-label="element">

          </section>
        </main>

        <footer class="footer">
          <p class="footer__info">&#169; 2020 Mesto Russia</p>
        </footer>
      </div>

      <section class="popup popup_edit-profile">
        <div class="popup__container popup__container_edit-profile">
          <h2 class="popup__title popup__title_edit-profile">Редактировать профиль</h2>
          <form action="/apply/" method="POST" name="formEditProfile" class="popup__input popup__input_edit-profile" novalidate>
            <label class="popup__field">
              <input type="text" value=" " placeholder="Имя" name="name" id="profileName-input" class="popup__element popup__element_key_name" required minlength="2" maxlength="40"/>
              <span class="profileName-input-error popup__input-error"></span>
            </label>
            <label class="popup__field">
              <input type="text" value=" " placeholder="О себе" name="specialization" id="specialization-input" class="popup__element popup__element_key_specialization" required minlength="2" maxlength="200"/>
              <span class="specialization-input-error popup__input-error"></span>
            </label>
            <button type="submit" class="popup__btn popup__btn_edit-profile">Сохранить</button>
          </form>
          <button type="button" class="popup__close-btn popup__close-btn_edit-profile"></button>
        </div>
      </section>

      <section class="popup popup_edit-avatar">
        <div class="popup__container popup__container_edit-avatar">
          <h2 class="popup__title popup__title_edit-avatar">Обновить аватар</h2>
          <form action="/apply/" method="POST" name="formEditAvatar" class="popup__input popup__input_edit-avatar" novalidate>
            <label class="popup__field">
              <input type="url" value=" " placeholder="Ссылка на фото" name="avatar" id="profileAvatar-input" class="popup__element popup__element_key_img" required/>
              <span class="profileAvatar-input-error popup__input-error"></span>
            </label>        
            <button type="submit" class="popup__btn popup__btn_edit-avatar">Сохранить</button>
          </form>
          <button type="button" class="popup__close-btn popup__close-btn_edit-avatar"></button>
        </div>
      </section>

      <section class="popup popup_create-card">
        <div class="popup__container popup__container_create-card">
          <h2 class="popup__title popup__title_create-card">Новое место</h2>
          <form action="/apply/" method="POST" name="formAddCards" class="popup__input popup__input_create-card" novalidate>
            <label class="popup__field">
              <input type="text" placeholder="Название" value="" name="name" id="name-input" class="popup__element popup__element_key_name" required minlength="2" maxlength="30"/>
              <span class="name-input-error popup__input-error"></span>
            </label>
            <label class="popup__field">
              <input type="url" placeholder="Ссылка на картинку" value="" name="url" id="url-input" class="popup__element popup__element_key_img" required/>
              <span class="url-input-error popup__input-error"></span>
            </label>
            <button type="submit" class="popup__btn popup__btn_create-card">Сохранить</button>
          </form>
          <button type="button" class=" popup__close-btn popup__close-btn_create-card"></button>
        </div>
      </section>

      <section class="popup popup_delete-card">
        <div class="popup__container popup__container_delete-card">
          <h2 class="popup__title popup__title_delete-card">Вы уверены?</h2>
          <form action="/apply/" method="POST" name="formDeleteCards" class="popup__input popup__input_delete-card" novalidate>        
            <button type="submit" class="popup__btn popup__btn_delete-card">Да</button>
          </form>
          <button type="button" class=" popup__close-btn popup__close-btn_delete-card"></button>
        </div>
      </section>

      <section class="popup popup_open-image">
        <div class="popup__container-image">
          <img src='#' alt="" class="popup__image"/>
          <h2 class="popup__name-image">#</h2>
          <button type="button" class="popup__close-btn popup__close-btn_open-image"></button>
        </div>
      </section>

      <template id="card">
        <article class="element">
          <button type='button' class="element__button-img"><img src="#" alt="#" class="element__image"/></button>
          <div class="element__info">
            <h2 class="element__name"></h2>
            <div class="element__likes">
              <button type="button" class="element__like element__like_disabled"></button>
              <p class="element__counter-like">0</p>
            </div>
          </div>
          <button type="button" class="element__trash"></button>
        </article>
      </template>

    </body>


















    
  );
}

export default App;
