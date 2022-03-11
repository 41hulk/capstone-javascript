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

export { getMealsList, getMealDetails };