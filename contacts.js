const fs = require("fs").promises;
const { log } = require("console");
const { nanoid } = require("nanoid");
const path = require("path");

const contactPath = path.resolve("db/contacts.json");

/*
 * Comenta y anota el valor
 * const contactsPath = ;
 */

// TODO: documenta cada función
function listContacts() {
  // ...tu código
  fs.readFile(contactPath)
    .then((data) => {
      const contactList = JSON.parse(data);
      console.table(contactList);
    })
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  // ...tu código

  fs.readFile(contactPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const contactExist = contacts.find((contact) => contact.id === contactId);
      if (contactExist) {
        console.log(contactExist);
      } else {
        console.log(`this contact does not exist`);
      }
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  // ...tu código
  fs.readFile(contactPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      // New contacts
      fs.writeFile(contactPath, JSON.stringify(filteredContacts)).then(() =>
        console.log(`${contactId} was removed`)
      );
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  // ...tu código
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  fs.readFile(contactPath)
    .then((data) => {
      const contactList = JSON.parse(data);
      contactList.push(newContact);
      console.log(contactList);
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
