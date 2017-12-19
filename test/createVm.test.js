import { createVM } from '../src/createVm'
import rawVm from './data/vm'


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
    expect(vm).toEqual({ Window: { window: 55 }, ViewModel: { value: 12 } });
});

test('createVM parses new version of ViewModels', () => {
    const vm = createVM('{"Window":{"window":55},"ViewModel":{"value":12}}')
    expect(vm).toEqual({ Window: { window: 55 }, ViewModel: { value: 12 } });
});


describe('when loading a large file', () => {
    // Applies only to tests in this describe block
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
  });