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
  try {
    await localDB.replicate.from(remoteDB).on('complete', function () {
      spinner.stop(true);
      console.log('Database replicated');
      console.log('You are online');
    }).on('error', function (err) {
      spinner.stop(true);
      console.log('You are offline');
    });
  } catch (err) {
    
  }

  // get all data from local db
  localDB.allDocs({
    include_docs: true
  }).then(function (result) {
    const table = new Table({
      head: ['No', 'ID', 'Title', 'Description', 'Tag', 'Status'],
      colWidths: [5, 40, 30, 30, 20, 10],
      wordWrap: true
    });
    for (var key in result.rows) {
      table.push([
        parseInt(key) + 1,
        result.rows[key].doc._id,
        result.rows[key].doc.title,
        result.rows[key].doc.description,
        result.rows[key].doc.tag,
        result.rows[key].doc.status === 0 ? 'Incomplete' : 'Complete',
      ]);
    }
    console.log(table.toString());
  }).catch(function (err) {
    console.log(err);
  });
}
  