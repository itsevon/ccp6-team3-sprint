const knex = require("../../db/knex");

module.exports = {
	//insert user data to DB
	addUser(data) {
		return knex("users").insert({
			user_name: data.userName,
			user_email: data.userEmail,
			user_pro_pic: data.userProPic,
			user_password: data.serPassword,
		});
	},

	//insert list data to DB
	addList(data) {
		return knex("lists").insert({
			list_name: data.listName,
			list_owner: data.userId,
		});
	},

	//insert items data to DB
    addItemsToList(data, id) {
        return knex('items_in_list')
            .insert({
                list_id: id,
                item_name: data.itemName,
                quantity: data.quantity,
                purchased: false,
            })
    },

	addUserTolist(data) {
		return knex("users_in_list").insert({
			list_id: data.listId,
			user_id: data.userId,
		});
	},
};
