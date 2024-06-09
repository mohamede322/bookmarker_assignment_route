var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteUrlInput = document.getElementById("siteUrl");
var bookmarksContainer = document.querySelector(".bookmarks");
var sumbitBtn = document.querySelector(".submit-btn");

var exitBtn = document.querySelector(".exit-btn");
var errorContainer = document.querySelector(".error-container");

var bookmarksList;

if (localStorage.getItem("bookmarks") == null) {
  bookmarksList = [];
} else {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
  displayData(bookmarksList);
}

var validForm = false;
sumbitBtn.addEventListener("click", addBookmark);
exitBtn.addEventListener("click", hideError);
errorContainer.addEventListener("click", (e) => {
  if (e.target.className.includes("error-container")) {
    hideError();
  }
});
bookmarkNameInput.addEventListener("keyup", () => {
  validate("name");
});
websiteUrlInput.addEventListener("keyup", () => {
  validate("url");
});

function hideError() {
  errorContainer.classList.add("d-none");
}
function showError() {
  errorContainer.classList.remove("d-none");
}

function setItemsToLocalStorage() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
}

function addBookmark() {
  if (validForm) {
    var bookmark = {
      id: bookmarksList.length,
      name: bookmarkNameInput.value,
      url: websiteUrlInput.value,
    };

    bookmarksList.push(bookmark);

    clearForm();
    displayData(bookmarksList);
    setItemsToLocalStorage();
  } else {
    showError();
  }
  validate("name");
  validate("url");
}

function displayData(dataArray) {
  var data = "";

  for (var i = 0; i < dataArray.length; i++) {
    data += `<tr class="text-center bg-light border-0 align-middle">
              <td class="p-3">${i + 1}</td>
              <td class="p-3">${dataArray[i].name}</td>
              <td class="p-3">
                <a class="btn btn-success visit-btn" href="//${
                  dataArray[i].url
                }" target="_blank">
                  <i class="fa-solid fa-eye pe-2"></i> Visit
                </a>
              </td>
              <td class="p-3">
                <button class="btn btn-danger delete-btn" onclick="deleteBookmark(${
                  dataArray[i].id
                })" >
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
              </td>
            </tr>`;
  }
  bookmarksContainer.innerHTML = data;
}
function deleteBookmark(id) {
  for (var i = 0; i < bookmarksList.length; i++) {
    if (bookmarksList[i].id == id) {
      bookmarksList.splice(i, 1);
    }
  }
  displayData(bookmarksList);
  setItemsToLocalStorage();
}

function clearForm() {
  bookmarkNameInput.value = null;
  websiteUrlInput.value = null;
}

function validate(target) {
  var regex = {
    name: /^[A-z0-9]{2,} ?([A-z0-9]{1,} ?){1,}(?<! )$/,
    url: /^[A-z0-9]{1,}\.[A-z]{2,5}(?<! )$/,
  };

  if (target == "name") {
    if (regex.name.test(bookmarkNameInput.value)) {
      bookmarkNameInput.classList.add("is-valid");
      bookmarkNameInput.classList.remove("is-invalid");
    } else {
      bookmarkNameInput.classList.remove("is-valid");
      bookmarkNameInput.classList.add("is-invalid");
    }
  }

  if (target == "url") {
    if (regex.url.test(websiteUrlInput.value)) {
      websiteUrlInput.classList.add("is-valid");
      websiteUrlInput.classList.remove("is-invalid");
    } else {
      websiteUrlInput.classList.remove("is-valid");
      websiteUrlInput.classList.add("is-invalid");
    }
  }

  if (
    regex.name.test(bookmarkNameInput.value) &&
    regex.url.test(websiteUrlInput.value)
  ) {
    validForm = true;
  } else {
    validForm = false;
  }
}
