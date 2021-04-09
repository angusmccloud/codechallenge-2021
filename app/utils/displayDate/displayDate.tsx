const displayDate = (inputDate: Date): string => {
  let hours = inputDate.getHours();
  let minutes = inputDate.getMinutes().toString();
  let ampm = 'am';
  if (hours === 12) {
    ampm = 'pm';
  } else if (hours > 12) {
    hours -= 12;
    ampm = 'pm';
  } else if (hours === 0) {
    hours = 12;
  }
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}${ampm}`;
};
export default displayDate;
