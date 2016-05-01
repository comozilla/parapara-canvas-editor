function Publisher(defaultData) {
  this.data = defaultData;
  this.observers = [];
}

Publisher.prototype.subscribe = function(observer) {
  this.observers.push(observer);
};

Publisher.prototype.publish = function(nextData) {
  this.observers.forEach(observer => {
    observer(nextData);
  });
  this.data = nextData;
};

module.exports = Publisher;

