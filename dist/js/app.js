const input = document.querySelector("input");
const todoContainer = document.querySelector(".todo");
const removeTodo = document.querySelector(".mark");
const todoText = input;

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

		//items
		const items = document.createElement("div");
		items.className = "item";
		todoItemContainer.prepend(items);

		//check-button
		const btnCheck = document.createElement("div");
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
		itemPara.textContent = `${todoText.value}`;
		items.appendChild(itemPara);
		const removeTodo = document.createElement("img");
		removeTodo.className = "mark";
		removeTodo.src = "./images/icon-cross.svg";
		items.appendChild(removeTodo);

		//enentListener for toggle
		items.addEventListener("click", () => {
			imageCheck.style.opacity = "1";
			btnCheck.classList.toggle("bg");
			imageCheck.classList.toggle("check");
		});
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
