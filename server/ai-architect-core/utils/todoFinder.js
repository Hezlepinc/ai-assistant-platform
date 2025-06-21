// server/utils/todoFinder.js

/**
 * Scans a file's contents for TODO-style comments and returns them with line numbers.
 * Supports // TODO, //FIXME, # TODO (for Python), and multiline /* TODO *\/.
 * 
 * @param {string} fileContent 
 * @param {string} filePath 
 * @returns {string[]} Array of TODOs with line numbers
 */
export function findTodosInFile(fileContent, filePath) {
  const lines = fileContent.split('\n');
  const todos = [];

  lines.forEach((line, index) => {
    if (line.match(/(\/\/|#|\/\*)\s*(TODO|FIXME)/i)) {
      todos.push(`${filePath} [Line ${index + 1}]: ${line.trim()}`);
    }
  });

  return todos;
}