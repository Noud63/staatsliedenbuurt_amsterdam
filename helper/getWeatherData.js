import convertTime from "./convertTime";
const location = "Amsterdam";
const KEY = process.env.NEXT_PUBLIC_WEATHERREPORT_API_KEY;

const getWeatherData = async () => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&lang=nl&units=metric&appid=${KEY}`,
    );

    const result = await res.json();

    const { list, city } = result;
    // console.log("City:", city)

    let data = {
      date: list[0].dt_txt,
      update: list[1].dt_txt,
      temp: list[0].main.temp.toFixed(),
      tempMax: list[0].main.temp_max.toFixed(),
      tempMin: list[0].main.temp_min.toFixed(),
      humidity: list[0].main.humidity,
      city: city.name,
      description: list[0].weather[0].description,
      icon: `https://openweathermap.org/img/w/${list[0].weather[0].icon}.png`,
      wind: list[8].wind.speed.toFixed(),
      pressure: list[0].main.pressure,
      feels_like: list[0].main.feels_like,
      visibility: list[0].visibility,
      sunrise: convertTime(city.sunrise),
      sunset: convertTime(city.sunset),
    };

    let data2 = {
      date: list[8].dt_txt,
      temp: list[8].main.temp.toFixed(),
      tempMax: list[8].main.temp_max.toFixed(),
      tempMin: list[8].main.temp_min.toFixed(),
      humidity: list[8].main.humidity,
      city: city.name,
      description: list[8].weather[0].description,
      icon: `https://openweathermap.org/img/w/${list[8].weather[0].icon}.png`,
      wind: list[8].wind.speed.toFixed(),
      pressure: list[8].main.pressure,
      feels_like: list[8].main.feels_like,
      visibility: list[8].visibility,
      sunrise: convertTime(city.sunrise),
      sunset: convertTime(city.sunset),
    };

    // console.log("Weather:", data)

    return { data, data2, result };
  } catch (error) {
    console.log(error);
  }
};

export default getWeatherData;
