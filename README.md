# travisci-node-update

Updates each target Node version in [Travis CI](https://travis-ci.org/) config to latest minor version.

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

At the moment of writing, latest Node versions are `7.3.0`, `6.9.2`, `5.12.0`, and `4.7.0`.

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

This will update the versions listed in `.travis.yml` to `7.3` and `4.7`, leaving `6.9` and `5.12` untouched:

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