var localBookmarks=JSON.parse(window.localStorage.getItem("bookmarks")),lastBookmark=localBookmarks[localBookmarks.length-1],submissionContainer=document.querySelector(".submission-container"),returnButton=document.querySelector(".return-button"),tagForm=document.querySelector(".tag-form"),tagInput=document.querySelector(".tag-input"),bookmarkUrl=document.createElement("h2");bookmarkUrl.innerHTML=lastBookmark.url+" has been added to your bookmarks!";submissionContainer.insertBefore(bookmarkUrl,tagForm);
returnButton.addEventListener("click",function(a){a.preventDefault();tagArray=tagInput.value.trim().split(" ");localBookmarks[localBookmarks.length-1].tags=tagArray;window.localStorage.setItem("bookmarks",JSON.stringify(localBookmarks));window.location.href="index.html"});
