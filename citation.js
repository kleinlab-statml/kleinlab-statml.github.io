// Adds a Copy button to each citation box in a blog post.
function citationText(box) {
	var lines = box.innerText.split('\n').map(function (line) { return line.trim(); }).filter(Boolean);
	return lines.map(function (line, i) {
		return i === 0 || i === lines.length - 1 ? line : '  ' + line;
	}).join('\n');
}

// For browsers or pages where the clipboard API is not available
function copyBySelecting(text) {
	var area = document.createElement('textarea');
	area.value = text;
	area.style.position = 'fixed';
	area.style.opacity = '0';
	document.body.appendChild(area);
	area.select();
	var copied = false;
	try { copied = document.execCommand('copy'); } catch (e) {}
	area.remove();
	return copied;
}

function copyText(text) {
	if (navigator.clipboard && navigator.clipboard.writeText) {
		return navigator.clipboard.writeText(text).catch(function () {
			return copyBySelecting(text);
		});
	}
	return Promise.resolve(copyBySelecting(text));
}

document.querySelectorAll('.post tt').forEach(function (box) {
	var wrapper = document.createElement('div');
	wrapper.className = 'citation';
	box.parentNode.insertBefore(wrapper, box);
	wrapper.appendChild(box);

	var button = document.createElement('button');
	button.type = 'button';
	button.className = 'citation-copy';
	button.textContent = 'Copy';
	wrapper.appendChild(button);

	var timer;
	button.addEventListener('click', function () {
		copyText(citationText(box)).then(function (result) {
			button.textContent = result === false ? 'Press Ctrl+C' : 'Copied';
			if (result === false) {
				window.getSelection().selectAllChildren(box);
			}
			clearTimeout(timer);
			timer = setTimeout(function () { button.textContent = 'Copy'; }, 2000);
		});
	});
});
