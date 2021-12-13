import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    console.log("connected MapController");
    console.log(this);
    this.element[this.identifier] = this;

  }

  changed(e) {
    console.log("map changed");
    console.log(e.detail);
    this.dispatch("changed", e.detail );
  }
}