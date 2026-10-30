// Author: Abhay Pratap Singh
// JS Assignment 1 (Lecture 1-3)
// Question 5: Weather Activity Planner

// Function to recommend an activity based on weather conditions
function getWeatherActivity(temperature, isRaining, windSpeed) {
  // Check if it is raining first
  if (isRaining) {
    return "Stay indoors with hot coffee.";
  } 
  // Hot weather check
  else if (temperature > 35) {
    return "Go swimming.";
  } 
  // Severe cold and windy check using logical AND (&&)
  else if (temperature < 15 && windSpeed > 20) {
    return "Too cold and windy — stay home.";
  } 
  // Comfortable pleasant weather
  else {
    return "Perfect day for a walk.";
  }
}

// Additional combined logical evaluation check (|| and &&)
function isBadWeather(temperature, isRaining, windSpeed) {
  // Returns true if raining OR both too cold and windy
  return isRaining || (temperature < 15 && windSpeed > 20);
}

console.log("=== Question 5: Weather Activity Planner ===\n");

// Test cases covering all required conditions
const weatherScenarios = [
  { temp: 22, raining: true,  wind: 10, label: "Rainy day" },
  { temp: 38, raining: false, wind: 12, label: "Hot summer afternoon" },
  { temp: 10, raining: false, wind: 28, label: "Cold and stormy wind" },
  { temp: 12, raining: false, wind: 15, label: "Chilly but calm wind" },
  { temp: 24, raining: false, wind: 8,  label: "Pleasant spring day" }
];

weatherScenarios.forEach((s) => {
  const recommendation = getWeatherActivity(s.temp, s.raining, s.wind);
  const badWeatherFlag = isBadWeather(s.temp, s.raining, s.wind);

  console.log(`Condition : ${s.label}`);
  console.log(`Weather   : Temp = ${s.temp}°C, Raining = ${s.raining}, Wind Speed = ${s.wind} km/h`);
  console.log(`Advice    : "${recommendation}"`);
  console.log(`Severe/Indoor Weather Alert: ${badWeatherFlag ? "YES" : "NO"}`);
  console.log("---------------------------------------------------------------");
});

