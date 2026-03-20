const convertSunsetAndSunrise = (timeStr) => {
  const parts = timeStr.split(" ");
  const time = parts[0].split(":");
  const amPm = parts[1];
  
   let hours = parseInt(time[0], 10);
  if(amPm === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  const minutes = parseInt(time[1], 10);

  //Add 0 if hours is less than 10
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

return `${formattedHours}:${formattedMinutes}`;
};
export default convertSunsetAndSunrise;
