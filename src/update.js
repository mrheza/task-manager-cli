import PouchDB from 'pouchdb';
import { help } from './help';

export async function update (args) {
  if (args._.length === 3) {
    const localDB = new PouchDB('task_manager');
    if (args._[1] === 'c') {
      // update status to complete
      localDB.get(args._[2]).then(function (doc) {
        doc.status = 1;
        localDB.put(doc);
        console.log(`Task ${args._[2]} is complete!`);
      }).catch(function (err) {
        console.log(err);
      });
    } else if (args._[1] === 'i') {
      // update status to incomplete
      localDB.get(args._[2]).then(function (doc) {
        doc.status = 0;
        localDB.put(doc);
        console.log(`Task ${args._[2]} is incomplete!`);
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      help(args);
    }
  } else {
    help(args);
  }
}