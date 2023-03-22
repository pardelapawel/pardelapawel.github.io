function overwriteLanguage(languageString) {
//   console.log(strings[languageString]);
  localStorage.setItem(langCookieKey, languageString);
  Object.entries(strings[languageString]).forEach(([elementId, text]) => {
    // console.log(elementId)
    // console.log(text)
    let fields = elementId.split("_"),
      attributeName = undefined;
    if (fields.length > 1) {
      attributeName = fields[0];
      elementId = fields[1];
    }
    let obj = document.getElementById(elementId);

    if (obj != undefined) {
      if (attributeName !== undefined) {
        obj.setAttribute(attributeName, text);
      } else {
        obj.textContent = text;
      }
    }
userLang = languageString
  });


  const theDate = new Date("June 10, 2023");
  const today = new Date();
  const diffTime = Math.abs(theDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let text = "";
  if (diffDays >= 0) {
    if (diffDays > 1) {
      text = {
        en: `in ${diffDays} days`,
        pl: `za ${diffDays} dni`,
        kr: `${diffDays} 일 후`,
      }[userLang];
    } else if (diffDays == 0) {
      text = { en: "today", pl: "dziś", kr: "오늘" }[userLang];
    } else {
      text = { en: "tomorrow", pl: "jutro", kr: "내일" }[userLang];
    }
  }
  document.getElementById("day-counter").innerHTML = text;

  window.addEventListener("scroll", () => {
    var header = document.querySelector("header");
    var scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
      /* Change 100 to the desired scroll position */
      header.classList.add("smaller");
    } else {
      header.classList.remove("smaller");
    }
  });
  Array.from(document.getElementsByClassName("lang")).forEach((elem) =>
    elem.classList.remove("active")
  );
  Array.from(document.getElementsByClassName(`lang ${languageString}`)).forEach(
    (elem) => elem.classList.add("active")
  );
}
