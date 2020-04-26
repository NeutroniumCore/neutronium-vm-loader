# Neutronium vm loader

[![Build status](https://img.shields.io/circleci/project/github/NeutroniumCore/neutronium-vm-loader.svg)](https://circleci.com/gh/NeutroniumCore/neutronium-vm-loader)
[![Npm version](https://img.shields.io/npm/v/neutronium-vm-loader.svg?maxAge=2592000)](https://www.npmjs.com/package/neutronium-vm-loader)
[![MIT License](https://img.shields.io/github/license/NeutroniumCore/neutronium-vm-loader.svg)](https://github.com/NeutroniumCore/neutronium-vm-loader/blob/master/LICENSE)

Utility to parse [Neutronium](https://github.com/David-Desmaisons/Neutronium) generated `cjson` into javascript object. Used by [neutronium-vue](https://github.com/NeutroniumCore/neutronium-vue).

Vm loader is intendent to load data in design mode when using Neutronium.
It is helpful when you design your solution decontected from C# back-end. 

## Typical use:
```javascript
import rawVm from '../data/vm'
import { createVM } from 'neutronium-vm-loader'

const vm = createVM(rawVm);
```

## Listen to command and return a value (for ResultCommand):

```javascript
import { Command } from 'neutronium-vm-loader'

function commandListener(commandId, ...commandArguments) {
  if (commandId === 12) {
    return new Promise( //..
    );
  }
}

Command.listen(commandListener);
```

Command listen function is called with the command is as a first paremeter and the arguments which with the command has been called.
listen return will be used by as the command result.
The command id is set incrementally for each command of a view model. 

## Installation

```
npm install --save neutronium-vm-loader
```
