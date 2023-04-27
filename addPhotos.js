const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const yargs = require('yargs');

const argv = yargs
  .usage('Usage: $0 <file> <out> [--id=<id>] [--dir=<dir>]')
  .demandCommand(1, 'Please specify an HTML file path')
  .demandCommand(1, 'Please specify an output HTML file path')
  .options({
    'id': {
      describe: 'ID of the element to add the <div> to',
      type: 'string',
      default: 'section'
    },
    'picturesdir': {
      describe: 'Directory containing pictures',
      type: 'string',
      default: 'pictures'
    }
  })
  .help('h')
  .alias('h', 'help')
  .argv;

const htmlFilePath = argv._[0];
const htmlFilePathOut = argv._[1];
const targetId = argv.id;
const picturesDir = argv.picturesdir;

const htmlFileContent = fs.readFileSync(htmlFilePath, 'utf8');

const dom = new JSDOM(htmlFileContent);

const targetElement = dom.window.document.getElementById(targetId);

if (!targetElement) {
  console.error(`Could not find an element with id "${targetId}"`);
  process.exit(1);
}
targetElement.innerHTML = ""

const pictures = fs.readdirSync(picturesDir)
    .map(filepath => [path.basename(filepath), filepath.split('_', limit=2)])
    .filter(([filename, [date, title]]) => date.split('.').length == 3)
    .map(([filename, [date, title]]) => [filename, date.split('.'), title])
    .map(([filename, [year, month, day], title]) => {
        let container = dom.window.document.createElement('div'),
            img = dom.window.document.createElement('img'),
            description = dom.window.document.createElement('div'),
            date = dom.window.document.createElement('p'),
            description_p = dom.window.document.createElement('p')
            dot = dom.window.document.createElement('div')
        container.className = 'timeline-entry'
        description.className = 'description'
        date.className = 'date'
        dot.className = 'dot'
        description_p.className = 'description'
        img.setAttribute('src', path.join('public', filename));
        date.innerHTML = `${day}.${month}.${year}`
        description_p.innerHTML = `story.${title}`
        description_p.setAttribute('data-t', '')
        
        container.appendChild(img)
        container.appendChild(dot)
        container.appendChild(description)
        description.appendChild(date)
        description.appendChild(description_p)
        targetElement.appendChild(container);
        return filename
    });

const modifiedHtml = dom.serialize();

// console.log(modifiedHtml)
fs.writeFileSync(htmlFilePathOut, modifiedHtml, 'utf8');

console.log(`HTML file has been updated - added ${pictures.length} pictures to element with id "${targetId}"`);
