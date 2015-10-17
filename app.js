(function() {
	var $source = document.getElementById('source');

	var lines = Array.prototype.map.call($source.children, function(line) {
		return line.innerHTML;
	});

	document.body.removeChild($source);

	var $terminal = document.getElementById('terminal');

	var firstLine = true;

	(function writeln() {
		var i = 0;
		var isTag;
		var tagName = 'p';
		var caret = '<span class="caret">&gt;</span> ';

		if (firstLine) {
			tagName = 'h1';

			firstLine = false;
		}

		var $line = document.createElement(tagName);
		$line.innerHTML = caret;

		$terminal.appendChild($line);

		var str = lines.shift();

		if (!str) {
			return;
		}

		function write() {
			var text = str.slice(0, ++i);

			$line.innerHTML = caret + text;

			if (text === str) {
				return setTimeout(writeln, 160);
			}

			var char = text.slice(-1);

			if (char === '<' || char === '&') {
				isTag = true;
			}

			if (char === '>' || char === ';') {
				isTag = false;
			}

			if (isTag) {
				return write();
			}

			setTimeout(write, 40);
		};

		setTimeout(write, 400);
	})();
})();

