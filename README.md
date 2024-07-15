# Facility API

This VSCode extension provides syntax highlighting and language support for Facility Service Definition (fsd) files for the [Facility API Framework](https://facilityapi.github.io/).

This extension requires the .NET 6.0 runtime to be installed for full language support.

## Development

To build, run the `build` script.

This extension uses https://github.com/FacilityApi/FacilityLanguageServer. It must be downloaded before running the extension. The `get-languageserver` script downloads the language server from https://github.com/FacilityApi/FacilityLanguageServer/releases/. This is done automatically as part of publishing the extension. To test a new language server, update the version there or manually copy the language server to the same location.

To test the extension, launch the `Extension` run configuration from VS Code.

