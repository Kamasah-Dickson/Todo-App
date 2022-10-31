const input = document.querySelector("input");
const todoContainer = document.querySelector(".todo");
const remaining = document.querySelector(".items");
const toggle = document.querySelector(".toggle");
const mobileComponent = document.querySelector(".mobile-component");
const clearAll = document.querySelector(".clear-Completed");
const trackProgress = Array.from(document.querySelectorAll(".progress"));
const todoText = input;
let theTheme = localStorage.getItem("Theme");

window.addEventListener("DOMContentLoaded", () => {
	getTodos();
	//theme
	let theme = localStorage.getItem("Theme");
	document.body.classList.value = theme;
});

//theme

toggle.addEventListener("click", () => {
	if (document.body.classList.contains("dark-theme")) {
		lightTheme();
	} else {
		darkTheme();
	}
});

function lightTheme() {
	document.body.classList.remove("dark-theme");
	document.body.classList.add("light-theme");
	document.body.setAttribute("data-theme", "lightMode");
	localStorage.setItem("Theme", "light-theme");
}
function darkTheme() {
	document.body.classList.add("dark-theme");
	document.body.classList.remove("light-theme");
	localStorage.setItem("Theme", "dark-theme");
	document.body.setAttribute("data-theme", "darkMode");
}

// todos
const completed = [];
const ongoing = [];

mobileComponent.style.display = "none";
clearAll.style.display = "none";
clearAll.addEventListener("click", () => {
	///use local storage
});
// add the active color to each element recieving the click;
trackProgress.forEach((track, index) => {
	track.addEventListener("click", (e) => {
		e.preventDefault();
		trackProgress.forEach((track) => {
			track.classList.remove("focus");
		});
		trackProgress[index].classList.add("focus");
	});
});

input.addEventListener("keydown", (e) => {
	if (input.value === "") {
		return;
	}
	if (e.key === "Enter") {
		const todoItemContainer = document.createElement("div");
		todoItemContainer.className = "todo-items";
		todoContainer.prepend(todoItemContainer);
		mobileComponent.style.display = "flex";
		ongoing.push(todoItemContainer);
		updateCounter();

		trackProgress.forEach((filter) => {
			filter.addEventListener("click", (e) => {
				if (e.target.classList.contains("active")) {
					todoItemContainer.classList.add("show-active");
					todoItemContainer.classList.remove("removeItem");
				} else if (e.target.classList.contains("complete")) {
					todoItemContainer.classList.add("removeItem");
					todoItemContainer.classList.remove("show-active");
				} else {
					todoItemContainer.classList.remove("removeItem");
					todoItemContainer.classList.remove("show-active");
				}
			});
		});

		//items/tasks
		const items = document.createElement("div");
		items.className = "item";
		todoItemContainer.prepend(items);

		//check-button
		const btnCheck = document.createElement("div");
		btnCheck.className = "button";
		items.appendChild(btnCheck);
		//checkImg/mark
		const imageCheck = document.createElement("img");
		//add alt
		imageCheck.className = "check";
		imageCheck.src = "./images/icon-check.svg";
		imageCheck.setAttribute("aria-label", "hidden");
		btnCheck.appendChild(imageCheck);

		//the todo itself/daily task
		const itemPara = document.createElement("p");
		itemPara.className = "task";
		itemPara.textContent = `${todoText.value}`;
		items.appendChild(itemPara);
		//remove todo from list button
		const removeTodo = document.createElement("img");
		removeTodo.className = "mark";
		removeTodo.src = "./images/icon-cross.svg";
		items.appendChild(removeTodo);

		//enentListener for check toggle
		items.addEventListener("click", () => {
			btnCheck.classList.toggle("bg");
			imageCheck.classList.toggle("check");
			//apply the line-through to completed tasks
			if (btnCheck.classList.contains("bg")) {
				btnCheck.nextElementSibling.classList.add("line-through");
				//track completed
				todoItemContainer.classList.add("completed");
				todoItemContainer.classList.remove("todo-items");
				clearAll.style.display = "flex";
				completed.push(todoItemContainer);

				updateCounter();
			} else {
				btnCheck.nextElementSibling.classList.remove("line-through");
				clearAll.style.display = "none";
				//remove completed array if modified by user;
				todoItemContainer.classList.remove("completed");
				todoItemContainer.classList.add("todo-items");

				completed.pop(todoItemContainer);
				updateCounter();
				//remove completed tag if unchecked
				todoItemContainer.classList.remove("completed");
			}
		});
		input.value = "";
	}
});

function updateCounter() {
	return (remaining.textContent = `${
		todoContainer.children.length - completed.length
	} items left`);
}

function saveLocalStorage(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach((todo) => {
		//return localStorage;
		//return localStorage;
		//return localStorage;
		//return localStorage;
		//return localStorage;
		//return localStorage;
		//return localStorage;
		//return localStorage;
	});
}
