// Load all the controllers within this directory and all subdirectories. 
// Controller files must be named *_controller.js.

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
//import 'bootstrap/dist/css/bootstrap.css';
//import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!

const application = Application.start()
const context = require.context("controllers", true, /_controller\.js$/)
application.load(definitionsFromContext(context))
