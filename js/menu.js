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
  if (isVisible) {
    sidebtn.animate(
      [{ transform: "translate(-10px)" }, { transform: "translate(0px)" }],
      { direction: "alternate", duration: 100 });
  }
  sidebtn.style.display = isVisible ? "block" : "none";
};
module.exports = Menu;
