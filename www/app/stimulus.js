import { Application } from "@hotwired/stimulus"
window.Stimulus = Application.start()

import LayerController from "./controllers/layer_controller.js"
Stimulus.register("layer", LayerController);


import MapController from "./controllers/map_controller.js"
Stimulus.register("map", MapController);


import LegendController from "./controllers/legend_controller.js"
Stimulus.register("legend", LegendController);

