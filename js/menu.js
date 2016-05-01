function Menu(eventPublisher) {
  eventPublisher.subscribe("drawState", (newState) => {
    this.toggleOpenMenuButton(newState === "idling");
    this.hideMenu();
  });
}

Menu.prototype.toggleMenu = function() {
  document.getElementById("menu").classList.toggle("menu-open");
};

Menu.prototype.openMenu = function() {
  document.getElementById("menu").classList.add("menu-open");
};

Menu.prototype.hideMenu = function() {
  document.getElementById("menu").classList.remove("menu-open");
};
Menu.prototype.toggleOpenMenuButton = function(isVisible) {
  const sidebtn = document.getElementById("menu-side-btn");
  const direction = isVisible ? "alternate" : "alternate-reverse";
  sidebtn.animate(
    [{ transform: "translate(-30px)" }, { transform: "translate(0px)" }],
    { direction: direction, duration: 100, fill: "both" });
};
module.exports = Menu;
