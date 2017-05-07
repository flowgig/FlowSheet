var app = new Vue({
	el: '#app',
	data: {
		source: `{t:this is the title} {st:this is the subtitle}
		{key:Am}{time:4/4}{tempo:96}{duration:3:26}
		{c:this is a comment}
		{c:this is a another comment}
		thi[am]s is th[g]e firs[dm]t line
		and th[am]is is the [gm7]second`,
		keys: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
		chords: [],
		activeChord: {}
	},
	created: function(){
		var chords = []
		this.keys.forEach(function(key){
			chords.push({
				name: key,
				variations: this.getVariations(key)
			});
		}.bind(this));
		this.chords = chords;
	},
	computed: {
		lines: function(){
			return this.getLines(this.source);
		},
		metaInfo: function(){
			var metaInfo = this.lines.length ? this.getMetaInfo(this.lines) : {};
			return metaInfo;
		}
	},
	methods: {
		getVariations: function(key){
			var variations = [
			{
				name: key,
				markup: `[${key}]`
			},
			{
				name: `${key} minor`,
				markup: `[${key}m]`
			},
			{
				name: `${key} 6`,
				markup: `[${key}6]`
			},
			{
				name: `${key} 7`,
				markup: `[${key}7]`
			},
			{
				name: `${key} Maj7`,
				markup: `[${key}maj7]`
			},
			];
			return variations;

		},
		getMetaInfo: function(lines){
			var metaInfo = {}
			lines.forEach(function(line){
				line.directives.forEach(function(directive){
					if (directive.type == 'title') metaInfo.title = directive.name;
					if (directive.type == 'subtitle') metaInfo.subtitle = directive.name;
					if (directive.type == 'key') metaInfo.key = directive.name;
					if (directive.type == 'time') metaInfo.time = directive.name;
					if (directive.type == 'tempo') metaInfo.tempo = directive.name;
					if (directive.type == 'duration') metaInfo.duration = directive.name;
				});
			});
			return metaInfo;
		},
		getLines: function(source){
			var lines = [];
			source.split('\n').forEach(function(line) {
				var directives = this.getDirectives(line);

				line = this.removeDirectives(line);
				var parsedLine = {
					lyricString: this.parseLyricLine(line),
					chordString: this.parseChordLine(line),
					directives: directives
				};
				lines.push(parsedLine);
			}.bind(this));
			return lines;
		},
		getDirectives: function(line){
			var directives = this.parseDirectives(line) !== undefined ? this.parseDirectives(line) : [];
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
		parseDirectives: function(line) {
			var regex = /\{\s*([^:}]*)\s*:{0,1}\s*(.*?)\s*}/g;
			var m;
			var directives = [];
			while ((m = regex.exec(line)) !== null) {
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
		},
		insertTextAtCursor: function(text) {
			var el = document.getElementById("source-input");
			var val = el.value, endIndex, range;
			endIndex = el.selectionEnd;
			this.source = val.slice(0, el.selectionStart) + text + val.slice(endIndex);
		}
	}
});
