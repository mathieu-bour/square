# Square

![License](https://img.shields.io/github/license/mathieu-bour/square?style=flat-square)
![Stars](https://img.shields.io/github/stars/mathieu-bour/square?style=flat-square)
![Latest release](https://img.shields.io/github/v/release/mathieu-bour/square?label=latest%20release&style=flat-square)
![Workflow status](https://img.shields.io/github/workflow/status/mathieu-bour/square/Quality%20assessment?style=flat-square)
![Coverage](https://img.shields.io/codecov/c/gh/mathieu-bour/square?style=flat-square)

Normalize outputs based on package manifests (`package.json`, `composer.json`) and GitHub Actions context.

**Disclaimer: this package is still in active development and thus is unstable.**

## Inputs

| Name                | Type                      | Default value |
|---------------------|---------------------------|---------------|
| `manifest`          | `string`                  | `''`          |
| `mode`              | `output` / `env` / `both` | `output`      |
| `working-directory` | `string`                  | `$(cwd)`      |

### `manifest`
The manifest to look for.
Currently, the only supported ones are JSON-based, with a `"version"` key at the root of the document.

### `mode`
The how to output the results of the action.
They can be actions output (`output`, default behavior), environment variables (`env`) or both (`both`).

### `working-directory`
The working directory; the action will lookup for manifest in the specified directory.
