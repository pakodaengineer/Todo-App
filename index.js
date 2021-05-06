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
  if (topicName.value == "") {
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

    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
      tasksobj = [];
    } else {
      tasksobj = JSON.parse(tasks);
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
    tasksobj.unshift(obj);
    tasksobj.sort(sortOrder("diff"));
    localStorage.setItem("tasks", JSON.stringify(tasksobj));
    topicName.value = "";
    description.value = "";
    dueTime.value = "";

    // console.log(obj)
  }
  showTasks("all");
});

importantBtn.addEventListener("click", (e) => {
  if (topicName.value == "") {
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

    let impTasks = localStorage.getItem("impTasks");
    if (impTasks == null) {
      impTasksobj = [];
    } else {
      impTasksobj = JSON.parse(impTasks);
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
    impTasksobj.unshift(obj);
    impTasksobj.sort(sortOrder("diff"));

    localStorage.setItem("impTasks", JSON.stringify(impTasksobj));
    topicName.value = "";
    description.value = "";
    dueTime.value = "";

    // console.log(obj)
  }
  showTasks("all");
});

function showTasks(params) {
  let impTasks = localStorage.getItem("impTasks");
  let tasks = localStorage.getItem("tasks");
  if (impTasks == null) {
    impTasksList = [];
  } else {
    impTasksList = JSON.parse(impTasks);
  }
  if (tasks == null) {
    tasksList = [];
  } else {
    tasksList = JSON.parse(tasks);
  }

  // console.log(impTasksList);

  // console.log(impTasksList);
  let html = ``;
  impTasksList.forEach((element, index) => {
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
        <button class="deleteBtn" onclick="deleteIt('impTasks', ${index})">Delete</button>
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
        <button class="deleteBtn" onclick="deleteIt('impTasks', ${index})">Delete</button>
        </div>
      </div>`;
      }
    }
  });
  tasksList.forEach((element, index) => {
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
        <button class="deleteBtn" onclick="deleteIt('tasks', ${index})">Delete</button>
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
        <button class="deleteBtn" onclick="deleteIt('impTasks', ${index})">Delete</button>
        </div>
      </div>`;
      }
    }
  });

  let noteBox = document.querySelector("#taskList");
  if (impTasksList.length == 0 && tasksList.length == 0) {
    noteBox.innerHTML = `<h2 style="text-align:center; color:#757575"> You don't have any task pending. </h2>`;
  } else {
    noteBox.innerHTML = html;
  }
}

function deleteIt(lst, index) {
  let tasks1 = localStorage.getItem(lst);
  if (tasks1 == null) {
    tasksobj1 = [];
  } else {
    tasksobj1 = JSON.parse(tasks1);
  }
  tasksobj1.splice(index, 1);
  localStorage.setItem(lst, JSON.stringify(tasksobj1));
  showTasks("all");
}

searchBar.addEventListener("input", () => {
  let val = searchBar.value.toLowerCase();
  let cardTasks = document.getElementsByClassName("cards");
  Array.from(cardTasks).forEach((element) => {
    let temp = element
      .getElementsByClassName("cardHead")[0]
      .innerText.toLowerCase();
    let temp5 = element
      .getElementsByClassName("cardText")[0]
      .innerText.toLowerCase();
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
  // console.log(currentFilter);
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
