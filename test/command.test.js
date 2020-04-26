import { Command } from '../src/command'
import { test as dataDrivenTest, given } from 'sazerac'

function getCanExecuteValueFromConstructor(value) {
    const cmd = new Command(value);
    return cmd.CanExecuteValue;
}

function getCanExecuteFromConstructor(value) {
    const cmd = new Command(value);
    return cmd.CanExecute();
}

dataDrivenTest(getCanExecuteValueFromConstructor, () => {
    given(true).expect(true)
    given(false).expect(false)
})

dataDrivenTest(getCanExecuteFromConstructor, () => {
    given(true).expect(true)
    given(false).expect(false)
})

test('id is incremental', () => {
    const cmd1 = new Command(true);
    const cmd2 = new Command(true);
    expect(cmd2.id).toEqual(cmd1.id + 1);
});

describe('when calling Execute', () => {
    const log = console.log;
    var listener;

    beforeEach(() => {
        console.log = jest.fn()
        listener = jest.fn()
        Command.listen(listener)
    });

    test('log is called with arguments', () => {
        const cmd = new Command(true);
        cmd.Execute(1, 2, 'argument');
        expect(console.log).toHaveBeenCalledWith('executing', cmd.id, [1, 2, 'argument']);
    });

    test('listener is called with arguments', () => {
        const cmd = new Command(false);
        cmd.Execute(1, 2, 3, 'argument');
        expect(listener).toHaveBeenCalledWith(cmd.id, [1, 2, 3, 'argument']);
    });

    test('listener can change the return value of Execute', () => {
      const expectedValue = 6880;
      Command.listen(() => expectedValue);
      const cmd = new Command(false);
      const result = cmd.Execute(1, 2, 3, 'argument');
      expect(result).toBe(expectedValue);
    });

    test('listener is not called when calling unListen', () => {
        Command.unListen(listener)
        const cmd = new Command(false);
        cmd.Execute(1, 2, 3, 'argument');
        expect(listener).not.toHaveBeenCalled();
    });

    afterEach(() => {
        console.log = log
        Command.unListen(listener);
    });
});