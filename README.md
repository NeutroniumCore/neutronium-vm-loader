# Neutronium vm loader

[![Build status](https://img.shields.io/circleci/project/github/NeutroniumCore/neutronium-vm-loader.svg)](https://circleci.com/gh/NeutroniumCore/neutronium-vm-loader)
[![Npm version](https://img.shields.io/npm/v/neutronium-vm-loader.svg?maxAge=2592000)](https://www.npmjs.com/package/neutronium-vm-loader)
[![MIT License](https://img.shields.io/github/license/NeutroniumCore/neutronium-vm-loader.svg)](https://github.com/NeutroniumCore/neutronium-vm-loader/blob/master/LICENSE)

Utility to parse [Neutronium](https://github.com/David-Desmaisons/Neutronium) generated `cjson` into javascript object.


## Typical use:
```javascript
import rawVm from '../data/vm'
import { createVM } from 'neutronium-vm-loader'

const vm = createVM(rawVm);
```
## Installation

```
npm install --save neutronium-vm-loader
```
