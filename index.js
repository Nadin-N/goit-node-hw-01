const contacts = require("./contacts.js");
const { program } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const allContacts = await contacts.listContacts();
			return console.table(allContacts);
		case "get":
			const someContact = await contacts.getContactById(id);
			return console.table(someContact);
		case "add":
			const newContact = await contacts.addContact({ name, email, phone });
			return console.table(newContact);
		case "remove":
			const deleteContact = await contacts.removeContact(id);
			return console.table(deleteContact);
		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

program
	.option("-a, --action, <type>")
	.option("-i, --id, <type>")
	.option("-n, --name, <type>")
	.option("-em, --email, <type>")
	.option("-ph, --phone, <type>");

program.parse();

const option = program.opts();

invokeAction(option);
