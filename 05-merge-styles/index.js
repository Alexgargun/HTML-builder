const { readdir, readFile, writeFile } = require('fs/promises');
const { resolve: resolvePath, extname } = require('path');

(async () => {
  const dist = 'project-dist';
  const styles = 'styles';
  const bundle = 'bundle.css';

  const fileTypes = await readdir(resolvePath(__dirname, styles), {
    withFileTypes: true
  });
  const cssFiles = fileTypes
    .filter((entry) => entry.isFile())
    .filter(({ name }) => extname(name) === '.css');
  const data = await Promise.all(
    cssFiles.map(({ name }) =>
      readFile(resolvePath(__dirname, styles, name), 'utf8')
    )
  );
  writeFile(resolvePath(__dirname, dist, bundle), data.join('\n'));
})();