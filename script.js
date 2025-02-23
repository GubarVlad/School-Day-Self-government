// Функция преобразования числа в слова
function numberToWords(num) {
    const ones = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
    const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семьнадцать", "восемнадцать", "девятнадцать"];
    const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
    const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестсот", "семьсот", "восемьсот", "девятьсот"];

    if (num === 0) return "ноль";

    let word = '';
    let hundredsPlace = Math.floor(num / 100);
    let tensPlace = Math.floor((num % 100) / 10);
    let onesPlace = num % 10;

    if (hundredsPlace > 0) word += hundreds[hundredsPlace] + ' ';
    if (tensPlace > 1) {
      word += tens[tensPlace] + ' ';
      if (onesPlace > 0) word += ones[onesPlace] + ' ';
    } else if (tensPlace === 1) {
      word += teens[onesPlace] + ' ';
    } else {
      if (onesPlace > 0) word += ones[onesPlace] + ' ';
    }

    return word.trim();
  }

  // Функция для склонения слов (день, час, минута)
  function declension(number, wordType) {
    const declensions = {
      day: ['день', 'дня', 'дней'],
      hour: ['час', 'часа', 'часов'],
      minute: ['минута', 'минуты', 'минут'],
      second: ['секунда', 'секунды', 'секунд']
    };

    let form = 0; // 0 - единственное число, 1 - от 2 до 4, 2 - остальные

    // Выделим последнюю цифру и последние две для проверки
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    // Общая логика для большинства слов
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      form = 2;
    } else {
      if (lastDigit === 1) form = 0;
      else if (lastDigit >= 2 && lastDigit <= 4) form = 1;
      else form = 2;
    }

    return declensions[wordType][form];
  }

  // Дата события
  const eventDate = new Date("2025-03-09T00:00:00");

  function updateTimer() {
    const now = new Date();
    const diff = eventDate - now;

    // Если событие уже наступило
    if (diff <= 0) {
      document.querySelector(".timer").innerHTML = "День Самоуправления 2025 начинается!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Преобразуем числа в слова
    document.getElementById("days").textContent = numberToWords(days);
    document.getElementById("days-word").textContent = declension(days, 'day');

    document.getElementById("hours").textContent = numberToWords(hours);
    document.getElementById("hours-word").textContent = declension(hours, 'hour');

    document.getElementById("minutes").textContent = numberToWords(minutes);
    document.getElementById("minutes-word").textContent = declension(minutes, 'minute');

    // Для секунд оставляем обычное число или тоже переводим в слова
    // Ниже пример, если хотите тоже в слова, замените на numberToWords(seconds)
    document.getElementById("second").textContent = seconds;
    document.getElementById("seconds-word").textContent = declension(seconds, 'second');
  }

  setInterval(updateTimer, 1000);
updateTimer();