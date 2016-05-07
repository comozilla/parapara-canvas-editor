import ColorPickerView from "./view/color-picker-view";
import LineWidthPickerView from "./view/line-width-picker-view";
import MenuView from "./view/menu-view";
import SequenceView from "./view/sequence-view";
import PlayerView from "./view/player-view";
import eventPublisher from "./publisher";

class ViewManager{
  constructor(){
    this.colorPicker =
    new ColorPickerView(document.getElementById("menu-colors"));
  eventPublisher.subscribe("defaultPalleteColors", (colors) => {
    this.colorPicker.clearPalette();
    colors.forEach(color => {
      this.colorPicker.addPalette(color);
    });
  });

  this.lineWidthPicker = new LineWidthPickerView(
    document.getElementById("menu-line-width"));

  this.sequenceEditor =
    new SequenceView(document.getElementById("thumbnails"), framesController);

  this.player = new PlayerView(document.getElementById("play-btn"));
  this.menu = new MenuView();
  }
}
export default ViewManager;
