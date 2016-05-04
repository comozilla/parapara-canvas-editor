import eventPublisher from "./../publisher";

function MenuView() {
  this.isOpen = false;
  eventPublisher.subscribe("drawState", (newState) => {
    this.toggleCollapsibleButton(newState === "idling");
    if (this.isOpen) {
      this.isOpen = false;
      this.toggleMenu(false);
    }
  });

  document.getElementById("menu-collapsible-btn")
    .addEventListener("click", () => {
      this.isOpen = !this.isOpen;
      this.toggleMenu(this.isOpen);
    });
}

MenuView.prototype.toggleMenu = function(isOpen) {
  const menu = document.getElementById("menu");
  const direction = isOpen ? "alternate" : "alternate-reverse";
  menu.animate(
      [{ transform: "translate(-20vw)" }, { transform: "translate(0px)" }],
      { direction: direction, duration: 250, fill: "both", easing: "ease-in-out"
    });
};

// collapsibleButton : メニューの右側にあるボタン
MenuView.prototype.toggleCollapsibleButton = function(isVisible) {
  const collapsibleButton = document.getElementById("menu-collapsible-btn");
  const direction = isVisible ? "alternate" : "alternate-reverse";
  collapsibleButton.animate(
    [{ transform: "translate(-30px)" }, { transform: "translate(0px)" }],
    { direction: direction, duration: 100, fill: "both" });
};
export default MenuView;
