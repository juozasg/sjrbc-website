import { Controller } from "@hotwired/stimulus"


export default class extends Controller {

  connect() {
    console.log("connected LegendController:");
    console.log(this);
    this.element[this.identifier] = this;
  }

  changed(e) {
    console.log("legend changed");
    console.log(e);
  }
}