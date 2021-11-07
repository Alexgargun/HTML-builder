// const fs = require('fs');
// const fsPromises = fs.promises;

// fs.copyFile('./files', './copy-files', (err) => {
//     if (err) throw err
//     console.log('files was copied to files-copy')
// });

// (async () => {
//     try {
//       await fs.promises.mkdir('/files-copy', { recursive: true });
//     } catch (error) {
//       throw error;
//     }
//   })();
  
// fsPromises.mkdir('./files-copy', {recursive: true}).then(function() {
//     console.log('Directory created successfully');
// }).catch(function() {
//     console.log('err.message');
// });

const { rm, mkdir, readdir, copyFile } = require('fs/promises');
const { resolve: resolvePath, join: joinPath } = require('path');

const copy = async (src, dest) => {
  const entries = await readdir(resolvePath(__dirname, src), {
    withFileTypes: true,
  });
  const files = entries.filter((entry) => entry.isFile());
  const directories = entries.filter((entry) => entry.isDirectory());
  await mkdir(resolvePath(__dirname, dest), { recursive: true });
  Promise.all(
    files.map(({ name }) =>
      copyFile(
        resolvePath(__dirname, src, name),
        resolvePath(__dirname, dest, name)
      )
    )
  );
  Promise.all(
    directories.map(({ name }) =>
      copy(joinPath(src, name), joinPath(dest, name))
    )
  );
};

(async () => {
  const foldername = 'files';
  const foldernameCopy = 'files-copy';
  await rm(resolvePath(__dirname, foldernameCopy), {
    recursive: true,
    force: true,
  });
  copy(foldername, foldernameCopy);
})();

