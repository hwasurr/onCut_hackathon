function toSeconds(hms) {
  const a = hms.split(':'); // split it at the colons

  const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

  return seconds;
}

function toHHMMSS(seconds) {
  const date = new Date(null);
  date.setSeconds(seconds); // specify value for SECONDS here
  const result = date.toISOString().substr(11, 8);
  return result;
}

function addTime(first, howMuchSecond) {
  // 10 분 === 600
  const f = toSeconds(first);
  const addedTime = f + howMuchSecond;

  return toHHMMSS(addedTime);
}

export default { addTime };
