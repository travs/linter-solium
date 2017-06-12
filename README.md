# linter-solium

This package provides a [linter](https://github.com/AtomLinter/Linter) interface to [solium](https://github.com/duaraghav8/Solium), and is used to lint solidity files.

## Install

```
apm install linter-solium
```

Atom package `linter` will be installed for you, if you don't already have it.

## Use

`linter` should automatically enable Solium.
All you have to do is create a `soliumrc.json` file in your project directory,
which this package will detect.

You can do this with:
```
solium --init
```

See also:
- [Solium README](https://github.com/duaraghav8/Solium/blob/master/README.md)
- [Solidity style guide, which Solium adheres to](http://solidity.readthedocs.io/en/latest/style-guide.html)
