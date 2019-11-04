//getting the last url added to the localBookmarks object
let localBookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
let lastBookmark = localBookmarks[localBookmarks.length - 1];


let submissionContainer = document.querySelector(".submission-container");
let returnButton = document.querySelector(".return-button");
let tagForm = document.querySelector(".tag-form");
let tagInput = document.querySelector(".tag-input");

let bookmarkUrl = document.createElement("h2");
bookmarkUrl.innerHTML = lastBookmark["url"]+ " has been added to your bookmarks!";
submissionContainer.insertBefore(bookmarkUrl, tagForm);



returnButton.addEventListener("click", function(e) {
    e.preventDefault();
    tagArray = tagInput.value.trim().split(" ");
    localBookmarks[localBookmarks.length - 1].tags = tagArray;
    window.localStorage.setItem("bookmarks", JSON.stringify(localBookmarks));
    window.location.href = "index.html";
})

