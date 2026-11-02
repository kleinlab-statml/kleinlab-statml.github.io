// Loaded in <head> so the saved day/night choice applies before the first paint.
(function () {
	var saved = null;
	try { saved = localStorage.getItem('theme'); } catch (e) {}
	document.documentElement.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');
})();

function toggleTheme() {
	var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
	document.documentElement.setAttribute('data-theme', next);
	try { localStorage.setItem('theme', next); } catch (e) {}
}
