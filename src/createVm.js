import CircularJson from 'circular-json'
import { parser } from './parseJSON'

const currentVersionCompatible = 1;

function updateVm(vm) {
    var window = vm.__window__
    if (window) {
        delete vm.__window__
        return { ViewModel: vm, Window: window, version: 0 }
    }
    if (vm.version === undefined) {
        vm.version = 0;
    }
    if (vm.version > currentVersionCompatible) {
        console.log("Please check neutronium-vue for last version compatible, the data format has been updated on Neutronium side.");
    }
    return vm;
}

CircularJson.parser = {
    stringify: JSON.stringify,
    parse: parser
};

function createVM(rawVm) {
    return updateVm(CircularJson.parse(rawVm));
}


export { createVM }