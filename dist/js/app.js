const imgMedia = window.matchMedia("(max-width:530px)");
const imgMediaDesktop = window.matchMedia("(min-width:530px)");
const input = document.querySelector("input");
const todoContainer = document.querySelector(".todo");
const remaining = document.querySelectorAll(".items");
const toggle = document.querySelector(".toggle");
const mobileComponent = document.querySelector(".mobile-component");
const clearAll = document.querySelectorAll(".clear-Completed");
const trackProgress = Array.from(document.querySelectorAll(".progress"));
const todoText = input;

//Get Themes and todos from local storage
window.addEventListener("DOMContentLoaded", () => {
	getTodos();
	getBanner();
});

//theme switcher
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
	toggle.src = "./images/icon-moon.svg";
	localStorage.setItem("Theme", "light-theme");
	localStorage.setItem("toggle", "./images/icon-moon.svg");
	if (imgMedia.matches) {
		document.querySelector(".theme-mobile").srcset =
			"./images/bg-mobile-light.jpg";
		localStorage.setItem("banner", "./images/bg-mobile-light.jpg");
	}
	if (imgMediaDesktop.matches) {
		document.querySelector(".theme-desktop").srcset =
			"./images/bg-desktop-light.jpg";
		localStorage.setItem("banner", "./images/bg-desktop-light.jpg");
	}
}
function darkTheme() {
	document.body.classList.add("dark-theme");
	document.body.classList.remove("light-theme");
	localStorage.setItem("Theme", "dark-theme");
	document.body.setAttribute("data-theme", "darkMode");
	toggle.src = "./images/icon-sun.svg";
	localStorage.setItem("toggle", "./images/icon-sun.svg");
	if (imgMedia.matches) {
		document.querySelector(".theme-mobile").srcset =
			"./images/bg-mobile-dark.jpg";
		localStorage.setItem("banner", "./images/bg-mobile-dark.jpg");
	}
	if (imgMediaDesktop.matches) {
		document.querySelector(".theme-desktop").srcset =
			"./images/bg-desktop-dark.jpg";
		localStorage.setItem("banner", "./images/bg-desktop-dark.jpg");
	}
}

// todos
let completed = [];
const ongoing = [];

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
		ongoing.push(todoItemContainer);

		//find the completed todo and remove all
		clearAll.forEach((clear) => {
			clear.addEventListener("click", () => {
				let GetChildren = [...todoContainer.children];
				let removeThem = GetChildren.filter((item) =>
					item.classList.contains("completed")
				);
				removeThem.forEach((todo) => todo.remove());
			});
		});

		//the function below updates the counter when enter is presed
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

		//remove todo
		removeTodo.addEventListener("click", () => {
			if (
				removeTodo.parentElement.parentElement.classList.contains("completed")
			) {
				ongoing.splice(removeTodo.parentElement, 1);
				removeTodo.parentElement.remove();
			} else {
				removeTodo.parentElement.remove();
			}
		});

		//toggle checked/unchecked
		items.addEventListener("click", () => {
			btnCheck.classList.toggle("bg");
			imageCheck.classList.toggle("check");

			//apply the line-through to completed tasks
			if (btnCheck.classList.contains("bg")) {
				btnCheck.nextElementSibling.classList.add("line-through");
				//track completed todos
				todoItemContainer.classList.add("completed");
				todoItemContainer.classList.remove("todo-items");
				completed.push(todoItemContainer);

				updateCounter();
			} else {
				btnCheck.nextElementSibling.classList.remove("line-through");
				todoItemContainer.classList.remove("completed");
				todoItemContainer.classList.add("todo-items");

				completed.pop(todoItemContainer);
				updateCounter();
				todoItemContainer.classList.remove("completed");
			}
		});

		//draggable
		let dragstartIndex;
		items.setAttribute("draggable", "true");
		items.addEventListener("dragstart", dragendVal);
		document.querySelectorAll(".item").forEach((item, index) => {
			item.setAttribute("data-index", index);
		});
		function dragendVal() {
			setTimeout(function () {
				setTimeout(() => {
					items.style.opacity = 0.3;
				}, 0);
				// items.style.op;
			}, 0);
			dragstartIndex = +items.getAttribute("data-index");
			return dragstartIndex;
		}

		items.addEventListener("dragend", () => {
			items.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
			setTimeout(() => {
				items.style.opacity = 1;
			}, 0);
		});

		items.addEventListener("dragenter", () => {
			items.classList.add("over");
			items.style.backgroundColor = "rgba(0,0,0,0.2)";
		});

		items.addEventListener("dragleave", () => {
			items.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
		});
		items.addEventListener("drop", () => {
			const dragEndIndex = +items.getAttribute("data-index");
			items.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
			// swapItems(dragendVal(), dragEndIndex);
		});

		todoItemContainer.addEventListener("dragover", (e) => {
			e.preventDefault();
		});

		function swapItems(dragstartIndex, dragEndIndex) {
			const itemOne =
				todoContainer.children[dragstartIndex].previousElementSibling;
			const itemTwo = todoContainer.children[dragEndIndex];

			// todoContainer.children[dragstartIndex].appendChild(itemTwo);
			// todoContainer.children[dragEndIndex].appendChild(itemOne);
			// console.log(itemOne, itemTwo);
		}
		input.value = "";
	}
});

function updateCounter() {
	remaining.forEach((item) => {
		item.textContent = `${ongoing.length - completed.length} items left`;
	});
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
	});
}

// ===============Themes==================
function getBanner() {
	if (localStorage.getItem("Theme") === null) {
		if (imgMedia.matches) {
			document.querySelector(".theme-mobile").srcset =
				"./images/bg-mobile-dark.jpg";
			localStorage.setItem("banner", "./images/bg-mobile-dark.jpg");
			toggle.src = "./images/icon-sun.svg";
		} else if (imgMediaDesktop.matches) {
			document.querySelector(".theme-desktop").srcset =
				"./images/bg-desktop-dark.jpg";
			localStorage.setItem("banner", "./images/bg-desktop-light.jpg");
			toggle.src = "./images/icon-sun.svg";
		}
	} else {
		toggle.src = localStorage.getItem("toggle");
		document.querySelector(".theme-desktop").srcset =
			localStorage.getItem("banner");
		document.querySelector(".theme-mobile").srcset =
			localStorage.getItem("banner");
		document.body.classList.value = localStorage.getItem("Theme");
	}
}
