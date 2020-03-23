import PouchDB from 'pouchdb';
import config from '../lib/config.js';
import Table from 'cli-table3';
const Spinner = require('cli-spinner').Spinner;

export async function list () {
  const localDB = new PouchDB('task_manager');
  const remoteDB = new PouchDB(`${config.couchDBUrl}task_manager`, {auth: config.couchDBAuth});
  const spinner = new Spinner('processing.. %s');

  spinner.setSpinnerString('|/-\\');
  spinner.start();

  // replicate from remote db
  await localDB.replicate.from(remoteDB);
  spinner.stop(true);

  // get all data from local db
  localDB.allDocs({
    include_docs: true
  }).then(function (result) {
    const table = new Table({
      head: ['No', 'ID', 'Title', 'Description', 'Tag'],
      colWidths: [5, 40, 30, 30, 20],
      wordWrap: true
    });
    for (var key in result.rows) {
      table.push([
        parseInt(key) + 1,
        result.rows[key].doc._id,
        result.rows[key].doc.title,
        result.rows[key].doc.description,
        result.rows[key].doc.tag,
      ]);
    }
    console.log(table.toString());
  }).catch(function (err) {
    console.log(err);
  });
}
  