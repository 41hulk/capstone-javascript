const likesUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BnjmjUJJQAhlumcZxnbj/likes/';
const header = new Headers({ 'Content-type': 'application/json; charset=UTF-8' });

const getMealsList = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=French');
  const mealsList = await response.json();
  return mealsList;
};

const getMealDetails = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const mealDetails = await response.json();
  return mealDetails.meals[0];
};

const getLikes = async () => {
  const response = await fetch(likesUrl);
  const likesList = await response.json().catch(() => false);
  if (!likesList) return false;
  const likesObj = {};
  likesList.forEach((item) => {
    likesObj[item.item_id] = item.likes;
  });
  return likesObj;
};

const sendLike = (id) => {
  fetch(likesUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
    }),
    headers: header,
  });
};

const getComments = async (id) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BnjmjUJJQAhlumcZxnbj/comments?item_id=${id}`);
  if (!response.ok) return [];
  const commentsList = await response.json().catch(() => false);
  if (!commentsList) return [];
  return commentsList;
};

export {
  getMealsList, getMealDetails, getLikes, getComments, sendLike,
};