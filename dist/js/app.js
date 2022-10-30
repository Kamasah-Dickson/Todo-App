const input = document.querySelector("input");
const todoContainer = document.querySelector(".todo");
const removeTodo = document.querySelector(".mark");
const remaining = document.querySelector(".items");
const mobileComponent = document.querySelector(".mobile-component");
const clearAll = document.querySelector(".clear-Completed");
const trackProgress = Array.from(document.querySelectorAll(".progress"));
const todoText = input;
const completed = [];
const ongoing = [];

// window.addEventListener("DOMContentLoaded", () => {
//     let me = localStorage.getItem(completed);
// });
//check amout of inputs entered
// input.addEventListener("keydown", () => {
// 	if (input.value.length === 5) {
// 		console.log("met");
// 	}
// });
// function updateCounter() {
// 	let i = +-1;
// 	return (remaining.textContent = `${
// 		todoContainer.children.length + i
// 	} items left`);
// function counter() {
// 	return (remaining.textContent = `${todoContainer.children.length} items left`);
// }

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

mobileComponent.style.display = "none";

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

				completed.push(todoItemContainer);
				updateCounter();
			} else {
				btnCheck.nextElementSibling.classList.remove("line-through");

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

		// function addCount() {
		// }
	}
});

// function addCount() {
// }

function updateCounter() {
	return (remaining.textContent = `${
		todoContainer.children.length - completed.length
	} items left`);
}
// function addCount() {
// 	return (remaining.textContent = `${ongoing.length} items left`);
// }

// function addCount() {
// 	let mapList = Array.from(todoContainer.children);
// 	mapList.filter((current) => {
// 		current.className === "todo-items";
// 		console.log(current);
// 	});

// 	console.log(mapList);
// 	// if (current.classList.contains("todo-items")) {
// 	// 	console.log(current.length);
// 	// 	// return (remaining.textContent = `${.children.length} items left`);
// 	// }
// }

// function removeCount() {
// 	let initial = Array.from(todoContainer.children);
// 	const completedTodo = [...initial];
// 	completedTodo.forEach((todo, index) => {
// 		completedTodo.splice(index, 1);
// 		remaining.textContent = `${completedTodo.length} items left`;
// 	});
// 	console.log(completedTodo);
// }
