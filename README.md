# linter-solium

This package provides a [linter](https://github.com/AtomLinter/Linter) interface to [solium](https://github.com/duaraghav8/Solium), and is used to lint solidity files.

## Setup

```
apm install linter-solium
```

Atom package `linter` will be installed for you, if you don't already have it.

Now create the default Solium rules config in your project's root directory.

```sh
npm i -g solium
solium --init #in your project dir
```

Now you can edit the rules to your taste as per the Solium docs.

## Use

`linter` should automatically enable Solium.

## Feedback

If it works well for you, feel free to run `apm star linter-solium`.

If you get errors, please search the issues, and open one if it's not already there!

## See also:
- [Solium README](https://github.com/duaraghav8/Solium/blob/master/README.md)
- [Solidity style guide, which Solium adheres to](http://solidity.readthedocs.io/en/latest/style-guide.html)
