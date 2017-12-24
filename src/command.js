var commandId = 0;
var listeners = [];

function Command(canExecute) {
    this.CanExecuteCount = 1;
    this.CanExecuteValue = canExecute;
    this.id = commandId++;
}

Command.listen = function (listener) {
    listeners.push(listener)
}

Command.unListen = function (listener) {
    listeners = listeners.filter(l => l !== listener)
}

Command.prototype.Execute = function () {
    const args = [...arguments]
    console.log('executing', this.id, args)
    listeners.forEach(l => l(this.id, args))
}

Command.prototype.CanExecute = function () {
    return this.CanExecuteValue;
}

export { Command }