# folder2tree #

Creates a tree representation of any project (actually of any folder). Handy if you want to add a tree 
representation of your project to your documentation.

## To-dos

- logging service;
- decide wether showing files or not with a parameter;
- add tests;
- fix tree drawing of descendant of last children;
- ignore files and/or folder with a parameter;
- add capability to print on file;

## Installation ##
Run 

```
    npm install folder2tree -g
```

## Usage ##
It takes the following parameters:

- path

### Path ###

It's the path of the folder you want to show as a tree.

#### Example ####

```
folder2tree --path ./
```

## Programmatic usage ##

(TBD)

You can use this utility in your Node.js apps too:

#### Example ####

```
const folder2tree = require('folder2tree');

``` 
