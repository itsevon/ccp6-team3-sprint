import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SingleList(props) {
	const { selectedList } = props;

	const [itemName, setItemName] = useState("");
	const [quantity, setQuantity] = useState(0);

	const [itemsInList, setItemsInList] = useState([]);

	const getItems = async () => {
		const items = await axios.get(`api/items/${selectedList.id}`);
		// console.log(itemsInList);
		setItemsInList(items.data);
	};

	useEffect(() => {
		getItems();
	});

	return (
		<div className="singleList">
			<p>Hello this is from Single List compo</p>
			<p>This is the ""{selectedList.listName}"" list</p>
			<p>This is the ID of this list ""{selectedList.id}""</p>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const item = { itemName, quantity };
					let data = await axios.post(
						`/api/lists/${selectedList.id}/addItem`,
						item
					);
					setItemName("");
					setQuantity(0);
				}}
			>
				<input
					type="text"
					// className="add-list-box"
					placeholder="Item Name"
					value={itemName}
					onChange={(e) => {
						setItemName(e.target.value);
					}}
				></input>
				<input
					type="number"
					value={quantity}
					min="1"
					// className="add-list-box"
					placeholder="Quantity"
					onChange={(e) => {
						setQuantity(e.target.value);
					}}
				></input>
				<button type="submit">Add Item</button>
			</form>
			<table>
				<tr>
					<th>Item Name</th>
					<th>Quantity</th>
					<th>Done</th>
				</tr>
				{itemsInList.map((item, index) => (
					<tr>
						<td>{item.itemName}</td>
						<td>{item.quantity}</td>
						<td>
							<input
								type="checkbox"
								checked={item.purchased === true ? "checked" : ""}
							// onClick={(e) => {
							// 	console.log(e.target.checked);
							// }}
							></input>
// 							<input
// 								type="button"
// 								onClick={async (e) => {
// 									await axios.delete(`/api/lists/${selectedList.id}/${item.itemName}/delete`, { listId: selectedList.id, itemName: item.itemName })
// 								}}
// 							></input>
// 							<button>X</button>
						</td>
					</tr>
				))}
			</table>
			{/* <input
				type="checkbox"
				onClick={(e) => {
					console.log(e.target.checked);
				}}
			></input> */}
		</div>
	);
}
