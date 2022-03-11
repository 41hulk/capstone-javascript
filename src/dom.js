import {
  getMealsList, getMealDetails, getLikes, sendLike, getComments,
} from './api.js';

const countItems = (mealArr) => mealArr.length;
const countComments = (commentsArr) => commentsArr.length;
const showMealList = () => {
  getLikes().then((likesObj) => {
    getMealsList().then((res) => {
      const mealsHtml = document.getElementById('meals-list');
      mealsHtml.innerHTML = `
      ${res.meals
    .map(
      (item) => `
      <div class="col-4 border d-flex flex-column meal-container" id="${item.idMeal}">
        <img src="${item.strMealThumb}/preview" alt="${item.strMeal}">
        <div class="d-flex align-items-center justify-content-between meal-content">
          <h2 class="meal-title">${item.strMeal}</h2>
          <div class="heart-container">
            <button type="button" class="fa-regular fa-heart like-btn"></button>
                     <span>${(() => {
    if (!likesObj[item.idMeal]) return '0 likes';
    return `${likesObj[item.idMeal]} likes`;
  })()}</span>
          </div>
        </div>
        <button type="button" class="comment-btn" data-bs-toggle="modal" data-bs-target="#recipe-modal">Comments</button>
      </div>`,
    )
    .join('')}`;
      document.querySelector('#counterItem').innerHTML = `${countItems(res.meals)} items.`;

      const openModal = (e) => {
        const currentCommentBtn = e.target;
        const { id } = currentCommentBtn.parentNode;
        const modalHeader = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');
        modalHeader.innerHTML = 'LOADING ...';
        modalBody.innerHTML = '';
        const displayComments = (comments) => {
          if (!comments.length) return 'There are no comments yet';
          return `${comments.map((item) => `<li><span class="fw-bold">${item.creation_date}</span> <span class="text-decoration-underline">${item.username}:</span> ${item.comment}</li>`).join('')}`;
        };

        getComments(id).then((commentsList) => {
          getMealDetails(id).then((res) => {
            modalHeader.innerHTML = res.strMeal;
            modalBody.innerHTML = `
          <img src="${res.strMealThumb}" alt="${res.strMeal}" class="w-100">
          <div class="d-flex flex-column">
            <h5 class="modal-category">Category: <span class="fw-light modal-cat">${res.strCategory}</span></h5>
            <h5 class="modal-category">Country: <span class="fw-light modal-cat">${res.strArea}</span></h5>
            <h5 class="modal-category">Tags: <span class="fw-light modal-cat">${res.strTags}</span></h5>
          </div>
          <p>${res.strInstructions}</p>
          <h6 class="fw-bold">Comments (${countComments(commentsList)})</h6>
          <ul id="comments-list">
              ${displayComments(commentsList)}
          </ul>
          `;
          });
        });
      };

      const commentBtns = document.querySelectorAll('.comment-btn');
      const likeBtns = document.querySelectorAll('.like-btn');
      const likeFunc = (e) => {
        const currentLikeBtn = e.target;
        const { id } = currentLikeBtn.parentNode.parentNode.parentNode;
        const numberLikes = currentLikeBtn.parentNode.lastElementChild;
        numberLikes.innerHTML = `${
          +numberLikes.innerHTML.split('')[0] + 1
        } likes`;
        currentLikeBtn.classList.replace('fa-regular', 'fa-solid');
        sendLike(id);
        currentLikeBtn.removeEventListener('click', likeFunc);
      };

      for (let i = 0; i < commentBtns.length; i += 1) {
        commentBtns[i].addEventListener('click', openModal);
        likeBtns[i].addEventListener('click', likeFunc);
      }
    });
  });
};

export default showMealList;