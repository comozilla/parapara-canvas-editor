// Publisherは、データを保存せず、外部へ変更を知らせる機能に絞る。
function Publisher() {
  this.observers = [];
}

Publisher.prototype.subscribe = function(type, observer) {
  this.observers.push(observer);
};

Publisher.prototype.publish = function(type, nextData) {
  console.log(type);
  this.observers.forEach(observer => {
    observer(nextData);
  });
};

module.exports = Publisher;

