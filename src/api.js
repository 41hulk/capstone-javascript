
const getMealsList = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
  const mealsList = await response.json();
  return mealsList;
};

export default getMealsList;