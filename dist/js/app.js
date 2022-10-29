const input = document.querySelector("input");
const check = document.querySelector(".check");
const checkButton = document.querySelector(".button");
const todoContainer = document.querySelector(".todo");
const todoItem = document.querySelector(".item");
const removeTodo = document.querySelector(".mark");

//events to toggle check;

// todoItem.addEventListener("click", () => {
// 	check.style.opacity = "1";
// 	checkButton.classList.toggle("bg");
// 	check.classList.toggle("check");
// });

//check amout of inputs entered
// input.addEventListener("keydown", () => {
// 	if (input.value.length === 5) {
// 		console.log("met");
// 	}
// });

//todoLits-container-parent

input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		const todoItemContainer = document.createElement("div");
		todoItemContainer.className = "todo-items";
		todoContainer.prepend(todoItemContainer);
		console.log(todoContainer);

		//items
		const items = document.createElement("div");
		items.className = "item";
		todoItemContainer.prepend(items);
		//check-button
		const btnCheck = document.createElement("button");
		btnCheck.className = "button";
		items.appendChild(btnCheck);
		//checkImg
		const imageCheck = document.createElement("img");
		// // //add alt
		imageCheck.className = "check";
		imageCheck.src = "./images/icon-check.svg";
		btnCheck.appendChild(imageCheck);

		const itemPara = document.createElement("p");
		itemPara.className = "task";
		itemPara.textContent = "Jog around the park 5x";
		items.appendChild(itemPara);
		const removeTodo = document.createElement("img");
		removeTodo.className = "mark";
		removeTodo.src = "./images/icon-cross.svg";
		items.appendChild(removeTodo);
		// const
	}
});

// <!-- <div class="todo-items">
// <div class="item">
//     <div class="button">
//         <img src="./images/icon-check.svg" alt="check" class="check" />
//     </div>
//     <p class="task">Jog around the park 5x</p>
//     <img class="mark" src="./images/icon-cross.svg" alt="mark" />
// </div>
// </div> -->
