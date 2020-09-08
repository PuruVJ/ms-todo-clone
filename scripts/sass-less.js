const { readFile, writeFile, readdir, rename } = require('fs/promises');

/**
 *
 * @param {string} dir
 */
const sassToLessRecursive = async dir => {
  // Read the directory
  const filesAndFoldersInDir = await readdir(dir, { withFileTypes: true });
  const directories = filesAndFoldersInDir.filter(dirent => dirent.isDirectory());
  const files = filesAndFoldersInDir.filter(dirent => !dirent.isDirectory());

  // Check in files
  const sassFiles = files.filter(({ name }) => name.endsWith('.scss'));

  if (sassFiles.length === 0 && directories.length === 0) {
    // All files done
    return;
  }

  if (sassFiles.length !== 0) {
    // Rename those files
    for (let sassFile of sassFiles) {
      const completeSassPath = `${dir}/${sassFile.name}`;
      const completeLessPath = completeSassPath.replace('.scss', '.less');
      await rename(completeSassPath, completeLessPath);

      console.log(`${completeSassPath} -> ${completeLessPath}`);
    }
  }

  for (let directory of directories) {
    await sassToLessRecursive(`${dir}/${directory.name}`);
  }
};

/**
 * Finds references to the scss files in templates and renames them to their less versions
 * @param {string} dir
 */
const templatesSassToLess = async dir => {
  // Read the directory
  const filesAndFoldersInDir = await readdir(dir, { withFileTypes: true });
  const directories = filesAndFoldersInDir.filter(dirent => dirent.isDirectory());
  const files = filesAndFoldersInDir.filter(dirent => !dirent.isDirectory());

  const filesContainingSassRef = [];

  for (let file of files) {
    const filePath = `${dir}/${file.name}`;
    const fileContents = (await readFile(filePath)).toString();

    fileContents.includes('.scss') && filesContainingSassRef.push(filePath);
  }

  if (filesContainingSassRef.length === 0 && directories.length === 0) return;

  if (filesContainingSassRef.length !== 0) {
    for (let fileRef of filesContainingSassRef) {
      const fileContent = (await readFile(fileRef)).toString();
      const replaced = fileContent.replace('.scss', '.less');

      await writeFile(fileRef, replaced);
      
      console.log(`Changed reference: ${fileRef}`);
    }
  }

  for (let directory of directories) {
    await templatesSassToLess(`${dir}/${directory.name}`);
  }
};

(async function () {
  sassToLessRecursive('../src');
  templatesSassToLess('../src');
})();
