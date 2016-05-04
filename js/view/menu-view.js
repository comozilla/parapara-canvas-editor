import eventPublisher from "./../publisher";

function MenuView() {
  this.isOpenMenu = false;
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
  this.isOpenMenu = !this.isOpenMenu;
  const menu = document.getElementById("menu");
  const direction = this.isOpenMenu ? "alternate" : "alternate-reverse";
  menu.animate([{ transform: "translate(-20vw)" }, { transform: "translate(0px)" }], {
    direction: direction, duration: 250, fill: "both", easing: "ease-in-out"
  });
};

MenuView.prototype.toggleOpenMenuButton = function(isVisible) {
  const sidebtn = document.getElementById("menu-side-btn");
  const direction = isVisible ? "alternate" : "alternate-reverse";
  sidebtn.animate(
    [{ transform: "translate(-30px)" }, { transform: "translate(0px)" }],
    { direction: direction, duration: 100, fill: "both" });
};
export default MenuView;
