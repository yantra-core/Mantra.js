
{
	let url;
	// Fall back to loading all languages
	let search = "?load=css,javascript,markup";

	try {
		url = document.currentScript?.src ?? eval("import.meta.url");
	}
	catch(e) {}

	if (url) {
		search = new URL(url).search;
	}

	import("./prism-live.mjs" + search).then(m => Prism.Live = m.default);
}
