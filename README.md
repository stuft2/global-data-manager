# global-data-manager
##### Save project-global variables in one location, manage and access them anywhere

### Introduction
This module originally served to store server configurations in a single location and accessing/changing them throughout the server files as necessary.
I've since come across dozens of similar scenarios since that have led to the creation of this module.
With the global-data-manager, you can create, modify, or delete project-global variables in any file without the hassel of exporting and importing variables from multiple files.

### Accessing variables
all - Retrieves all the store properties and values

fetch - Retrieves the key-value pair

put - Stores the key-value pair, over-writes the key if it already exists

create - Creates the key-value pair, will not over-write the key if it already exists

erase - Removes the property from the global store

copy - Copy the value from one property to another

rename - Rename a property without changing the value

#### Usage Example
```
const Manager = require('global-silo-manager')

const store1 = new Manager()
const store2 = new Manager()

store1.put('id', 1)
store2.put('id', 2)

store1.fetch('id') // returns 1
store2.fetch('id') // returns 2
```