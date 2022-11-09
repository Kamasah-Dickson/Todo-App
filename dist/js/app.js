const imgMedia = window.matchMedia("(max-width:530px)");
const imgMediaDesktop = window.matchMedia("(min-width:530px)");
const input = document.querySelector("input");
const todoContainer = document.querySelector(".todo");
const remaining = document.querySelectorAll(".items");
const toggle = document.querySelector(".toggle");
const mobileComponent = document.querySelector(".mobile-component");
const clearAll = document.querySelectorAll(".clear-Completed");
const trackProgress = Array.from(document.querySelectorAll(".progress"));

//Get Themes and todos from local storage
window.addEventListener("DOMContentLoaded", () => {
	getTodosFromLocalStoage();
	getBanner();
});

// //theme switcher
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

//track todos left
let completed = [];
let ongoing = [];

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
		const todos = document.createElement("div");
		todos.className = "todo-items";

		const btnCheck = document.createElement("div");
		btnCheck.className = "button";
		todos.appendChild(btnCheck);
		//checkImg/mark
		const imageCheck = document.createElement("img");
		imageCheck.className = "check";
		imageCheck.src = "./images/icon-check.svg";
		imageCheck.setAttribute("aria-label", "hidden");
		btnCheck.appendChild(imageCheck);

		const itemPara = document.createElement("p");
		itemPara.className = "task";
		itemPara.textContent = `${input.value}`;
		todos.appendChild(itemPara);

		//remove todo btn
		const removeTodo = document.createElement("img");
		removeTodo.className = "mark";
		removeTodo.src = "./images/icon-cross.svg";
		todos.appendChild(removeTodo);
		todoContainer.appendChild(todos);
		Array.from(todoContainer.children).forEach((todo, index) => {
			todo.setAttribute("data-index", index);
		});
		// ===============================================================================
		//track and saveTodos to locaStorage
		saveLocalStorage(itemPara.textContent, todos.className);

		// track number of  tasks
		ongoing.push(todos);
		updateCounter();

		//toggle checked/
		let allTodos = [...todoContainer.children];
		allTodos.forEach((todo, index) => {
			todo.addEventListener("click", (e) => {
				e.stopImmediatePropagation();
				if (e.target.classList.contains("todo-items")) {
					addChecked(index);
					let className = "completed";
					updateLocalStorage(index, className);
				} else {
					removeCheck(index);
					let className = "todo-items";
					updateLocalStorage(index, className);
				}
				updateCounter();
			});
		});

		function addChecked(index) {
			todos.classList.add("completed");
			itemPara.classList.add("line-through");
			todos.classList.remove("todo-items");
			completed.push(todoContainer.children[index]);
			ongoing.splice(todoContainer.children[index], 1);
		}
		function removeCheck(index) {
			todos.classList.remove("completed");
			todos.classList.add("todo-items");
			itemPara.classList.remove("line-through");
			ongoing.push(todoContainer.children[index]);
			completed.splice(todoContainer.children[index], 1);
		}
		// ============================================================================
		//forEach ___there are two clearAll both mobile and desktop;
		clearAll.forEach((clear) => {
			clear.addEventListener("click", (e) => {
				e.stopImmediatePropagation();
				let GetChildren = [...todoContainer.children];

				GetChildren.forEach((child, index) => {
					if (child.classList.contains("completed")) {
						child.classList.add("remove");
						let todoClass = child.className;
						let todoText = child.textContent;

						child.addEventListener("animationend", () => {
							child.classList.remove("remove");
						});
						setTimeout(() => {
							child.remove();
							removeCompletedStorage(todoText, index, todoClass);
							completed.splice(child, 1);
							ongoing.splice(GetChildren[index], 1);
							updateCounter();
						}, 0);
					}
				});
			});
		});

		//remove todo
		let close = document.querySelectorAll(".mark");
		close.forEach((closeBtn, index) => {
			let currentClass = closeBtn.parentElement.className;
			let currentTodo = closeBtn.parentElement.textContent;
			closeBtn.addEventListener("click", (e) => {
				e.stopImmediatePropagation();

				//remove todo from localStorage;
				removeStoredTodo(currentTodo, currentClass);
				closeBtn.parentElement.remove();
				completed.splice(todoContainer.children[index], 1); //incase it is checked before removed
				ongoing.splice(todoContainer.children[index], 1);
				updateCounter();
			});
		});
		// ===============================================================================
		trackProgress.forEach((filter) => {
			filter.addEventListener("click", (e) => {
				e.stopImmediatePropagation();
				Array.from(todoContainer.children).forEach((todo) => {
					if (e.target.classList.contains("active")) {
						todo.parentElement.classList.add("show-active");
						todo.parentElement.classList.remove("removeItem");
					} else if (e.target.classList.contains("complete")) {
						todo.parentElement.classList.add("removeItem");
						todo.parentElement.classList.remove("show-active");
					} else {
						todo.parentElement.classList.remove("removeItem");
						todo.parentElement.classList.remove("show-active");
					}
				});
			});
		});
		input.value = "";

		//==================draggable======================
		Array.from(todoContainer.children).forEach((todo) => {
			// todos.classList.add("draggable");
			todo.setAttribute("draggable", "true");
			todo.addEventListener("dragstart", () => {
				todo.classList.add("dragging");
			});
			todo.addEventListener("dragend", (e) => {
				e.stopImmediatePropagation();
				todo.classList.remove("dragging");

				todo.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
			});

			let activeTodo;
			todo.addEventListener("dragenter", () => {
				todo.style.backgroundColor = "rgba(0,0,0,0.2)";
				activeTodo = todo;
			});

			todo.addEventListener("dragleave", () => {
				todo.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
			});

			todo.addEventListener("drop", (e) => {
				e.stopImmediatePropagation();
				todo.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
				const afterElement = getDragAfterElement(todoContainer, e.clientY);
				let draggable = document.querySelector(".dragging");

				if (afterElement == null) {
					todoContainer.appendChild(draggable);
				} else {
					todoContainer.insertBefore(draggable, afterElement);
				}
			});

			todoContainer.addEventListener("dragenter", (e) => {
				e.preventDefault();
			});

			todoContainer.addEventListener("dragover", (e) => {
				e.preventDefault();
			});

			function getDragAfterElement(todoContainer, y) {
				let draggableElements = [
					...todoContainer.querySelectorAll(".draggable:not(.dragging)"),
				];

				return draggableElements.reduce(
					(closest, child) => {
						const box = child.getBoundingClientRect();
						//determine the middle of dragover todo====y:mouse position
						const offset = y - box.top - box.height / 2;
						if (offset < 0 && offset > closest.offset) {
							return { offset: offset, element: child };
						} else {
							return closest;
						}
					},
					{ offset: Number.NEGATIVE_INFINITY }
				).element;
			}
		});
	}
});

// =========================functions============================

// function removeCompletedStorage(todo, classname, index) {
function removeCompletedStorage(todo, index, classname) {
	let todos = JSON.parse(localStorage.getItem("todos"));
	let classnames = JSON.parse(localStorage.getItem("classnames"));

	todos.splice(todo[index], 1);
	classnames.splice(classname[index], 1);

	localStorage.setItem("todos", JSON.stringify(todos));
	localStorage.setItem("classnames", JSON.stringify(classnames));
}

// updates the content in localStorage when user toggles completed
function updateLocalStorage(index, className) {
	if (JSON.parse(localStorage.getItem("classnames")) === null) {
		saveLocalStorage(itemPara.textContent, todos.className);
	} else {
		let update = JSON.parse(localStorage.getItem("classnames"));
		update[index] = className;
		localStorage.setItem("classnames", JSON.stringify(update));
	}
}

// updates the content in localStorage when user toggles completed or clearAll
function removeStoredTodo(todo, classname, index) {
	let todos = JSON.parse(localStorage.getItem("todos"));
	let classnames = JSON.parse(localStorage.getItem("classnames"));

	classnames.splice(classname[index], 1);
	todos.splice(todo[index], 1);

	localStorage.setItem("todos", JSON.stringify(todos));
	localStorage.setItem("classnames", JSON.stringify(classnames));
}

//calculte the number of todos left
function updateCounter() {
	remaining.forEach((item) => {
		item.textContent = `${
			todoContainer.children.length - completed.length
		} items left`;
	});
}

// ==========================// function-end================================
//store to localStorage;
function saveLocalStorage(todo, classname) {
	let todos;
	let classnames;
	if (
		localStorage.getItem("todos") === null &&
		localStorage.getItem("classnames") === null
	) {
		todos = [];
		classnames = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
		classnames = JSON.parse(localStorage.getItem("classnames"));
	}
	todos.push(todo);
	classnames.push(classname);

	localStorage.setItem("todos", JSON.stringify(todos));
	localStorage.setItem("classnames", JSON.stringify(classnames));
}

function getTodosFromLocalStoage() {
	let todos;
	let classnames;
	if (
		localStorage.getItem("todos") === null &&
		localStorage.getItem("classnames") === null
	) {
		todos = [];
		classnames = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
		classnames = JSON.parse(localStorage.getItem("classnames"));
	}

	[...todos].forEach((todo) => {
		const todos = document.createElement("div");
		// ===========================classname============
		const btnCheck = document.createElement("div");
		btnCheck.className = "button";
		todos.appendChild(btnCheck);
		//checkImg/mark
		const imageCheck = document.createElement("img");
		imageCheck.className = "check";
		imageCheck.src = "./images/icon-check.svg";
		imageCheck.setAttribute("aria-label", "hidden");
		btnCheck.appendChild(imageCheck);

		const itemPara = document.createElement("p");
		itemPara.className = "task";
		itemPara.textContent = `${todo}`;
		todos.appendChild(itemPara);

		//remove todo btn
		const removeTodo = document.createElement("img");
		removeTodo.className = "mark";
		removeTodo.src = "./images/icon-cross.svg";
		todos.appendChild(removeTodo);
		todoContainer.appendChild(todos);

		// track number of  tasks
		ongoing.push(todos);
		updateCounter();

		let classNames = [...classnames].filter((activeClass) => {
			return activeClass;
		});

		[...todoContainer.children].forEach((child, index) => {
			child.className = classNames[index];
		});

		//toggle checked/
		let allTodos = [...todoContainer.children];
		allTodos.forEach((todo, index) => {
			todo.addEventListener("click", (e) => {
				e.stopImmediatePropagation();
				if (e.target.classList.contains("todo-items")) {
					addChecked(index);
					let className = "completed";

					updateLocalStorage(index, className);
				} else {
					removeCheck(index);
					let className = "todo-items";
					updateLocalStorage(index, className);
				}
				updateCounter();
			});
		});

		function addChecked(index) {
			todos.classList.add("completed");
			todos.classList.remove("todo-items");
			completed.push(todoContainer.children[index]);
			ongoing.splice(todoContainer.children[index], 1);
		}
		function removeCheck(index) {
			todos.classList.remove("completed");
			todos.classList.add("todo-items");
			ongoing.push(todoContainer.children[index]);
			completed.splice(todoContainer.children[index], 1);
		}

		//forEach ___there are two clearAll both mobile and desktop;
		clearAll.forEach((clear) => {
			clear.addEventListener("click", (e) => {
				e.stopImmediatePropagation();
				let GetChildren = [...todoContainer.children];

				GetChildren.forEach((child, index) => {
					if (child.classList.contains("completed")) {
						child.classList.add("remove");
						let todoClass = child.className;
						let todoIndex = child.dataset.index;
						let todoText = child.textContent;

						child.addEventListener("animationend", () => {
							child.classList.remove("remove");
						});
						setTimeout(() => {
							child.remove();
							removeCompletedStorage(todoText, index, todoClass);
							completed.splice(child, 1);
							ongoing.splice(GetChildren[index], 1);
							updateCounter();
						}, 0);
					}
				});
			});
		});

		//remove todo
		let close = document.querySelectorAll(".mark");
		close.forEach((closeBtn, index) => {
			closeBtn.addEventListener("click", (e) => {
				e.stopImmediatePropagation();
				let currentIndex = index;
				let currentClass = closeBtn.parentElement.className;
				let currentTodo = closeBtn.parentElement.textContent;

				//remove todo from localStorage;
				removeStoredTodo(currentTodo, currentClass, currentIndex);

				closeBtn.parentElement.style.animationPlayState = "running";
				closeBtn.parentElement.remove();
				completed.splice(todoContainer.children[index], 1); //incase it is checked before removed
				ongoing.splice(todoContainer.children[index], 1);
				updateCounter();
			});
		});

		trackProgress.forEach((filter) => {
			filter.addEventListener("click", (e) => {
				e.stopImmediatePropagation();
				Array.from(todoContainer.children).forEach((todo) => {
					if (e.target.classList.contains("active")) {
						todo.parentElement.classList.add("show-active");
						todo.parentElement.classList.remove("removeItem");
					} else if (e.target.classList.contains("complete")) {
						todo.parentElement.classList.add("removeItem");
						todo.parentElement.classList.remove("show-active");
					} else {
						todo.parentElement.classList.remove("removeItem");
						todo.parentElement.classList.remove("show-active");
					}
				});
			});
		});

		//==================draggable======================
		Array.from(todoContainer.children).forEach((todo) => {
			// todos.classList.add("draggable");
			todo.setAttribute("draggable", "true");
			todo.addEventListener("dragstart", () => {
				todo.classList.add("dragging");
			});
			todo.addEventListener("dragend", (e) => {
				e.stopImmediatePropagation();
				todo.classList.remove("dragging");

				todo.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
			});

			let activeTodo;
			todo.addEventListener("dragenter", () => {
				todo.style.backgroundColor = "rgba(0,0,0,0.2)";
				activeTodo = todo;
			});

			todo.addEventListener("dragleave", () => {
				todo.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
			});

			todo.addEventListener("drop", (e) => {
				e.stopImmediatePropagation();
				todo.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
				const afterElement = getDragAfterElement(todoContainer, e.clientY);
				let draggable = document.querySelector(".dragging");

				if (afterElement == null) {
					todoContainer.appendChild(draggable);
				} else {
					todoContainer.insertBefore(draggable, afterElement);
				}
			});

			todoContainer.addEventListener("dragenter", (e) => {
				e.preventDefault();
			});

			todoContainer.addEventListener("dragover", (e) => {
				e.preventDefault();
			});

			function getDragAfterElement(todoContainer, y) {
				let draggableElements = [
					...todoContainer.querySelectorAll(".draggable:not(.dragging)"),
				];

				return draggableElements.reduce(
					(closest, child) => {
						const box = child.getBoundingClientRect();
						//determine the middle of dragover todo====y:mouse position
						const offset = y - box.top - box.height / 2;
						if (offset < 0 && offset > closest.offset) {
							return { offset: offset, element: child };
						} else {
							return closest;
						}
					},
					{ offset: Number.NEGATIVE_INFINITY }
				).element;
			}
		});
	});
}

// function getTodos() {
// 	let todos;
// 	if (localStorage.getItem("todos") === null) {
// 		todos = [];
// 	} else {
// 		todos = JSON.parse(localStorage.getItem("todos"));
// 	}
// 	todos.forEach((todo, index) => {});
// }

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
