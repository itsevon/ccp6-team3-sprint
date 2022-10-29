import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

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
			<p>This is the ""{selectedList.listName}"" list</p>
			<p>This is the ID of this list ""{selectedList.id}""</p>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const item = { itemName, quantity };
					await axios.post(`/api/lists/${selectedList.id}/addItem`, item);
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
				<button type="submit" variant="outline-dark">
					Add Item
				</button>
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
						{/* {console.log(item)} */}
						<td>
							<input
								type="checkbox"
								checked={item.purchased === true ? "checked" : ""}
								onClick={async (e) => {
									const value = e.target.checked;
									const itemName = item.itemName;
									await axios.post(
										`/api/list/${selectedList.id}/updatePurchase`,
										{
											purchased: value,
											itemName: itemName,
										}
									);
								}}
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
			<input
				type="checkbox"
				onClick={async (e) => {
					if (e.target.checked) {
						console.log("This is chekd");
					}
					const value = e.target.checked;
					console.log("THIS IS THE VALUE ", value);

					await axios.post("/api/list/:listId/updatePurchase");
				}}
			></input>
		</div>
	);
}
