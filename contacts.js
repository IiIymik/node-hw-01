const fs = require('fs/promises');
const { v4 } = require("uuid");

const path = require('path');
const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
 try {
     const data = await fs.readFile(contactsPath);
     const contacts = JSON.parse(data);
     return contacts;
     } catch (error) {
    console.log(error);     
    }
}

async function getContactById(contactId) {
   try {
        const contacts = await listContacts();
    const contact = contacts.find(item => item.id === Number(contactId));
    if (!contact) {
        return null;
    }
    return contact;
   } catch (error) {
   console.log("🚀 ~ file: contacts.js ~ line 28 ~ getContactById ~ error", error)
       
   }
}

async function removeContact(contactId) {
   try {
        const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === Number(contactId));
    if (idx === -1) {
        return null
    }
    contacts.splice(idx, 1);
    await updateContacts(contacts);
    return 'Success';
   } catch (error) {
   console.log("🚀 ~ file: contacts.js ~ line 44 ~ removeContact ~ error", error)
       
   }
}


async function addContact(name, email, phone) {
try {
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    contacts.push(newContact);
    updateContacts(contacts);
    return newContact;
} catch (error) {
console.log("🚀 ~ file: contacts.js ~ line 54 ~ addContact ~ error", error)
    
}
}


const updateContacts = async (newContacts) => {
    try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    } catch (error) {
    console.log("🚀 ~ file: contacts.js ~ line 69 ~ updateContacts ~ error", error)
    }
}

const contactsOperations = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}

module.exports = contactsOperations;