import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

export default function Login(props) {
	const [listName, setListName] = useState("");
	const { setLists, lists, setCurrentView, setSelectedList, selectedList } =
		props;

	return (
		<div className="List">
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					let data = await axios.post("/api/lists/add", {
						listName,
					});
					setListName("");
				}}
			>
				<input
					type="text"
					className="add-list-box"
					placeholder="List Name"
					value={listName}
					onChange={(e) => {
						setListName(e.target.value);
					}}
				></input>
				<Button variant="outline-dark" type="submit">
					Add List
				</Button>
			</form>
			{lists.map((listData, index) => (
					<div
						onClick={() => {
							setCurrentView("singleList");
							setSelectedList(lists[index]);
						}}
					>
						{listData.listName}
					</div>
			))}
		</div>
	);
}
