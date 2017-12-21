import { createVM } from '../src/createVm'
import rawVm from './data/vm'
import v1Vm from './data/vmv1'


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

    test('createVM with version 2 does log warning', () => {
        createVM('{"Window":{"window":55},"ViewModel":{"value":12},"version":2}')
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
        expect(vm.ViewModel).toBeDefined();
    });

    test('Window attribute is valid', () => {
        expect(vm.Window).toBeDefined();
    });

    test('version attribute is 0', () => {
        expect(vm.version).toEqual(0);
    });
});

describe('when loading a version 1 file', () => {
    var vm;
    beforeAll(() => {
        vm = createVM(v1Vm)
    });

    test('ViewModel attribute is valid', () => {
        expect(vm.ViewModel).toBeDefined();
    });

    test('Window attribute is valid', () => {
        expect(vm.Window).toBeDefined();
    });

    test('version attribute is 1', () => {
        expect(vm.version).toEqual(1);
    });
});