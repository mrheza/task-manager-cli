# Description

This is task manager CLI using nodejs, pouchdb for local database and couchdb for remote database. This is offline first app.

# Requirements

Node Js 12 (tested).

# Installation

``` bash
# install dependencies
npm install

# will create a symlink in the global folder to run command app globally
npm link
```

# Command List

Show help menu for a command
```
$ task -h
```

Show package version
```
$ task -v
```

Show task list
```
$ task list
```

Set task status to complete
```
$ task update c <taskid>
```

Set task status to incomplete
```
$ task update i <taskid>
```

Upload unsync data from localdb to remotedb
```
$ task upload
```
