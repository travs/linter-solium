'use babel'

import path from 'path';
let atomlinter = require('atom-linter');

export async function getConfigPath (fileDir) {
  const validNames = ['.soliumrc.js', '.soliumrc.json', '.soliumrc'];
  const configFile = await atomlinter.findCachedAsync(fileDir, validNames);
  if(!configFile){  //check the project directory for soliumrc
    const projDir = atom.project.relativizePath(fileDir)[0];
    const configFile = await atomlinter.findCachedAsync(projDir, validNames);
    if(!configFile)
      return null;
  }
  return configFile;
}
