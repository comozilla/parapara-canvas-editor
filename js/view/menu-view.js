const eventPublisher = require("./../publisher");

function MenuView() {
  eventPublisher.subscribe("drawState", (newState) => {
    this.toggleOpenMenuButton(newState === "idling");
    this.hideMenu();
  });

  document.getElementById("menu-side-btn")
    .addEventListener("click", () => {
      this.toggleMenu();
    });
}

MenuView.prototype.toggleMenu = function() {
  document.getElementById("menu").classList.toggle("menu-open");
};

MenuView.prototype.openMenu = function() {
  document.getElementById("menu").classList.add("menu-open");
};

MenuView.prototype.hideMenu = function() {
  document.getElementById("menu").classList.remove("menu-open");
};
MenuView.prototype.toggleOpenMenuButton = function(isVisible) {
  const sidebtn = document.getElementById("menu-side-btn");
  const direction = isVisible ? "alternate" : "alternate-reverse";
  sidebtn.animate(
    [{ transform: "translate(-30px)" }, { transform: "translate(0px)" }],
    { direction: direction, duration: 100, fill: "both" });
};
module.exports = MenuView;
