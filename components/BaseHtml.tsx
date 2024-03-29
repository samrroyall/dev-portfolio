import type { PropsWithChildren } from "beth-stack/jsx";

const BaseHtml = ({children}: PropsWithChildren) => (
	<html>
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Sam Royall</title>
			<script src="https://unpkg.com/htmx.org@1.9.10"></script>
			<script src="https://cdn.tailwindcss.com"></script>
			<script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
      <link rel="stylesheet" type="text/css" href="/public/global.css" />
		</head>
		<body class="bg-neutral-900 text-stone-400">
			{children}
		</body>
	</html>
);

export default BaseHtml;
