const input = document.querySelector("input");
const todoContainer = document.querySelector(".todo");
const removeTodo = document.querySelector(".mark");
const remaining = document.querySelector(".items");
const trackProgress = Array.from(document.querySelectorAll(".progress"));
const todoText = input;
const completed = [];

//all,active,completed
const trackActive = [];
const trackCompleted = [];
const trackAll = [];

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
// }
function counter() {
	return (remaining.textContent = `${completed.length} items left`);
}

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
	counter();
	if (input.value === "") {
		return;
	}
	if (e.key === "Enter") {
		const todoItemContainer = document.createElement("div");
		todoItemContainer.className = "todo-items";
		todoContainer.prepend(todoItemContainer);

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
			imageCheck.style.opacity = "1";
			btnCheck.classList.toggle("bg");
			imageCheck.classList.toggle("check");
			//apply the line-through to completed tasks
			if (btnCheck.classList.contains("bg")) {
				btnCheck.nextElementSibling.classList.add("line-through");
				//track completed
				todoItemContainer.classList.add("completed");
				todoItemContainer.classList.remove("todo-items");
				completed.push(todoItemContainer);
				counter();
			} else {
				btnCheck.nextElementSibling.classList.remove("line-through");

				//remove completed array if modified by user;
				todoItemContainer.classList.remove("completed");
				todoItemContainer.classList.add("todo-items");
				remaining.textContent = `${todoContainer.children.length} items left`;

				completed.pop(todoItemContainer);
				//remove completed tag if unchecked
				todoItemContainer.classList.remove("completed");
				// counter();
			}
		});
		input.value = "";
	}
});
