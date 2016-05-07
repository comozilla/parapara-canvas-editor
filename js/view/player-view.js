import eventPublisher from "./../publisher";

class PlayerView{
  constructor(){
   this.element = element;
  this.element.addEventListener("click", () => {
    eventPublisher.publish("isPlaying", true);
  }); 
  }
}

export default PlayerView;
