function State(defaultValue) {
  this.state = defaultValue;
  this.observers = [];
}

State.prototype.subscribe = function(observer) {
  this.observers.push(observer);
};

State.prototype.set = function(nextState) {
  this.observers.forEach(observer => {
    observer(nextState);
  });
  this.state = nextState;
};

module.exports = State;

