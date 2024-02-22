const dayToStrHash = {
  0: "Вс",
  1: "Пн",
  2: "Вт",
  3: "Ср",
  4: "Чт",
  5: "Пт",
  6: "Сб",
};

function formatTimeNumber(n) {
  return n > 9 ? `${n}` : `0${n}`;
}

export default function (date) {
  const h = formatTimeNumber(date.getHours());
  const m = formatTimeNumber(date.getMinutes());
  const dayToStr = dayToStrHash[date.getDay()];

  return `${dayToStr}, ${h}:${m}`;
}
