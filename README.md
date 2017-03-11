# folder2tree #

Creates a tree representation of any project (actually of any folder). Handy if you want to add a tree 
representation of your project to your documentation.

## To-dos

- add tests;
- ignore files and/or folder with a parameter;
- add capability to print on file;

## Installation ##

Run 

```
    npm install folder2tree -g
```

## Usage ##
It takes the following parameters:

- `path`
- `show-files`
- `log-level`

### Path ###

It's the path of the folder you want to show as a tree. It's required.

#### Example ####

```
    folder2tree --path ./
```

### Show Files ###

Add this flag if you want to show files in the tree.

#### Example ####

```
    folder2tree --path ./ -f
```
```
    folder2tree --path ./ --show-files
```

### Logging level ###

If there's something going wrong in the drawing, you can go to a deeper level of logging.
The default level is `3` (only errors), the deepest and most verbose level of logging is `0`.

#### Example ####

```
    folder2tree --path ./ -f  -l 0
```
```
    folder2tree --path ./ --log-level 2
```


## Programmatic usage ##

You can use this utility in your Node.js apps too. You only need to provide the same parameters
as before, but in a _camelCase_ way.

Thus the parameters object looks like:

    {
        path: {string},
        showFiles: {boolean},
        logLevel: {number}
    }

#### Example ####

```
    const folder2tree = require('folder2tree');

    folder2tree({
        path: './',
        shoFiles: true,
        logLevel: 3
    })

``` 
