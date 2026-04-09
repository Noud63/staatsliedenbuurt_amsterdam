const convertTime = (unixTime) => {
  let date = new Date(unixTime * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let time = hours + ":" + minutes.slice(-2);

  if (hours < 10) {
    time = "0" + hours + ":" + minutes.slice(-2);
  }

  return time;
}

export default convertTime
