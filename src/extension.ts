import * as path from 'path';
import { Trace } from 'vscode-jsonrpc';
import { workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

export function activate(context: ExtensionContext) {
	const serverDll = path.join(context.extensionPath, 'server', 'Facility.LanguageServer.dll');
	////const serverDll = path.join(context.extensionPath, '..', 'FacilityLanguageServer', 'src', 'Facility.LanguageServer', 'bin', 'Debug', 'netcoreapp2.0', 'Facility.LanguageServer.dll');
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

	const client = new LanguageClient('languageServerFsd', 'Facility Service Definition', serverOptions, clientOptions);
	client.trace = Trace.Verbose;
	const clientRunScope = client.start();

	// Push the disposable to the context's subscriptions so that the
	// client can be deactivated on extension deactivation
	context.subscriptions.push(clientRunScope);
}
