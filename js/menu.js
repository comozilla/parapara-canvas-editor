function Menu() {
  
}

Menu.prototype.toggleMenu = function() {
  document.getElementById("menu").classList.toggle("menu-open");
};
Menu.prototype.toggleOpenMenuButton = function(isVisible) {
  document.getElementById("menu-side-btn").style.display = isVisible ? "block" : "none";
}
module.exports = Menu;