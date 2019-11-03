// creates a bookmarks localStorage object if none exists
if (window.localStorage.getItem("bookmarks") === null) {
    window.localStorage.setItem("bookmarks", JSON.stringify([]));
    bookmarks = window.localStorage.getItem("bookmarks");
}
// parsing the object in local storage and saving it under bookmarks variable
let localBookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));

let bookmarksList = document.querySelector(".bookmarks-list");
let form = {};
form.url = document.querySelector(".url-input");
form.submitButton = document.querySelector(".url-submit");
form.submitButton.addEventListener("click", addBookmark);

// When the page loads, it will start on the first page.
retreiveBookmarks(1);

// clears all existing <li> in bookmarksList and creates 20 new items with data from localBookmarks
function retreiveBookmarks(page_num) {
    //these variables are used to determine which items are pulled from localBookmarks.
    //slicing into the array means that if there are not 20 links to display, it will only display the correct number of items.
    let start_index = (page_num-1)*10;
    let end_index = start_index + localBookmarks.slice(start_index, start_index + 20).length;
    while (bookmarksList.hasChildNodes()) {
        bookmarksList.removeChild(bookmarksList.lastChild);
    };
    for (let i = start_index; i < end_index; i++) {
        buildListItem(i);
    };
};

function buildListItem(i) {
    // building the html elements to display the new bookmark
    let url = localBookmarks[i]["url"]
    newListItem = document.createElement("li");
    newDiv = document.createElement("div");
    newDiv.className = "bookmarks-list-item";
    newAnchor = document.createElement("a");
    newAnchor.setAttribute("href", url);
    newAnchor.setAttribute("target", "_blank");
    newAnchor.innerHTML = url;
    newDiv.appendChild(newAnchor);
    newListItem.appendChild(newDiv);
    bookmarksList.appendChild(newListItem);
    newDeleteButton = document.createElement("button");
    newDeleteButton.className = "delete-button ";
    newDeleteButton.id = i;
    newDeleteButton.innerHTML = "Remove";
    //adding the event listeners for the remove button
    newDeleteButton.addEventListener("click", removeBookmark);
    newDiv.appendChild(newDeleteButton);
    newEditButton = document.createElement("button");
    newEditButton.className = "list-button";
    newEditButton.innerHTML = "Edit";
    newDiv.appendChild(newEditButton);
    

};

function addBookmark(e) {
    e.preventDefault();
    let url = form.url.value;
    if (! urlValidator(url)) {
        console.log("Please enter a valid url.")
    } else {
        let new_bookmark = {}
        new_bookmark.url = url;
        new_bookmark.tags = [];
        new_bookmark.time = new Date();
        localBookmarks.push(new_bookmark);
        window.localStorage.setItem("bookmarks", JSON.stringify(localBookmarks));
    }
    window.location.href = "results.html";
}

function removeBookmark(e) {
    localBookmarks.splice(e.target.id, 1);
    window.localStorage.setItem("bookmarks", JSON.stringify(localBookmarks));
    location.reload();
}

function urlValidator(e) {
    return true
}

