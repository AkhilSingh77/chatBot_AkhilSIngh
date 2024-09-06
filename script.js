let time;
let wind;
let temperature;
let weatherStatus;
let inputData;
let saveId;
let showDetail;
let isCity = true;
let alreadySearched = false;
let currentCityName;

async function callApi(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=66994ba9a9d0ad6d2d9d878fc92faf52&units=metric`
  );

  if (!response.ok) {
    console.log("not ");
    isCity = false;

    searchEnable(city);
  } else {
    const data = await response.json();
    isCity = true;
    alreadySearched = true;
  

    temperature = `${data.main.temp} °C`;

    wind = `${data.wind.speed} m/s `;

    time = new Date(data.dt * 1000).toLocaleTimeString();

    weatherStatus = data.weather[0].description;
    inputElement.disabled = true;
    currentCityName = city;
    searchEnable(city);
  }
}

const croosIcon = document.querySelector(".icon--cross");
const mainTop = document.querySelector(".section__main__top");
const sectionMainElement = document.querySelector(".section__main");
const messageImage = document.querySelector(".section__main--img");
const mainChatbox = document.querySelector(".section__chatbox");
const temperatureTagElement = document.querySelector(".temptime__temp");
const timeTagElement = document.querySelector(".temptime__time");
const weatherTagElement = document.querySelector(".middle__bottom__weather");
const crossIconMain = document.querySelector(".top__right--cross");

const allTagElement = document.querySelectorAll(".tag");

const middleMessageElement = document.querySelector(".middle__message");
const middleBottomEelement = document.querySelector(".middle__bottom");
const midddleElement = document.querySelector(".middle");
const inputElement = document.querySelector(".inputBox--input");
const searchElement = document.querySelector(".inputBox--search");
inputElement.disabled = true;

inputElement.addEventListener("input", () => {
  inputData = inputElement.value.trim();
});
inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    callApi(inputData);
    inputElement.value = "";
  }
});

croosIcon.addEventListener("click", () => {
  mainTop.classList.add("hideIcon");
});

crossIconMain.addEventListener("click", () => {
  // mainChatbox.classList.toggle("showIcon");

  mainChatbox.classList.remove("transition-sectionMainElementUP");
  sectionMainElement.classList.remove("transition-sectionMainElement");
  // middleMessageElement.textContent ='';
  alreadySearched = false;

  isCity = true;
  mainTop.classList.remove("hideIcon");
});

messageImage.addEventListener("click", () => {
  // mainChatbox.classList.toggle("showIcon");
  mainChatbox.classList.add("transition-sectionMainElementUP");
  sectionMainElement.classList.toggle("transition-sectionMainElement");
});

searchElement.addEventListener("click", () => {
  if (inputElement.value !== "") {
    callApi(inputData);
    inputElement.value = "";
  }
});

allTagElement.forEach((single) => {
  single.addEventListener("click", (e) => {
    middleBottomEelement.classList.toggle("displayNone");
    showDetail = e.target.id;
    searchEnable(e.target.id);
    midddleElement.scrollTop = midddleElement.scrollHeight;
    inputElement.disabled = false;

  });
});

function searchEnable(id) {
  const middleMessageInput = document.createElement("div");
  middleMessageInput.classList.add("middle__message__input");

  const youParagraph = document.createElement("p");
  youParagraph.classList.add("middle__message__input--you");
  youParagraph.textContent = "You";

  const tempDiv = document.createElement("div");
  tempDiv.classList.add("middle__message__input--temp");
  if (id === "temperature") {
    tempDiv.textContent = "🌡️ Temperature";
  } else if (id === "time") {
    tempDiv.textContent = "🕛 Time";
  } else if (id === "weather") {
    tempDiv.textContent = "⛅ Weather Status";
  } else if (id === "wind") {
    tempDiv.textContent = "🎐Wind Speed";
  } else {
    tempDiv.textContent = id;
  }

  middleMessageInput.appendChild(youParagraph);
  middleMessageInput.appendChild(tempDiv);

  const middleMessageChatMssge = document.createElement("div");
  middleMessageChatMssge.classList.add("middle__message__chatMssge");

  const chatwithImageDiv = document.createElement("div");
  chatwithImageDiv.classList.add("chatwithImage");

  const chatImage = document.createElement("img");
  chatImage.src = "https://calm-elf-974df4.netlify.app/images/chat-icon.png";
  chatImage.alt = "";
  chatImage.classList.add("chatwithImage--image");

  const chatParagraph = document.createElement("p");
  chatParagraph.classList.add("chatwithImage--chat");
  chatParagraph.textContent = "ChatBot";

  chatwithImageDiv.appendChild(chatImage);
  chatwithImageDiv.appendChild(chatParagraph);

  const detailDiv = document.createElement("div");
  detailDiv.classList.add("detail");

  middleMessageChatMssge.appendChild(chatwithImageDiv);
  if (
    id === "temperature" ||
    id === "time" ||
    id === "weather" ||
    id === "wind"
  ) {
    console.log("alreadySearched", alreadySearched);
    if (!alreadySearched) {
      detailDiv.textContent =
        "Please enter your city name in the typing area! 😊";
      middleMessageChatMssge.appendChild(detailDiv);
    } else {
     
      isss(
        isCity,
        detailDiv,
        middleMessageChatMssge,
        id,
        chatwithImageDiv,
        chatImage,
        chatParagraph
      );
    }
  } else {
    
    isss(
      isCity,
      detailDiv,
      middleMessageChatMssge,
      id,
      chatwithImageDiv,
      chatImage,
      chatParagraph
    );
  }

  middleMessageElement.appendChild(middleMessageInput);
  middleMessageElement.appendChild(middleMessageChatMssge);
  midddleElement.scrollTop = midddleElement.scrollHeight;
}

function createInformation() {
  const middleChatMssge = document.createElement("div");
  middleChatMssge.classList.add("middle__message__chatMssge");

  const topHeadElement = document.createElement("div");
  topHeadElement.classList.add("middle__top--head2");
  topHeadElement.textContent = "What information are you looking for? ";

  const middleBottom = document.createElement("div");
  middleBottom.classList.add("middle__bottom");

  const temptimeDiv = document.createElement("div");
  temptimeDiv.classList.add("middle__bottom__temptime", "temptime");

  const tempDiv = document.createElement("div");
  tempDiv.classList.add("temptime__temp", "tag", "second-tag");
  tempDiv.id = "temperature";
  tempDiv.textContent = "🌡️ Temperature";

  const timeDiv = document.createElement("div");
  timeDiv.classList.add("temptime__time", "tag", "second-tag");
  timeDiv.id = "time";
  timeDiv.textContent = "🕛 Time";

  temptimeDiv.appendChild(tempDiv);
  temptimeDiv.appendChild(timeDiv);

  const windDiv = document.createElement("div");
  windDiv.classList.add("middle__bottom__wind", "tag", "second-tag");
  windDiv.id = "wind";
  windDiv.textContent = "🎐 Wind Speed";

  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add("middle__bottom__weather", "tag", "second-tag");
  weatherDiv.id = "weather";
  weatherDiv.textContent = "⛅ Weather Status";

  middleBottom.appendChild(temptimeDiv);
  middleBottom.appendChild(windDiv);
  middleBottom.appendChild(weatherDiv);
  middleChatMssge.appendChild(topHeadElement);

  middleChatMssge.appendChild(middleBottom);
  middleMessageElement.appendChild(middleChatMssge);
  midddleElement.scrollTop = midddleElement.scrollHeight;

  const secondTag = document.querySelectorAll(".second-tag");
  secondTag.forEach((single) => {
    single.addEventListener("click", (e) => {
      console.log("single");
      (isCity = true), (showDetail = e.target.id);
      searchEnable(e.target.id);
      midddleElement.scrollTop = midddleElement.scrollHeight;
      inputElement.disabled = false;
    });
  });
}

function isss(
  isCity,
  detailDiv,
  middleMessageChatMssge,
  id,
  chatwithImageDiv,
  chatImage,
  chatParagraph
) {
  if (isCity) {
    const detailSecondDiv = document.createElement("div");
    detailSecondDiv.classList.add("detail");

    if (showDetail === "temperature") {
      detailSecondDiv.textContent = temperature;
    } else if (showDetail === "time") {
      detailSecondDiv.textContent = time;
    } else if (showDetail === "weather") {
      detailSecondDiv.textContent = weatherStatus;
    } else if (showDetail === "wind") {
      detailSecondDiv.textContent = wind;
    }
    detailDiv.textContent = "Looking for something Else";

    const allButtonsDiv = document.createElement("div");
    allButtonsDiv.classList.add("allbuttons");

    const yesButton = document.createElement("button");
    yesButton.classList.add("allbuttons--yes", "singleButton");
    yesButton.textContent = "Yes";
    yesButton.addEventListener("click", () => {
      const middleMessageChatMssge = document.createElement("div");
      middleMessageChatMssge.classList.add("middle__message__chatMssge");

      const chatwithImageDiv = document.createElement("div");
      chatwithImageDiv.classList.add("chatwithImage");

      const chatImage = document.createElement("img");
      chatImage.src =
        "https://calm-elf-974df4.netlify.app/images/chat-icon.png";
      chatImage.alt = "";
      chatImage.classList.add("chatwithImage--image");

      const chatParagraph = document.createElement("p");
      chatParagraph.classList.add("chatwithImage--chat");
      chatParagraph.textContent = "ChatBot";

      chatwithImageDiv.appendChild(chatImage);
      chatwithImageDiv.appendChild(chatParagraph);

      const detailDiv = document.createElement("div");
      detailDiv.classList.add("detail");
      if (alreadySearched) {
        detailDiv.textContent = `${currentCityName} or Any other City?`;
      } else {
        detailDiv.textContent = `${id} or Any other City?`;
      }

      const allButtonsDiv = document.createElement("div");
      allButtonsDiv.classList.add("allbuttons");

      const yesButton = document.createElement("button");
      yesButton.classList.add("allbuttons--yes", "singleButton");

      if (alreadySearched) {
        yesButton.textContent = `${currentCityName}`;
      } else {
        yesButton.textContent = `${id}`;
      }
      yesButton.addEventListener("click", () => {
        allButtonsDiv.classList.toggle("displayNone");
        createInformation();
        inputElement.disabled = true;
      });

      const noButton = document.createElement("button");
      noButton.classList.add("allbuttons--no", "singleButton");
      noButton.textContent = "Other";
      noButton.addEventListener("click", () => {
        alreadySearched = false;
        isCity = true;
        createInformation();

        midddleElement.scrollTop = midddleElement.scrollHeight;
        inputElement.disabled = false;
      });

      allButtonsDiv.appendChild(yesButton);
      allButtonsDiv.appendChild(noButton);

      middleMessageChatMssge.appendChild(chatwithImageDiv);
      middleMessageChatMssge.appendChild(detailDiv);
      middleMessageChatMssge.appendChild(allButtonsDiv);
      middleMessageElement.appendChild(middleMessageChatMssge);
      midddleElement.scrollTop = midddleElement.scrollHeight;
    });

    const noButton = document.createElement("button");
    noButton.classList.add("allbuttons--no", "singleButton");
    noButton.textContent = "No";
    noButton.addEventListener("click", () => {
      chatwithImageDiv.appendChild(chatImage);
      chatwithImageDiv.appendChild(chatParagraph);
      const detailDiv = document.createElement("div");
      detailDiv.classList.add("detail");
      detailDiv.textContent = `Thank You! 😊`;
      const buttonElement = document.createElement("button");
      buttonElement.textContent = "Start the Chat again";
      buttonElement.classList.add("startagain");
      buttonElement.addEventListener("click", () => {
        middleMessageElement.innerHTML = "";
        middleBottomEelement.classList.toggle("displayNone");
        alreadySearched = false;
        isCity = true;
        inputElement.disabled = true;
      });

      middleMessageChatMssge.appendChild(chatwithImageDiv);
      middleMessageChatMssge.appendChild(detailDiv);
      middleMessageChatMssge.appendChild(buttonElement);
      midddleElement.scrollTop = midddleElement.scrollHeight;
    });

    allButtonsDiv.appendChild(yesButton);
    allButtonsDiv.appendChild(noButton);

    middleMessageChatMssge.appendChild(detailSecondDiv);

    middleMessageChatMssge.appendChild(detailDiv);

    middleMessageChatMssge.appendChild(allButtonsDiv);
  } else {
    detailDiv.textContent = "Please enter a valid city Name";
    middleMessageChatMssge.appendChild(detailDiv);
  }
  midddleElement.scrollTop = midddleElement.scrollHeight;
}
