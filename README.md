# directree #

Creates a tree representation of any directory. Handy if you want to add a tree 
representation of your project to your documentation.

## To-dos

- Add capability to redirect output(print on file, print on console, return result as string);

## Installation ##

Run 

```
    npm install directree -g
```

## Usage ##
It takes the following parameters:

- `path`
- `show-files`
- `log-level`
- `ignore-pattern`

### Path ###

It's the path of the folder you want to show as a tree. It's required.

#### Example ####

```
    directree -p ./
```
```
    directree --path ./
```

### Show Files ###

Add this flag if you want to show files in the tree.

#### Example ####

```
    directree --path ./ -f
```
```
    directree --path ./ --show-files
```

### Logging level ###

If there's something going wrong in the drawing, you can go to a deeper level of logging.
The default level is `3` (only errors), the deepest and most verbose level of logging is `0`.

#### Example ####

```
    directree --path ./ -f  -l 0
```
```
    directree --path ./ --log-level 2
```

### Ignore pattern ###

You can hide some results in the tree by using the `ignore-patttern` argument. 
It runs `minimatch` under the hood, thus it takes a glob as argument.

#### Example ####

```
    directree --path . -f  -i node_modules
```
```
    directree --path . --ignore-pattern **/*.js 
```

## Programmatic usage ##

You can use this utility in your Node.js apps too. You only need to provide the same parameters
as before, but in a _camelCase_ way.

Thus the parameters object looks like:

    {
        path: {string},
        showFiles: {boolean},
        logLevel: {number},
        ignorePattern: {string}
    }

#### Example ####

```
    const directree = require('directree');

    directree({
        path: './',
        showFiles: true,
        logLevel: 3,
        ignorePattern: 'node_modules'
    })

``` 

## Contributing

You can contribute to this project: clone the repo, write your wonderful code and before pull-requesting please run:

```
    npm test
    npm run lint
```

Only linted and tested requests will be accepted.