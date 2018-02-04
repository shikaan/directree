# directree #
[![Build Status](https://travis-ci.org/shikaan/directree.svg?branch=master)](https://travis-ci.org/shikaan/directree)
[![Coverage Status](https://coveralls.io/repos/github/shikaan/directree/badge.svg?branch=master)](https://coveralls.io/github/shikaan/directree?branch=master)


[![NPM](https://nodei.co/npm/directree.png)](https://npmjs.org/package/directree)

Creates a tree representation of any directory. Handy if you want to add a tree 
representation of your project to your documentation.

## Installation ##

Run 

```
npm install directree -g
```

## Usage ##

```
directree [options] <path>
```

It takes the following options:

- `show-files`
- `log-level`
- `ignore-pattern`
- `output`

### Path ###

It's the path of the folder you want to show as a tree. It's required.

#### Example ####

```
    directree .
```

### Show Files ###

Add this flag if you want to show files in the tree.

#### Example ####

```
    directree -f .
```
```
    directree --show-files .
```

### Logging level ###

If there's something going wrong in the drawing, you can go to a deeper level of logging.
The default level is `3` (only errors), the deepest and most verbose level of logging is `0`.

#### Example ####

```
    directree -l 2 .
```
```
    directree --log-level 2 .
```

### Ignore pattern ###

You can hide some results in the tree by using the `ignore-pattern` argument. 
It runs `minimatch` under the hood, thus it takes a glob as argument.

#### Example ####

```
    directree -i node_modules/**/*.js .
```
```
    directree --ignore-pattern node_modules/**/*.js .
```

### Output ###

If you mind, you can write your output on a file using the `output` parameters.

_Please note: this is an async feature, so keep that in mind in case of programmatic usage!_

#### Example ####

```
    directree -f  -o ./tree.txt .
```
```
    directree --output ./tree.txt .
```

## Programmatic usage ##

You can use this utility in your Node.js apps too. You only need to provide the same parameters
as before, but in a _camelCase_ way.

Thus the parameters object looks like:

    {
        path: {string},
        showFiles: {boolean},
        logLevel: {number},
        ignorePattern: {string},
        output: {string}
    }

#### Example ####

```
    const directree = require('directree');

    directree({
        path: './',
        showFiles: true,
        logLevel: 3,
        ignorePattern: 'node_modules',
        output: './tree.txt'
    })

``` 

## Contributing

Contributors are well welcomed! Please do not skip git hooks when you submit Pull Requests :D