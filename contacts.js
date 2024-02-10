const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactPath = path.resolve("db/contacts.json");

function listContacts() {
  fs.readFile(contactPath)
    .then((data) => {
      const contactList = JSON.parse(data);
      console.table(contactList);
    })
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
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
  fs.readFile(contactPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );

      fs.writeFile(contactPath, JSON.stringify(filteredContacts)).then(
        () => console.table(filteredContacts),
        console.log(`Done, contact ${contactId} was removed`)
      );
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
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
      fs.writeFile(contactPath, JSON.stringify(contactList)).then(
        () => console.table(contactList),
        console.log(`${newContact.name} was added to contacts`)
      );
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
