import SpellChecker from 'spellchecker';
import c from 'clor';

let str = '[fix] chenge way to modofy DOM'

let results = SpellChecker.checkSpelling(str)
let targets = []
let suggestions = []

for(let i = 0, result; result = results[i]; i++) {
  targets.push(str.substr(result['start'], result['end'] - result['start']))
}

for(let i = 0, target; target = targets[i]; i++) {
  str = str.replace(target, c.yellow(target).toString())
  suggestions.push([target, SpellChecker.getCorrectionsForMisspelling(target)[0]])
}


resultMessage(str)

console.log('you may want to write')
for(let i = 0, suggestion; suggestion = suggestions[i]; i++) {
  suggestionMessage(suggestion[0], suggestion[1])
}

function resultMessage(string) {
  console.log(`Your input was:\n\t${string}`)
}

function suggestionMessage(wrong, suggest) {
  console.log(`\t${c.green(suggest).toString()} instead of ${c.yellow(wrong).toString()}?`)
}
