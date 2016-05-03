// Publisherは、データを保存せず、外部へ変更を知らせる機能に絞る。
function Publisher() {
  this.observers = {};
}

Publisher.prototype.subscribe = function(type, observer) {
  if (typeof this.observers[type] === "undefined") {
    this.observers[type] = [];
  }
  this.observers[type].push(observer);
};

Publisher.prototype.publish = function(type, nextData) {
  if (type.indexOf(":") !== -1) {
    throw new Error("publishのtypeに「:」を含むことはできません。");
  }
  console.log({type: type, nextData: nextData, observers: this.observers[type]});

  if (typeof this.observers[type] === "undefined") {
    this.observers[type] = [];
  }
  this.observers[type].forEach(observer => {
    observer(nextData);
  });
  if (typeof this.observers[type + ":after"] !== "undefined") {
    console.log(":after " + type);
    console.log({type: type, nextData: nextData, observersAfter: this.observers[type + ":after"]});
    this.observers[type + ":after"].forEach(observer => {
      observer(nextData);
    });
  }
  console.log(":end " + type);
};

export default new Publisher();

