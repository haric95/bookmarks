//getting the last url added to the localBookmarks object
let localBookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
let lastUrl = localBookmarks[localBookmarks.length - 1]["url"]

let submissionContainer = document.querySelector(".submission-container");
let returnButton = document.querySelector(".return-button");


let thankYou = document.createElement("h2")
thankYou.innerHTML = lastUrl+ " has been added to your bookmarks!";
submissionContainer.appendChild(thankYou);

returnButton.addEventListener("click", function() {
    window.location.href = "index.html"
})




