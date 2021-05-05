let navbar = document.getElementById("navbar");
let logoHeading = document.getElementById("logo-heading");
let navOptions = document.querySelector("#nav-options");
let searchBar = document.getElementById("search-bar");
let bulb = document.getElementById("bulb");
let inputTask = document.getElementById("inputTask");
let inputFields = document.getElementsByTagName("input");
let heading = document.querySelector("#listHeading");
let cards = document.getElementsByClassName("cards");
let saveBtn = document.getElementById("saveBtn");
let importantBtn = document.getElementById("markImportantBtn");
let markImportantBtn = document.getElementById("markImportantBtn");
let topicName = document.getElementById("topicName");
let description = document.getElementById("description");
let dueTime = document.getElementById("date");
let radios = document.getElementsByName("category");
let filters = document.getElementById("filters");
let currentFilter = "all";

let currentTheme = true;

showTasks("all");

function changeTheme(params) {
  if (currentTheme) {
    currentTheme = false;
    bulb.style.filter = "invert(1)";
    document.body.className = "body-dark";
    logoHeading.className = "heading-dark";
    navbar.className = "nav-dark";
    navOptions.children[0].className = "nav-options-dark";
    navOptions.children[1].className = "nav-options-dark";
    searchBar.className = "search-dark";
    heading.className = "dark";
    saveBtn.classList.remove("save-light");
    saveBtn.classList.add("save-dark");
    markImportantBtn.classList.remove("impBtn-light");
    markImportantBtn.classList.add("impBtn-dark");
    filters.style.backgroundColor = "red";
    filters.style.filter = "invert(1)";
    filters.style.backgroundColor = "rgb(232,232,232)";
    Array.from(inputTask.children).forEach((tag) => {
      tag.classList.remove("light");
      tag.classList.add("dark");
    });
    Array.from(inputFields).forEach((tag) => {
      tag.style.backgroundColor = "rgb(35,35,35)";
      tag.style.border = "1px solid rgb(55, 55,55)";

      tag.style.color = "white";
    });
    Array.from(cards).forEach((tag) => {
      tag.classList.remove("cards-light");
      tag.classList.add("cards-dark");
    });
    Array.from(filters.children).forEach((tag) => {
      tag.className = "dark";
    });
  } else {
    currentTheme = true;
    bulb.style.filter = "none";
    document.body.className = "body-light";
    logoHeading.className = "heading-light";
    navbar.className = "nav-light";
    navOptions.children[0].className = "nav-options-light";
    navOptions.children[1].className = "nav-options-light";
    searchBar.className = "search-light";
    saveBtn.classList.remove("save-dark");
    saveBtn.classList.add("save-light");
    markImportantBtn.classList.remove("impBtn-dark");
    markImportantBtn.classList.add("impBtn-light");
    filters.style.filter = "none";
    filters.style.backgroundColor = "white";
    Array.from(inputTask.children).forEach((tag) => {
      tag.classList.remove("dark");
      tag.classList.add("light");
    });
    Array.from(inputFields).forEach((tag) => {
      tag.style.backgroundColor = "white";
      tag.style.border = "0.5px solid black";
      tag.style.color = "black";
    });
    heading.className = "light";
    Array.from(cards).forEach((tag) => {
      tag.classList.remove("cards-dark");
      tag.classList.add("cards-light");
    });
    Array.from(filters.children).forEach((tag) => {
      tag.className = "light";
    });
  }
}

saveBtn.addEventListener("click", (e) => {
  if (topicName.value == "" || topicName.value.split(" ").length < 2) {
    topicName.style.border = "2px solid red";
  } else if (dueTime.value == "") {
    dueTime.style.border = "2px solid red";
  } else {
    if (currentTheme) {
      topicName.style.border = "1px solid black";
      dueTime.style.border = "1px solid black";
    } else {
      topicName.style.border = "1px solid rgb(55, 55,55)";
      dueTime.style.border = "1px solid rgb(55, 55,55)";
    }

    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesobj = [];
    } else {
      notesobj = JSON.parse(notes);
    }
    let tmp1 = new Date(dueTime.value);
    tmp = tmp1.toDateString().split(" ");

    let nowTime1 = new Date();
    nowTime = nowTime1.toDateString().split(" ");
    //   console.log(radios)
    let tmpType;
    Array.from(radios).forEach((e) => {
      if (e.checked) {
        tmpType = e.value;
      }
    });
    console.log(tmpType);

    let obj = {
      title: `${topicName.value}`,
      description: `${description.value == undefined ? "" : description.value}`,
      dueTime: `${tmp[2]}-${tmp[1]}-${tmp[3]}`,
      now: `${nowTime[2]}-${nowTime[1]}-${nowTime[3]}`,
      type: tmpType,
      diff: `${tmp1 - nowTime1}`,
    };
    notesobj.unshift(obj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    topicName.value = "";
    description.value = "";
    dueTime.value = "";

    // console.log(obj)
  }
  showTasks("all");
});

importantBtn.addEventListener("click", (e) => {
  if (topicName.value == "" || topicName.value.split(" ").length < 2) {
    topicName.style.border = "2px solid red";
  } else if (dueTime.value == "") {
    dueTime.style.border = "2px solid red";
  } else {
    if (currentTheme) {
      topicName.style.border = "1px solid black";
      dueTime.style.border = "1px solid black";
    } else {
      topicName.style.border = "1px solid rgb(55, 55,55)";
      dueTime.style.border = "1px solid rgb(55, 55,55)";
    }

    let impNotes = localStorage.getItem("impNotes");
    if (impNotes == null) {
      impNotesobj = [];
    } else {
      impNotesobj = JSON.parse(impNotes);
    }
    let tmp1 = new Date(dueTime.value);
    tmp = tmp1.toDateString().split(" ");

    let nowTime1 = new Date();
    nowTime = nowTime1.toDateString().split(" ");
    //   console.log(radios)
    let tmpType;
    Array.from(radios).forEach((e) => {
      if (e.checked) {
        tmpType = e.value;
      }
    });
    // console.log(tmpType);

    let obj = {
      title: `${topicName.value}`,
      description: `${description.value == undefined ? "" : description.value}`,
      dueTime: `${tmp[2]}-${tmp[1]}-${tmp[3]}`,
      now: `${nowTime[2]}-${nowTime[1]}-${nowTime[3]}`,
      type: tmpType,
      diff: `${tmp1 - nowTime1}`,
    };
    impNotesobj.unshift(obj);
    localStorage.setItem("impNotes", JSON.stringify(impNotesobj));
    topicName.value = "";
    description.value = "";
    dueTime.value = "";

    // console.log(obj)
  }
  showTasks("all");
});

function showTasks(params) {
  let impNotes = localStorage.getItem("impNotes");
  let notes = localStorage.getItem("notes");
  if (impNotes == null) {
    impNotesList = [];
  } else {
    impNotesList = JSON.parse(impNotes);
  }
  if (notes == null) {
    notesList = [];
  } else {
    notesList = JSON.parse(notes);
  }

  console.log(impNotesList);

  impNotesList.sort(sortOrder("diff"));
  notesList.sort(sortOrder("diff"));

  console.log(impNotesList);
  let html = ``;
  impNotesList.forEach((element, index) => {
    if (params == "all") {
      html += `<div>
             <div class="cards ${currentTheme ? "cards-light" : "cards-dark"}">
             <h5 class="impTag">Important</h5>
        <h3 style="text-align: center; margin: 15px 5px 10px 5px;" class="cardHead">${
          element.title
        }</h3>
        <p style="text-align: center; margin: 10px 10px;" class="cardText">
        ${element.description}
        </p>
        <hr style="width:200px">
        <p style="text-align: center; margin: 5px;" class="cardText">Due-Date: ${
          element.dueTime
        } <br> Created on: ${element.now}</p>
        <button class="deleteBtn" onclick="deleteIt('impNotes', ${index})">Delete</button>
        </div>
      </div>`;
    } else {
      if (element.type == params) {
        html += `<div>
             <div class="cards ${currentTheme ? "cards-light" : "cards-dark"}">
             <h5 class="impTag">Important</h5>
        <h3 style="text-align: center; margin: 15px 5px 10px 5px;" class="cardHead">${
          element.title
        }</h3>
        <p style="text-align: center; margin: 10px 10px;" class="cardText">
        ${element.description}
        </p>
        <hr style="width:200px">
        <p style="text-align: center; margin: 5px;" class="cardText">Due-Date: ${
          element.dueTime
        } <br> Created on: ${element.now}</p>
        <button class="deleteBtn" onclick="deleteIt('impNotes', ${index})">Delete</button>
        </div>
      </div>`;
      }
    }
  });
  notesList.forEach((element, index) => {
    if (params == "all") {
      html += `<div>
             <div class="cards ${currentTheme ? "cards-light" : "cards-dark"}">
        <h3 style="text-align: center; margin: 15px 5px 10px 5px;" class="cardHead">${
          element.title
        }</h3>
        <p style="text-align: center; margin: 10px 10px;" class="cardText">
        ${element.description}
        </p>
        <hr style="width:200px">
        <p style="text-align: center; margin: 5px;" class="cardText">Due-Date: ${
          element.dueTime
        } <br> Created on: ${element.now}</p>
        <button class="deleteBtn" onclick="deleteIt('notes', ${index})">Delete</button>
      </div>
      </div>`;
    } else {
      if (element.type == params) {
        html += `<div>
             <div class="cards ${currentTheme ? "cards-light" : "cards-dark"}">
        <h3 style="text-align: center; margin: 15px 5px 10px 5px;" class="cardHead">${
          element.title
        }</h3>
        <p style="text-align: center; margin: 10px 10px;" class="cardText">
        ${element.description}
        </p>
        <hr style="width:200px">
        <p style="text-align: center; margin: 5px;" class="cardText">Due-Date: ${
          element.dueTime
        } <br> Created on: ${element.now}</p>
        <button class="deleteBtn" onclick="deleteIt('impNotes', ${index})">Delete</button>
        </div>
      </div>`;
      }
    }
  });

  let noteBox = document.querySelector("#taskList");
  if (impNotesList.length == 0 && notesList.length == 0) {
    noteBox.innerHTML = `<h2 style="text-align:center; color:#757575"> You don't have any task pending. </h2>`;
  } else {
    noteBox.innerHTML = html;
  }
}

function deleteIt(lst, index) {
  let notes1 = localStorage.getItem(lst);
  if (notes1 == null) {
    notesobj1 = [];
  } else {
    notesobj1 = JSON.parse(notes1);
  }
  notesobj1.splice(index, 1);
  localStorage.setItem(lst, JSON.stringify(notesobj1));
  showTasks("all");
}

searchBar.addEventListener("input", () => {
  let val = searchBar.value.toLowerCase();
  let cardNotes = document.getElementsByClassName("cards");
  Array.from(cardNotes).forEach((element) => {
    let temp = element.getElementsByTagName("p")[0].innerText;
    let temp5 = element.getElementsByTagName("h3")[0].innerText;
    if (temp.includes(val) || temp5.includes(val)) {
      element.parentElement.style.display = "block";
    } else {
      element.parentElement.style.display = "none";
    }
  });
});

filters.addEventListener("input", () => {
  currentFilter = filters.value;
  filters.value = "";
  console.log(currentFilter);
  showTasks(currentFilter);
});

function sortOrder(item) {
  return function (a, b) {
    if (Number(a[item]) > Number(b[item])) {
      return 1;
    } else if (Number(a[item]) < Number(b[item])) {
      return -1;
    }
    return 0;
  };
}
