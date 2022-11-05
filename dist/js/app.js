const imgMedia = window.matchMedia("(max-width:530px)");
const imgMediaDesktop = window.matchMedia("(min-width:530px)");
const input = document.querySelector("input");
const todoContainer = document.querySelector(".todo");
const remaining = document.querySelectorAll(".items");
const toggle = document.querySelector(".toggle");
const mobileComponent = document.querySelector(".mobile-component");
const clearAll = document.querySelectorAll(".clear-Completed");
const trackProgress = Array.from(document.querySelectorAll(".progress"));
// const todoText = input;

//Get Themes and todos from local storage
window.addEventListener("DOMContentLoaded", () => {
	getTodos();
	// getBanner();
});

// // //theme switcher
// toggle.addEventListener("click", () => {
// 	if (document.body.classList.contains("dark-theme")) {
// 		lightTheme();
// 	} else {
// 		darkTheme();
// 	}
// });

// function lightTheme() {
// 	document.body.classList.remove("dark-theme");
// 	document.body.classList.add("light-theme");
// 	document.body.setAttribute("data-theme", "lightMode");
// 	toggle.src = "./images/icon-moon.svg";
// 	localStorage.setItem("Theme", "light-theme");
// 	localStorage.setItem("toggle", "./images/icon-moon.svg");
// 	if (imgMedia.matches) {
// 		document.querySelector(".theme-mobile").srcset =
// 			"./images/bg-mobile-light.jpg";
// 		localStorage.setItem("banner", "./images/bg-mobile-light.jpg");
// 	}
// 	if (imgMediaDesktop.matches) {
// 		document.querySelector(".theme-desktop").srcset =
// 			"./images/bg-desktop-light.jpg";
// 		localStorage.setItem("banner", "./images/bg-desktop-light.jpg");
// 	}
// }
// function darkTheme() {
// 	document.body.classList.add("dark-theme");
// 	document.body.classList.remove("light-theme");
// 	localStorage.setItem("Theme", "dark-theme");
// 	document.body.setAttribute("data-theme", "darkMode");
// 	toggle.src = "./images/icon-sun.svg";
// 	localStorage.setItem("toggle", "./images/icon-sun.svg");
// 	if (imgMedia.matches) {
// 		document.querySelector(".theme-mobile").srcset =
// 			"./images/bg-mobile-dark.jpg";
// 		localStorage.setItem("banner", "./images/bg-mobile-dark.jpg");
// 	}
// 	if (imgMediaDesktop.matches) {
// 		document.querySelector(".theme-desktop").srcset =
// 			"./images/bg-desktop-dark.jpg";
// 		localStorage.setItem("banner", "./images/bg-desktop-dark.jpg");
// 	}
// }

// // todos
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
		saveLocalStorage(todos);

		// make elements iterable and set an index foreach todo
		Array.from(todoContainer.children).forEach((todo, index) => {
			todo.setAttribute("data-index", index);
		});

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
					saveLocalStorage(todos);
				} else {
					saveLocalStorage(todos);
					removeCheck();
				}
				updateCounter();
			});
		});

		function addChecked(index) {
			todos.classList.add("completed");
			todos.classList.remove("todo-items");
			imageCheck.classList.add("show-check");
			btnCheck.classList.add("bg");
			completed.push(todoContainer.children[index]);
		}
		function removeCheck(index) {
			completed.splice(todoContainer.children[index], 1);
			todos.classList.remove("completed");
			todos.classList.add("todo-items");
			btnCheck.classList.remove("bg");
			todos.classList.remove("completed");
			imageCheck.classList.remove("show-check");
		}
		//forEach because there are to clearAll both mobile and desktop;
		clearAll.forEach((clear) => {
			clear.addEventListener("click", (e) => {
				let GetChildren = [...todoContainer.children];
				GetChildren.forEach((child) => {
					if (child.classList.contains("completed")) {
						child.remove();
						completed = [];
						updateCounter();
					}
				});
			});
		});

		//remove todo
		removeTodo.addEventListener("click", () => {
			removeTodo.parentElement.remove();
		});

		trackProgress.forEach((filter) => {
			filter.addEventListener("click", (e) => {
				if (e.target.classList.contains("active")) {
					todos.classList.add("show-active");
					todos.classList.remove("removeItem");
				} else if (e.target.classList.contains("complete")) {
					todos.classList.add("removeItem");
					todos.classList.remove("show-active");
				} else {
					todos.classList.remove("removeItem");
					todos.classList.remove("show-active");
				}
			});
		});

		//draggable
		// let dragstartIndex;
		// items.setAttribute("draggable", "true");
		// items.addEventListener("dragstart", dragendVal);
		// todoInner.forEach((item, index) => {
		// 	item.setAttribute("data-index", index);
		// });
		// function dragendVal() {
		// 	setTimeout(function () {
		// 		setTimeout(() => {
		// 			items.style.opacity = 0.3;
		// 		}, 0);
		// 		// items.style.op;
		// 	}, 0);
		// 	dragstartIndex = +items.getAttribute("data-index");
		// 	return dragstartIndex;
		// }

		// items.addEventListener("dragend", () => {
		// 	items.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
		// 	setTimeout(() => {
		// 		items.style.opacity = 1;
		// 	}, 0);
		// });

		// items.addEventListener("dragenter", () => {
		// 	items.classList.add("over");
		// 	items.style.backgroundColor = "rgba(0,0,0,0.2)";
		// });

		// items.addEventListener("dragleave", () => {
		// 	items.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
		// });
		// items.addEventListener("drop", () => {
		// 	const dragEndIndex = +items.getAttribute("data-index");
		// 	items.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
		// 	// swapItems(dragendVal(), dragEndIndex);
		// });

		// todos.addEventListener("dragover", (e) => {
		// 	e.preventDefault();
		// });

		// function swapItems(dragstartIndex, dragEndIndex) {
		// 	const itemOne =
		// 		todoContainer.children[dragstartIndex].previousElementSibling;
		// 	const itemTwo = todoContainer.children[dragEndIndex];

		// 	// todoContainer.children[dragstartIndex].appendChild(itemTwo);
		// 	// todoContainer.children[dragEndIndex].appendChild(itemOne);
		// 	// console.log(itemOne, itemTwo);
		// }
		input.value = "";
	}
});

function updateCounter() {
	remaining.forEach((item) => {
		item.textContent = `${
			todoContainer.children.length - completed.length
		} items left`;
	});
}

//store to localStorage;

function saveLocalStorage(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(
		(allTodos = {
			text: todo.textContent,
			className: todo.className,
		})
	);
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
		const todos = document.createElement("div");
		todos.className = todo.className;

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
		itemPara.textContent = todo.text;
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
				} else {
					removeCheck();
				}
				updateCounter();
			});
		});

		function addChecked(index) {
			todos.classList.add("completed");
			todos.classList.remove("todo-items");
			imageCheck.classList.add("show-check");
			btnCheck.classList.add("bg");
			completed.push(todoContainer.children[index]);
		}
		function removeCheck(index) {
			completed.splice(todoContainer.children[index], 1);
			todos.classList.remove("completed");
			todos.classList.add("todo-items");
			btnCheck.classList.remove("bg");
			todos.classList.remove("completed");
			imageCheck.classList.remove("show-check");
		}
		//forEach because there are to clearAll both mobile and desktop;
		clearAll.forEach((clear) => {
			clear.addEventListener("click", (e) => {
				let GetChildren = [...todoContainer.children];
				GetChildren.forEach((child) => {
					if (child.classList.contains("completed")) {
						child.remove();
						completed = [];
						updateCounter();
					}
				});
			});
		});
		removeTodo.addEventListener("click", () => {
			removeTodo.parentElement.remove();
		});

		trackProgress.forEach((filter) => {
			filter.addEventListener("click", (e) => {
				if (e.target.classList.contains("active")) {
					todos.classList.add("show-active");
					todos.classList.remove("removeItem");
				} else if (e.target.classList.contains("complete")) {
					todos.classList.add("removeItem");
					todos.classList.remove("show-active");
				} else {
					todos.classList.remove("removeItem");
					todos.classList.remove("show-active");
				}
			});
		});
	});
}

// // ===============Themes==================
// function getBanner() {
// 	if (localStorage.getItem("Theme") === null) {
// 		if (imgMedia.matches) {
// 			document.querySelector(".theme-mobile").srcset =
// 				"./images/bg-mobile-dark.jpg";
// 			localStorage.setItem("banner", "./images/bg-mobile-dark.jpg");
// 			toggle.src = "./images/icon-sun.svg";
// 		} else if (imgMediaDesktop.matches) {
// 			document.querySelector(".theme-desktop").srcset =
// 				"./images/bg-desktop-dark.jpg";
// 			localStorage.setItem("banner", "./images/bg-desktop-light.jpg");
// 			toggle.src = "./images/icon-sun.svg";
// 		}
// 	} else {
// 		toggle.src = localStorage.getItem("toggle");
// 		document.querySelector(".theme-desktop").srcset =
// 			localStorage.getItem("banner");
// 		document.querySelector(".theme-mobile").srcset =
// 			localStorage.getItem("banner");
// 		document.body.classList.value = localStorage.getItem("Theme");
// 	}
// }
