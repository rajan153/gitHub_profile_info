// const requestUrl = "https://api.github.com/users/rajan153";
const imageSection = document.getElementById("imageSection");
const nameSection = document.getElementById("nameSection");
const followersSection = document.getElementById("followersSection");
const idDisplaySection = document.getElementById("idDisplaySection");
const usernameSection = document.getElementById("usernameSection");
const inputUrl = document.getElementById("txt");
const formSection = document.querySelector("form");
const warning = document.getElementById("warning");

formSection.addEventListener("submit", (e) => {
  e.preventDefault();
  startFunction();
});

// Searching Function or Checking Function
function startFunction() {
  if (inputUrl.value === "" || !isNaN(inputUrl.value)) {
    warning.style.display = "block";
    warning.innerHTML = "Enter the current Value !!!";
    inputUrl.value = "";
  } else {
    warning.style.display = "none";
    const url = inputUrl.value;
    inputUrl.value = "";

    const newURL = url.slice(19);
    const requestUrl = `https://api.github.com/users/${newURL}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", requestUrl);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const data = JSON.parse(this.responseText);

        // Varibales

        const img = data.avatar_url;
        const gitHubProfileName = data.name;
        const gitHubProfileFollowers = data.followers;
        const gitHubProfileId = data.id;
        const getElementByUserName = data.login;

        // Calls Functions

        createImg(img);
        getName(gitHubProfileName);
        getFollowers(gitHubProfileFollowers);
        getId(gitHubProfileId);
        getUserName(getElementByUserName);
      }
    };
    xhr.send();
  }
}

// Creating Image Tag
const img = document.createElement("img");
function createImg(link) {
  img.src = link;
  img.style.width = "150px";
  img.style.height = "150px";
  img.style.border = "solid black";
  img.style.borderRadius = "50%";
  img.style.marginTop = "-0.2rem";
  img.style.marginLeft = "-0.1rem";
  imageSection.append(img);
}

// Creating Username FUnction
function getUserName(getElementByUserName) {
  usernameSection.innerHTML = `username:- ${getElementByUserName}`;
}

// Creating Name function
function getName(gitHubProfileName) {
  nameSection.innerHTML = `Name:- ${gitHubProfileName}`;
}

// Creating Followers Functions
function getFollowers(gitHubProfileFollowers) {
  followersSection.innerHTML = `Followers:- ${gitHubProfileFollowers}`;
}

//  Creating Id Function
function getId(gitHubProfileId) {
  idDisplaySection.innerHTML = `id:- ${gitHubProfileId}`;
}
