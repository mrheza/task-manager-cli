import PouchDB from 'pouchdb';
import { help } from './help';
const localDBMeta = new PouchDB('meta_task_manager');

export async function update (args) {
  if (args._.length === 3) {
    const now = new Date().toJSON();
    const localDB = new PouchDB('task_manager');

    if (args._[1] === 'c') {
      // update status to complete
      localDB.get(args._[2]).then(async function (doc) {
        doc.status = 1;
        doc.updatedAt = now;

        // save data to local db
        await localDB.put(doc);

        // update metadata
        await updateMetaData(args._[2]);

        console.log(`Task ${args._[2]} is complete!`);
      }).catch(function (err) {
        console.log(err);
      });
    } else if (args._[1] === 'i') {
      // update status to incomplete
      localDB.get(args._[2]).then(async function (doc) {
        doc.status = 0;
        doc.updatedAt = now;

        // save data to local db
        localDB.put(doc);

        // update metadata
        await updateMetaData(args._[2]);

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

async function updateMetaData(id) {
  // get data from metadata
  let data = {unsyncId: [id] };
  try {
    await localDBMeta.get('unsync_doc').then(function (doc) {
      if (doc.unsyncId.indexOf(id) === -1) {
        doc.unsyncId.push(id);
      }
      data = Object.assign(data, doc);
    }).catch(function (err) {

    });
  } catch (err) {
    console.log(err)
  }

  // save unsync id to metadata
  const metaData = Object.assign({_id: 'unsync_doc'}, data);
  try {
      await localDBMeta.put(metaData);
  } catch (err) {
    console.log(err);
  }
}
