import eventPublisher from "./../publisher";

function PlayerView(element) {
  this.element = element;
  this.element.addEventListener("click", () => {
    eventPublisher.publish("isPlaying", true);
  });
}

export default PlayerView;
