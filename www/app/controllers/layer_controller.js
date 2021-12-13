import { Controller } from "@hotwired/stimulus"


export default class extends Controller {
  static values = {
    layerIdValue: {default: "datainfo", type: String}
  }

  connect() {
    console.log("connected LayerController:");
    console.log(this);
    this.element[this.identifier] = this;

  }

  selected(e) {
    // this.selectedLayerValue = e.target.id;
    this.layerIdValue = e.params.id

    $(this.element).find(".active").removeClass("active");
    $(e.target).addClass("active");
    $(e.target).parents('.dropdown-content').prev('.dropdown-trigger').addClass("active");

    this.dispatch("selected", { selectedLayer: e.target.id } );

  }

  layerIdValueChanged(v, previous) {
    console.log(`${previous} -> ${v}`);
  }
}

