var app = new Vue({
	el: '#app',
	data: {
		source: ''
	},
	computed: {
		parsed: function(){
			return this.getLines(this.source);
		}
	},
	methods: {
		getLines: function(source){
			var lines = [];
			source.split('\n').forEach(function(line) {
				parsedLine = {
					text: line,
					chords: this.parseChord(line)
				}
				parsedLine.chords.forEach(function(chord){
					parsedLine.text = parsedLine.text.replace(chord.markup, "<span class='chord'>" + chord.name + "</span>");
				});
				lines.push(parsedLine);
			}.bind(this));
			return lines;
		},
		parseChord: function(line) {
			var regex = /\[([a-zA-Z0-9#+\/]*)\]/g;
			var m;
			var chords = [];
			while ((m = regex.exec(line)) !== null) {
			    // This is necessary to avoid infinite loops with zero-width matches
			    if (m.index === regex.lastIndex) {
			    	regex.lastIndex++;
			    }
			    var chord = {};
			    // The result can be accessed through the `m`-variable.
			    m.forEach(function(match, groupIndex) {
			    	if (groupIndex == 0) {chord.markup = match}
			    	if (groupIndex == 1) {chord.name = match}
			    });
			    chord.position = m.index;
			    chords.push(chord);
			}
			return chords;
		}

	}
});
