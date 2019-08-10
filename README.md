# @kenchan0130/markdown-to-atlassian-wiki-markup-cli

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![dep][dep-image]][dev-dep-url]
[![dev dep][dev-dep-image]][dev-dep-url]
[![snyk][snyk-image]][snyk-url]
[![MIT][mit-image]][mit-url]

[npm-image]: https://img.shields.io/npm/v/@kenchan0130/markdown-to-atlassian-wiki-markup-cli.svg
[npm-url]: https://www.npmjs.com/package/@kenchan0130/markdown-to-atlassian-wiki-markup-cli

[travis-image]: https://badgen.net/travis/kenchan0130/markdown-to-atlassian-wiki-markup-cli
[travis-url]: https://travis-ci.org/kenchan0130/markdown-to-atlassian-wiki-markup-cli

[dep-image]: https://badgen.net/david/dep/kenchan0130/markdown-to-atlassian-wiki-markup-cli?label=deps
[dep-url]: https://david-dm.org/kenchan0130/markdown-to-atlassian-wiki-markup-cli

[dev-dep-image]: https://badgen.net/david/dep/kenchan0130/markdown-to-atlassian-wiki-markup-cli?label=devDeps
[dev-dep-url]: https://david-dm.org/kenchan0130/markdown-to-atlassian-wiki-markup-cli?type=dev

[snyk-image]: https://snyk.io/test/npm/@kenchan0130/markdown-to-atlassian-wiki-markup-cli/badge.svg
[snyk-url]: https://snyk.io/test/npm/@kenchan0130/markdown-to-atlassian-wiki-markup-cli

[mit-image]: https://badgen.net/npm/license/@kenchan0130/markdown-to-atlassian-wiki-markup-cli
[mit-url]: https://github.com/kenchan0130/markdown-to-atlassian-wiki-markup-cli/blob/master/LICENSE

Command line interface of [markdown-to-atlassian-wiki-markup](https://github.com/kenchan0130/markdown-to-atlassian-wiki-markup)

## Installation

```sh
npm install -g @kenchan0130/markdown-to-atlassian-wiki-markup-cli
# or
yarn global add @kenchan0130/markdown-to-atlassian-wiki-markup-cli
```

## Usage

### Using file path

```sh
markdownToAtlassianWikiMarkup /path/to/markdown-file
```

### Using pipe

```sh
cat /path/to/markdown-file | markdownToAtlassianWikiMarkup
```

## TODO

- Add unit tests
- Support code block options

## Development

### Test

```sh
npm run test
```

### Contributing

1. Fork the project
2. Create a descriptively named feature branch
3. Add your feature
4. Submit a pull request

### Release

```sh
npm version major|minor|patch
```

Run this with local master branch.

## License

MIT
