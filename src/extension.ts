import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';

let client: LanguageClient;

export async function activate(context: ExtensionContext) {
	const serverDll = path.join(context.extensionPath, 'server', 'Facility.LanguageServer.dll');
	// const serverDll = path.join(
	// 	context.extensionPath,
	// 	'..',
	// 	'FacilityLanguageServer',
	// 	'src',
	// 	'Facility.LanguageServer',
	// 	'bin',
	// 	'Debug',
	// 	'net6.0',
	// 	'Facility.LanguageServer.dll'
	// );
	const serverOptions: ServerOptions = {
		run: { command: 'dotnet', args: [serverDll, '-lsp'] },
		debug: { command: 'dotnet', args: [serverDll, '-lsp'] },
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [
			{
				pattern: '**/*.fsd',
			},
		],
		synchronize: {
			configurationSection: 'languageServerFsd',
			fileEvents: workspace.createFileSystemWatcher('**/*.fsd'),
		},
	};

	client = new LanguageClient('languageServerFsd', 'Facility Service Definition', serverOptions, clientOptions);
	await client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
