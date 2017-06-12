'use babel';

import path from 'path';
import {readFileSync} from 'fs';
import {CompositeDisposable} from 'atom';

// Dependencies
let solium;
let atomlinter;
let helpers;

// Internal variables
const idleCallbacks = new Set();

function loadDeps() {
  if(!helpers)
    helpers = require('./helpers');
  if(!solium)
    solium = require('solium');
  if(!atomlinter)
    atomlinter = require('atom-linter');
}

export function activate() {
  let callbackID
  const installDeps = () => {
    idleCallbacks.delete(callbackID);
    if(!atom.inSpecMode()) {
      require('atom-package-deps').install('linter-solium');
    }
  }
  callbackID = window.requestIdleCallback(installDeps);
  idleCallbacks.add(callbackID);

  this.subscriptions = new CompositeDisposable();
  this.subscriptions.add(
    atom.config.observe('linter-solium.soliumConfigFilename', (value) => {
      this.soliumConfigFilename = value;
    }),
    atom.config.observe('linter-solium.soliumIgnoreFilename', (value) => {
      this.soliumIgnoreFilename = value;
    })
  )

  //TODO: add debug message
  //this.subscriptions.add(
  //  atom.commands.add('atom-text-editor', {
  //    'linter-jshint:debug': async () => {
  //      loadDeps();
  //      const debugString = await helpers.generateDebugString();
  //      const notificationOptions = { detail: debugString, dismissable: true };
  //      atom.notifications.addInfo('linter-jshint:: Debugging information', notificationOptions);
  //    },
  //  }),
  //);
}

export function deactivate() {
  idleCallbacks.forEach(callbackID => window.cancelIdleCallback(callbackID));
  idleCallbacks.clear();
  this.subscriptions.dispose();
}

export function provideLinter() {
  return {
    name: 'Solium',
    scope: 'file',
    lintsOnChange: true,
    grammarScopes: ['source.solidity'],
    lint: async (textEditor) => {
      loadDeps();
      const results = [];
      const filepath = textEditor.getPath();
      const filedir = path.dirname(filepath);
      //const configFile = helpers.getConfigPath(filedir);
      configFile = await helpers.getConfigPath(filedir);
      if(!configFile)
        return results; // return empty array when no config found
      const config = require(configFile); // TODO: potentially a slow point here
      const text = textEditor.getText();
      const errObjs = solium.lint(text, config);
      errObjs.forEach(async err => {
        let message;
        let position = atomlinter.generateRange(textEditor, err.line-1, err.column);
        message = {
          severity: err.type,
          excerpt: `${err.message} (${err.ruleName})`,
          location: {
            file: filepath,
            position
          }
        }
        results.push(message);
      });
      return results;
    }
  }
}
