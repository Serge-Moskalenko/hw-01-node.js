const fs = require("fs").promises;
const path = require("path")
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data)
};

const getContactById = async (contactId) => {
    const data = await listContacts();
    const id = data.find(contact => contact.id === contactId);
    return id || null
};

const updateById = async (id, data) => {
    const oldData = await listContacts();
    const index = oldData.findIndex(contact => contact.id === id);
    if (index === -1) {
        return null;
    };
    oldData[index] = { id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(oldData, null, 2));
    return oldData[index]
}

const removeContact = async (id) => {
    const oldData = await listContacts();
    const index = oldData.findIndex(contact => contact.id === id);
    if (index === -1) {
        return null;
    };
    const [results] = oldData.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(oldData, null, 2));
    return results
};


const addContact = async (data) => {
    const newContacts = {
        id: nanoid(),
        ...data,
    };
    const oldData = await listContacts();
    oldData.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(oldData, null, 2));
    return newContacts;
};

module.exports = {
    addContact,
    removeContact,
    getContactById,
    listContacts,
    updateById
}