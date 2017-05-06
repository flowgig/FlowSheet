var app = new Vue({
	el: '#app',
	data: {
		source: ''
	},
	computed: {
		lines: function(){
			return this.getLines(this.source);
		}
	},
	methods: {
		getLines: function(source){
			var lines = [];
			source.split('\n').forEach(function(line) {
				var parsedLine = {
					lyricString: this.parseLyricLine(line),
					chordString: this.parseChordLine(line)
				};
				lines.push(parsedLine);
			}.bind(this));
			return lines;
		},
		parseLyricLine: function(line){
			var chords = this.getChords(line)
			if (chords.length){
				chords.forEach(function(chord){
					line = line.replace(chord.markup, "");
				});
			}
			return line;
		},
		parseChordLine: function(line){
			var chords = this.getChords(line)
			var index = 0;
			var chordline = "";
			if(chords.length){
				charactersRemoved = 0;
				while (index < line.length){
					var isChord = false;
					chords.forEach(function(chord){
						if (chord.position == index){
							chordline += chord.name;
							index += chord.markup.length + chord.name.length;
							isChord = true;
						}
					});
					if (!isChord){
						chordline += "&nbsp;";
						index++;
					}
				}
			}else{
				chordline = "&nbsp;";
			}
			return chordline;
		},
		getChords: function(line) {
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
