import { createVM } from '../src/createVm'
import { Command } from '../src/command'

import rawVm from './data/vm'
import v1Vm from './data/vmv1'
import v2Vm from './data/vmv2'

test('createVM parses attributes', () => {
    const vm = createVM('{"value":23}')
    expect(vm.value).toBe(23);
});

test('createVM parses Infinity', () => {
    const vm = createVM('{"value":Infinity}')
    expect(vm.value).toBe(Infinity);
});

test('createVM parses -Infinity', () => {
    const vm = createVM('{"value":-Infinity}')
    expect(vm.value).toBe(-Infinity);
});

test('createVM parses NaN', () => {
    const vm = createVM('{"value":NaN}')
    expect(vm.value).toBe(NaN);
});

test('createVM parses circular reference', () => {
    const vm = createVM('{"value":"~"}')
    expect(vm.value).toBe(vm);
});

test('createVM parses circular reference - child', () => {
    const vm = createVM('{"a":{"a":{}},"value":"~a~a"}')
    expect(vm.value).toBe(vm.a.a);
});

test('createVM updates old version of ViewModels', () => {
    const vm = createVM('{"__window__":{"window":55},"value":12}')
    expect(vm).toEqual({ Window: { window: 55 }, ViewModel: { value: 12 }, version: 0 });
});

test('createVM parses new version of ViewModels', () => {
    const vm = createVM('{"Window":{"window":55},"ViewModel":{"value":12}}')
    expect(vm).toEqual({ Window: { window: 55 }, ViewModel: { value: 12 }, version: 0 });
});

test('createVM parses brand new version of ViewModels', () => {
    const vm = createVM('{"Window":{"window":55},"ViewModel":{"value":12},"version":2}')
    expect(vm).toEqual({ Window: { window: 55 }, ViewModel: { value: 12 }, version: 2 });
});


describe('when reading version', () => {
    const log = console.log;
    beforeEach(() => {
        console.log = jest.fn()
    });

    test('createVM with version 0 does not log anything', () => {
        createVM('{"Window":{"window":55},"ViewModel":{"value":12}}')
        expect(console.log).not.toBeCalled();
    });

    test('createVM with version 1 does not log anything', () => {
        createVM('{"Window":{"window":55},"ViewModel":{"value":12},"version":1}')
        expect(console.log).not.toBeCalled();
    });

    test('createVM with version 2 does not log anything', () => {
        createVM('{"Window":{"window":55},"ViewModel":{"value":12},"version":2}')
        expect(console.log).not.toBeCalled();
    });

    test('createVM with version 3 does log warning', () => {
        createVM('{"Window":{"window":55},"ViewModel":{"value":12},"version":3}')
        expect(console.log).toBeCalledWith("Please check neutronium-vue for last version compatible, the data format has been updated on Neutronium side.");
    });

    afterEach(() => {
        console.log = log
    });
});

describe('when loading a large file', () => {
    var vm;
    beforeAll(() => {
        vm = createVM(rawVm)
    });

    test('ViewModel attribute is valid', () => {
        expect(vm.ViewModel).toBeTruthy();
    });

    test('Window attribute is valid', () => {
        expect(vm.Window).toBeTruthy();
    });

    test('version attribute is 0', () => {
        expect(vm.version).toEqual(0);
    });
});

describe('when reading invalid file', () => {
    const log = console.log;
    var vm;

    beforeEach(() => {
        console.log = jest.fn()
        vm = createVM('fakeNEWS!!!!!!!')
    });

    test('ViewModel attribute is null', () => {
        expect(vm.ViewModel).toBeNull();
    });

    test('Window attribute is null', () => {
        expect(vm.Window).toBeNull();
    });

    test('version attribute is -1', () => {
        expect(vm.version).toEqual(-1);
    });

    test('problem information should be logged', () => {
        expect(console.log).toBeCalledWith("Error during parsing. Please check neutronium-vue for last version compatible with Neutronium.");
    });

    test('error should be logged', () => {
        expect(console.log).toBeCalledWith("Error during parsing: SyntaxError: Expected 'l' instead of 'k' at 3");
    });

    afterEach(() => {
        console.log = log
    });
});

describe('when loading a version 1 file', () => {
    var vm;
    beforeAll(() => {
        vm = createVM(v1Vm)
    });

    test('ViewModel attribute is valid', () => {
        expect(vm.ViewModel).toBeTruthy();
    });

    test('Window attribute is valid', () => {
        expect(vm.Window).toBeTruthy();
    });

    test('version attribute is 1', () => {
        expect(vm.version).toEqual(1);
    });
});


describe('when loading a version 2 file', () => {
    var vm;
    beforeAll(() => {
        vm = createVM(v2Vm)
    });

    test('ViewModel attribute is valid', () => {
        expect(vm.ViewModel).toBeDefined();
    });

    test('Commands are parsed to command', () => {
        expect(vm.ViewModel.ChangeSkill).toBeInstanceOf(Command);
        expect(vm.ViewModel.Command).toBeInstanceOf(Command);
    });

    test('Command are parsed - canExecute true', () => {
        expect(vm.ViewModel.ChangeSkill).toEqual({ id: 0, CanExecuteCount: 1, CanExecuteValue: true });
    });

    test('Command are parsed - canExecute false', () => {
        expect(vm.ViewModel.Command).toEqual({ id: 1, CanExecuteCount: 1, CanExecuteValue: false });
    });

    test('Window attribute is valid', () => {
        expect(vm.Window).toBeDefined();
    });

    test('version attribute is 2', () => {
        expect(vm.version).toEqual(2);
    });
});