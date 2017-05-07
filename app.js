var app = new Vue({
	el: '#app',
	data: {
		source: `{t:this is the title} {st:this is the subtitle}{c:this is a comment}
{c:this is a another comment}
thi[am]s is th[g]e firs[dm]t line
and th[am]is is the [gm7]second`
	},
	computed: {
		lines: function(){
			return this.getLines(this.source);
		},
		directives: function(){
			return this.getDirectives(this.source);
		}
	},
	methods: {
		getLines: function(source){
			var lines = [];
			source.split('\n').forEach(function(line) {
				line = this.removeDirectives(line);
				var parsedLine = {
					lyricString: this.parseLyricLine(line),
					chordString: this.parseChordLine(line)
				};
				lines.push(parsedLine);
			}.bind(this));
			return lines;
		},
		getDirectives: function(source){
			var directives = this.parseDirectives(source) !== undefined ? this.parseDirectives(source) : [];
			return directives;
		},
		removeDirectives: function(line){
			var directives = this.parseDirectives(line);
			if (directives !== undefined && directives.length){
				directives.forEach(function(directive){
					line = line.replace(directive.markup, '');
				})
			}
			return line;
		},
		parseDirectives: function(source) {
			var regex = /\{\s*([^:}]*)\s*:{0,1}\s*(.*?)\s*}/g;
			var m;
			var directives = [];
			while ((m = regex.exec(source)) !== null) {
				if (m.index === regex.lastIndex) {
					regex.lastIndex++;
				}
				var directive = {};
				m.forEach((match, groupIndex) => {
					if (groupIndex == 0) {directive.markup = match}
						if (groupIndex == 1) {
							directive.type = this.getDirectiveType(match)
						}
						if (groupIndex == 2) {
							directive.name = match
						}
					});
				directives.push(directive);
			}
			return directives;
		},
		getDirectiveType: function(directiveType) {
			directiveType = directiveType.toLowerCase();
			switch (directiveType) {
				case 't':
				return 'title';
				case 'st':
				return 'subtitle';
				case 'c':
				return 'comment';
				default:
				return directiveType;
			}
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
			}else if(line.length){
				chordline = "&nbsp;";
			}
			return chordline;
		},
		getChords: function(line) {
			var regex = /\[([a-zA-Z0-9#+\/]*)\]/g;
			var m;
			var chords = [];
			while ((m = regex.exec(line)) !== null) {
				if (m.index === regex.lastIndex) {
					regex.lastIndex++;
				}
				var chord = {};
				m.forEach(function(match, groupIndex) {
					if (groupIndex == 0) {
						chord.markup = match
					}
					if (groupIndex == 1) {
						chord.name = match
					}
				});
				chord.position = m.index;
				chords.push(chord);
			}
			return chords;
		}
	}
});
