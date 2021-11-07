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

