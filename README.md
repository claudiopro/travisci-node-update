# travisci-node-update

Updates target Node version in Travis CI config to latest minor version.

This node module updates your Travis CI config file `.travis.yml` ensuring you're always running tests against the latest available minor versions for each of the listed major versions.

## Install

```sh
npm install -g travisci-node-update
```

## Usage

Invoke the `travisci-node-update` command on the desired target directory (defaults to `.`).

```sh
travisci-node-update [target_dir]
```

## Example

```yaml
# .travis.yml before
language: node_js
node_js:
  - "7.2"
  - "6.9"
  - "5.12"
  - "4.6"
script: npm run test
```

```sh
travisci-node-update .
```

```yaml
# .travis.yml after
language: node_js
node_js:
  - "7.3"
  - "6.9"
  - "5.12"
  - "4.7"
script: npm run test
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017 Claudio Procida