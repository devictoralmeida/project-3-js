import { getUserData } from "./requests.js";

const backButton = document.querySelector(".back_button");

const hasToken = () => {
  const localToken = localStorage.getItem("@diamond:token");
  if (!localToken) {
    window.location.href = "./index.html"
  }
};

const loadCard = async () => {
  const userId = localStorage.getItem("@diamond:user-id");
  const user = await getUserData(userId);

  if (user) {
    const pictureContainer = document.querySelector(".card__photo-container");
    const signatureContainer = document.querySelector(".card__left-container");
    const cardUserData = document.querySelector(".card__user-data");
    const characteristicsContainer = document.querySelector(
      ".card__user-characteristics"
    );

    const userPhoto = document.createElement("img");
    userPhoto.src = user.image;
    userPhoto.setAttribute(
      "alt",
      `Foto de perfil do usuário ${user.firstName} ${user.lastName}`
    );
    userPhoto.classList.add("card__user-photo");

    const userSignature = document.createElement("h2");
    userSignature.innerText = user.firstName + " " + user.lastName;
    userSignature.classList.add("card__signature");

    const idText = document.createElement("h3");
    idText.innerText = `ID: ${user.id}`;

    const userNameContainer = document.createElement("div");
    userNameContainer.classList.add("card__user-name");

    const addressContainer = document.createElement("div");
    addressContainer.classList.add("card__user-address");

    const userName = document.createElement("h2");
    userName.innerText = user.firstName;

    const lastName = document.createElement("h2");
    lastName.innerText = user.lastName;

    const address = document.createElement("p");
    address.innerText = user.address.address;

    const cityAndZip = document.createElement("p");
    cityAndZip.innerText = `${user.address.city}, ${user.address.postalCode}`;

    const sex = document.createElement("span");
    sex.classList.add("card__user-characteristic");
    sex.innerText = `Sex: ${user.gender}`;

    const hair = document.createElement("span");
    hair.classList.add("card__user-characteristic");
    hair.innerText = `Hair: ${user.hair.color}`;

    const eyes = document.createElement("span");
    eyes.classList.add("card__user-characteristic");
    eyes.innerText = `Eyes: ${user.eyeColor}`;

    const height = document.createElement("span");
    height.classList.add("card__user-characteristic");
    height.innerText = `Height: ${user.height}m`;

    const weight = document.createElement("span");
    weight.classList.add("card__user-characteristic");
    weight.innerText = `Weight: ${user.weight.toFixed(2)}kgs`;

    pictureContainer.append(userPhoto);

    signatureContainer.append(userSignature);

    userNameContainer.append(userName, lastName);
    addressContainer.append(address, cityAndZip);

    cardUserData.append(idText, userNameContainer, addressContainer);

    characteristicsContainer.append(sex, hair, eyes, height, weight);
  }
};

backButton.addEventListener("click", () => {
  localStorage.removeItem("@diamond:token");
  localStorage.removeItem("@diamond:user-id");
  open("../index.html", "_self");
});

hasToken();
loadCard();
