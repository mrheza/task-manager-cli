import PouchDB from 'pouchdb';
import config from '../lib/config.js';
const Spinner = require('cli-spinner').Spinner;

export async function upload () {
  const localDB = new PouchDB('task_manager');
  const remoteDB = new PouchDB(`${config.couchDBUrl}task_manager`, {auth: config.couchDBAuth});
  const spinner = new Spinner('processing.. %s');
  const localDBMeta = new PouchDB('meta_task_manager');

  // replicate to remote db
  localDBMeta.get('unsync_doc').then(function (doc) {
    if (doc.unsyncId.length !== 0) {
      spinner.setSpinnerString('|/-\\');
      spinner.start();
      localDB.replicate.to(remoteDB).on('complete', function () {
        spinner.stop(true);
        console.log('Upload unsync data success');
        doc.unsyncId = [];
        localDBMeta.put(doc);
      }).on('error', function (err) {
        spinner.stop(true);
        console.log('Upload unsync data failed');
      });
    } else {
      console.log('No data to upload');
    }
  }).catch(function (err) {
    
  });
}
