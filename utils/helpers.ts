export function dateFormater(date: number) {
  const _dateObj = new Date(date);
  const year = _dateObj.getFullYear();
  const month = _dateObj.getMonth() + 1;
  const _date = _dateObj.getDate();

  const hour = _dateObj.getHours();
  const minutes = _dateObj.getMinutes();

  const formatedDate = `${getMonth(month)} ${_date}, ${year}`;
  const formattedTime = formatTime(hour);
  const _minutes = minutes < 10 ? `0${minutes}` : minutes;
  return {
    date: formatedDate,
    time: `${formattedTime.formatted}:${_minutes} ${formattedTime.sup}`,
  };
}

export function truncate(hash: string) {
  if (hash.length > 20) {
    const _hash = `${hash}`.slice(0, 10);
    return `${_hash}...${hash.slice(55)}`;
  }
  return hash;
}

function formatTime(hours: number) {
  let _hours = hours > 12 ? hours - 12 : hours;
  return {
    formatted: _hours,
    sup: hours > 12 ? "pm" : "am",
  };
}

function getMonth(_month: number) {
  switch (_month) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "Jan";
  }
}
