const contactsOperations = require('./contacts.js');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case 'list':
          return await contactsOperations.listContacts().then(data=>console.log(data));

      case 'get':
          return await contactsOperations.getContactById(id).then(data=>console.log(data));

      case 'add':
          return await contactsOperations.addContact(name, email, phone).then(data => console.log(data));

      case 'remove':
          return await contactsOperations.removeContact(id).then(data => console.log(data));

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv)