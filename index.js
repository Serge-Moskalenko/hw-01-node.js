const { program } = require("commander");
const contact= require("./db/contacts")

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contacts = await contact.listContacts()
            return console.log(contacts);

        case "get":
            const getById = await contact.getContactById(id);
            return console.log(getById);

        case "add":
            const newContacts = await contact.addContact({ name, email, phone });
            return console.log(newContacts);
      
        case "update":
            const updateById = await contact.updateById(id, { name, email, phone });
            return console.log(updateById);

        case "remove":
            const deleteByID = await contact.removeContact(id);
            return console.log(deleteByID);

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
};

program
    .option("-a, --action , <type>")
    .option("-i, --id , <type>")
    .option("-n, --name , <type>")
    .option("-e, --email , <type>")
    .option("-p, --phone , <type>")
program.parse();
const option = program.opts();
invokeAction(option);