function State(defaultValue) {
  this.state = defaultValue;
  this.listeners = [];
}

State.prototype.subscribe = function(listener) {
  this.listeners.push(listener);
};

State.prototype.setState = function(newState) {
  this.state = newState;
  this.listeners.forEach(listener => {
    listener(newState);
  });
};

State.prototype.getState = function() {
  return this.state;
};

module.exports = State;

