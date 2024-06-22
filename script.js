let Editmodal = document.querySelector(".editmodal");
let editInput = document.querySelector("#editinput");
let deletemodal = document.querySelector(".deletemodal");
let input = document.querySelector("#input");
let addButton = document.querySelector("#add-button");
let Task = document.querySelector("#Task");
let currentEditIndex = -1; 
let currentDeleteIndex = -1;
let data = [];

// Create Task
let createtask = () => {
  Task.innerHTML = "";
  data.map((x, y) => {
    return (Task.innerHTML += `
      <div id="${y}">
        <div
          class="bordercolor border-2 bg-gray-100 shadow-md px-5 py-5 m-auto rounded-lg border-gray-400"
        >
          <div>
            <h1 class="text-blue-700 font-semibold">TO DO TITLE</h1>
            <div class="flex py-2 justify-between items-center">
              <p class="text-sm paratag font-medium">${x.name}</p>
              <div class="flex items-center gap-3">
                <img onClick="DeleteModal(${y})" src="./Image/Delete.png" />
                <img onClick="editmodal(${y})" src="./Image/editimage.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });
};

addButton.addEventListener("click", function () {
  if (input.value == "") {
    alert("Please add task");
  } else {
    acceptdata();
  }
});

let acceptdata = () => {
  data.push({
    name: input.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  input.value = "";
  createtask();
};

// Edit Modal
let closeModal = () => {
  Editmodal.classList.add("hidden");
  deletemodal.classList.add("hidden");
};

let editmodal = function (index) {
  currentEditIndex = index;
  editInput.value = data[index].name;
  Editmodal.classList.remove("hidden");
};

let savepost = function () {
  data[currentEditIndex].name = editInput.value; 
  localStorage.setItem("data", JSON.stringify(data));
  createtask();
  closeModal();
};

// Delete Modal
let DeleteModal = function (index) {
  currentDeleteIndex = index; 
  document.getElementById("deleteinput").innerText = data[index].name;
  deletemodal.classList.remove("hidden");
};

let deletepost = function () {
  data.splice(currentDeleteIndex, 1); 
  localStorage.setItem("data", JSON.stringify(data));
  createtask();
  closeModal();
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createtask();
})();
