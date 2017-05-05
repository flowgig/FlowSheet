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
					lyricString: line,
					chords: this.parseChord(line)
				}
				var index = 0;
				var chordline = "";
				if(parsedLine.chords.length){
					while (index < line.length){
						var isChord = false;
						parsedLine.chords.forEach(function(chord){
							if (chord.position == index){
								chordline += chord.name;
								index += chord.name.length;
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
				parsedLine.chordString = chordline;
				parsedLine.chords.forEach(function(chord){
					parsedLine.lyricString = parsedLine.lyricString.replace(chord.markup, "");
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
