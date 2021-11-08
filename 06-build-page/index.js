let fs = require('fs');
const path = require('path');

const pathToComponents = path.join(__dirname, 'components');
const pathToMainFile = path.join(__dirname, 'template.html');
const pathIndexHtml = path.join(__dirname, 'project-dist/index.html');

const readStream = fs.createReadStream(pathToMainFile, 'utf-8');

async function buildingHTML() {
  fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {if (err) throw err});

  readStream.on('data', async (data) => {
    let text = data.toString();
    const templateTags = text.match(/{{.+}}/gi);

    const replacedHTML = await replaceTagsWithComponents();

    async function replaceTagsWithComponents() {
      for(let elem of templateTags) {
        const tag = elem.match(/\w+/)[0];
        const component = await fs.promises.readFile(path.join(pathToComponents, `${tag}.html`));
        text = text.replace(new RegExp(elem, 'g'), component.toString())
      }
      return text;
    }
    fs.writeFile(pathIndexHtml, replacedHTML, err => {if (err) throw err})
  });
}

const folderStyle = path.join(__dirname, 'styles');
const fileBundle = path.join(__dirname, 'project-dist/style.css');

function bundle() {
  fs.writeFile(fileBundle, '', err => {if (err) {throw err}})
  const files = fs.readdir(folderStyle, { withFileTypes: true },
    (err, files) => {
    if (err)
      console.log(err);
    else {  
      files.forEach(file => {
        let fileInf = path.join(__dirname, 'styles', file.name);
        let fileExt = path.parse(fileInf).ext;
        if (file.isFile() && fileExt == '.css') {
          const filePath = path.join(__dirname, 'styles', file.name);
          const readStream = fs.createReadStream(filePath, 'utf-8');
          let text = ''
          readStream.on('data', (data) => text += data);
          readStream.on('end', () => fs.appendFile(fileBundle, text, () => ''));
        }
      })
    }
  })
} 

const folder = path.join(__dirname, 'assets');
const folderCopy = path.join(__dirname, 'project-dist/assets');

async function copyDir(folder, folderCopy) {
  await fs.promises.mkdir(folderCopy, {recursive: true}, (err) => {if (err) throw err});
    const files = await fs.promises.readdir(folder, {withFileTypes: true});
    files.forEach(async (file) => {
      if(file.isFile()) {
        let pthToFile = path.join(folder, file.name);
        let pathToCopyFile = path.join(folderCopy, file.name);
        await fs.promises.copyFile(pthToFile, pathToCopyFile);
      } else {
        copyDir(path.join(folder, file.name), path.join(folderCopy, file.name));
      }
    })
}

buildingHTML();
bundle();
copyDir(folder, folderCopy);