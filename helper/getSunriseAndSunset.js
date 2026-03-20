
const latitude = 52.377956;
const longitude = 4.89707;
const now = new Date()
const today = now.toISOString().slice(0, 10);
const tomorrow = new Date(now); // Create a copy of the current date
tomorrow.setDate(now.getDate() + 1); // Increment the day by 1
const nextDay = tomorrow.toISOString().slice(0, 10);
const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=CET&date_start=${today}&date_end=${nextDay}`;
// const url2 = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=CET&date_start=2024-12-23&date_end=2024-12-31`;

const getSunriseAndSunset = async () => {
    const res = await fetch(url);
    const data = await res.json()
    // console.log(data)
    return data
};

export default getSunriseAndSunset;
