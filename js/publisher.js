// Publisherは、データを保存せず、外部へ変更を知らせる機能に絞る。
class Publisher{
  constructor(){
    this.observers = {};
  }

subscribe(){
   if (typeof this.observers[type] === "undefined") {
    this.observers[type] = [];
  }
  this.observers[type].push(observer);
}

publish(){
  if (type.indexOf(":") !== -1) {
    throw new Error("publishのtypeに「:」を含むことはできません。");
  }
  if (typeof this.observers[type] === "undefined") {
    this.observers[type] = [];
  }
  this.observers[type].forEach(observer => {
    observer(nextData);
  });
  if (typeof this.observers[type + ":after"] !== "undefined") {
    this.observers[type + ":after"].forEach(observer => {
      observer(nextData);
    });
  }
}
}

export default new Publisher();

