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
let filterInput = document.querySelector(".filter-input");
filterInput.addEventListener("input", filterBookmarks);

// When the page loads, it will start on the first page of bookmarks.
retreiveBookmarks(1);

// clears all existing <li> in bookmarksList and creates 20 new items with data from localBookmarks
// takes an array of bookmarks as an argument
// defaults to whole localBookmarks object but can pass it a sorted/filtered array.
function retreiveBookmarks(e, bookmarks = localBookmarks) {
    let page_num;
    if (e === 1) {
        page_num = 1
    } else {
        page_num = e.target.value;
    }
    //these variables are used to determine which items are pulled from localBookmarks.
    //slicing into the array means that if there are not 20 links to display, it will only display the correct number of items.
    let start_index = (page_num-1)*10;
    let end_index = start_index + bookmarks.slice(start_index, start_index + 20).length;
    while (bookmarksList.hasChildNodes()) {
        bookmarksList.removeChild(bookmarksList.lastChild);
    };
    for (let i = start_index; i < end_index; i++) {
        buildListElement(i, bookmarks);
    };
    addPageNumbers(page_num, bookmarks);
};

function buildListElement(i, bookmarks) {
    // building the html elements to display the new bookmark
    let url = bookmarks[i]["url"]
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
    //adding the event listeners for the edit button
    newDeleteButton.addEventListener("click", editBookmark);
    newDiv.appendChild(newEditButton);
    // let tagButtons = generateTags()
    

};

function addBookmark(e) {
    e.preventDefault();
    let url = form.url.value;
    let isValid = urlValidator(url);
    console.log(isValid)
    if (! urlValidator(url)[0]) {
        alert("Please enter a valid url");
    } else {
        let new_bookmark = {}
        new_bookmark.url = isValid[1];
        new_bookmark.tags = [];
        new_bookmark.time = new Date();
        localBookmarks.push(new_bookmark);
        window.localStorage.setItem("bookmarks", JSON.stringify(localBookmarks));
        window.location.href = "results.html";
    }
    
}

function removeBookmark(e) {
    localBookmarks.splice(e.target.id, 1);
    window.localStorage.setItem("bookmarks", JSON.stringify(localBookmarks));
    location.reload();
}

function editBookmark(e) {
    
}

function urlValidator(url) {
    //using regex to check if URL syntax is valid
    if (!/^http[s]?\:\/\//.test(url)) {
        url = 'https://' + url;
    };
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    //ensuring that the link has http protocol specified
    
    // currently getting cross-origin error due to Same-Origin policy
    // could implement further checks to validate whether url exists here

    // request = new XMLHttpRequest();
    // request.onreadystatechange = function() {
    //     console.log(request.readyState);
    //     if (request.readyState === 4) {
    //         return true
    //     };
    // };
    // request.open("GET", url);
    // request.send();
    return [pattern.test(url), url];
}

function addPageNumbers(page_num, bookmarks) {
    let pageNumContainer = document.querySelector(".page-numbers")
    while (pageNumContainer.hasChildNodes()) {
        pageNumContainer.removeChild(pageNumContainer.lastChild);
    };
    numPages = Math.ceil(bookmarks.length/10)
    for (let i = 1; i <= numPages; i++) {
        pageButton = document.createElement("button");
        pageButton.className = "page-button";
        pageButton.innerHTML = i;
        pageButton.setAttribute("value", i);
        if (i == page_num) {
            pageButton.style.borderWidth = "5px";
        }
        pageButton.addEventListener("click", retreiveBookmarks);
        pageNumContainer.appendChild(pageButton);
    };
};

function filterBookmarks(e) {
    console.log(e);
    if (tag.length === 0) {
        retreieveBookmarks(1,localBookmarks);
    }
    filteredBookmarks = localBookmarks.filter(function(bookmark) {
        tags = bookmark["tags"]
        if (tags.length ===  0 ) {
            return false
        } else {
            return tags.contains(tag);
        };
    });
    retreiveBookmarks(1, filteredBookmarks);
}