import eventPublisher from "./../publisher";

function MenuView() {
  this.isOpen = false;
  this.isPlaying = false;
  this.setCollapsibleButtonMode(false);
  eventPublisher.subscribe("drawState", (newState) => {
    this.setCollapsibleButtonVisible(newState === "idling");
    if (this.isOpen) {
      this.setMenuVisible(false);
    }
  });

  eventPublisher.subscribe("isPlaying", (isPlaying) => {
    this.setCollapsibleButtonMode(isPlaying);
    if (isPlaying) {
      this.setMenuVisible(false);
    }
  });
  document.getElementById("menu-collapsible-btn")
    .addEventListener("click", () => {
      if (!this.isOpen) {
        eventPublisher.publish("openMenu", false);  
      }
      if (this.isPlaying) {
        eventPublisher.publish("isPlaying", false);
      } else {
        this.setMenuVisible(!this.isOpen);
      }
    });
}

MenuView.prototype.setMenuVisible = function(isOpen) {
  const menu = document.getElementById("menu");
  const direction = isOpen ? "alternate" : "alternate-reverse";
  this.isOpen = isOpen;
  menu.animate(
      [{ transform: "translate(-20vw)" }, { transform: "translate(0px)" }],
      { direction: direction, duration: 250, fill: "both", easing: "ease-in-out"
    });
};

// collapsibleButton : メニューの右側にあるボタン
MenuView.prototype.setCollapsibleButtonVisible = function(visible) {
  const collapsibleButton = document.getElementById("menu-collapsible-btn");
  const direction = visible ? "alternate" : "alternate-reverse";
  collapsibleButton.animate(
    [{ transform: "translate(-30px)" }, { transform: "translate(0px)" }],
    { direction: direction, duration: 100, fill: "both" });
};

MenuView.prototype.setCollapsibleButtonMode = function(isPlaying) {
  this.isPlaying = isPlaying;
  const icon = document.querySelector("#menu-collapsible-btn i");
  if (isPlaying) {
    icon.classList.add("fa-pause");
    icon.classList.remove("fa-cog");
  } else {
    icon.classList.add("fa-cog");
    icon.classList.remove("fa-pause");
  }
};
export default MenuView;
