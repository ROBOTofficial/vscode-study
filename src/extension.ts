import {
	commands,
	ExtensionContext,
	StatusBarAlignment,
	Uri,
	ViewColumn,
	window
} from "vscode";

import player from "play-sound";

import path from 'path';

export function activate(context: ExtensionContext) {
	const statusBarBtn = window.createStatusBarItem(StatusBarAlignment.Right);
	statusBarBtn.text = "$(zap) Study";
	statusBarBtn.tooltip = "何見てるんですか?勉強してください!";
	statusBarBtn.command = "vscode-study.study";
	statusBarBtn.show();

	context.subscriptions.push(
		commands.registerCommand("vscode-study.study", () => {
			const panel = window.createWebviewPanel(
				"studyPage",
				"何やってるんですか?勉強してください!",
				ViewColumn.One,
				{
					enableScripts: true,
				}
			);
			const videoUri = panel.webview.asWebviewUri(Uri.joinPath(context.extensionUri, "media", "video.mp4"));
			const audioUri = panel.webview.asWebviewUri(Uri.joinPath(context.extensionUri, "media", "audio.mp3"));
			const styleUri = panel.webview.asWebviewUri(Uri.joinPath(context.extensionUri, "media", "style.css"));
			panel.webview.html = [
				`<!DOCTYPE html>`,
				`<html lang="ja">`,
					`<head>`,
						`<meta charset="UTF-8">`,
						`<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
						`<title>何やってるんですか?勉強してください!</title>`,
						`<link href="${styleUri}" rel="stylesheet">`,
					`</head>`,
					`<body>`,
						`<input id="audioUri" type="hidden" value="${audioUri}" />`,
						`<video controls autoplay muted>`,
							`<source src="${videoUri}" type="video/mp4" />`,
						`</video>`,
					`</body>`,
				`</html>`,
			].join("\n");
			const soundPlayer = player();
			soundPlayer.play(path.join(__dirname, "../media/audio.mp3"));
		}),
		statusBarBtn,
	);
}

export function deactivate() {}
