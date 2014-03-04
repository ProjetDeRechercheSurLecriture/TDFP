/**
 * @module ui/tdfp.reel
 * @requires oprime-montage/ui/experiment
 */
var Experiment = require("oprime-montage/ui/experiment.reel").Experiment,
    designToForceIncludeInMop = require("assets/stimuli/tdfp_design.json");
// sampleResultToForceIncludeInMop = requi re("assets/stimuli/tdfp_sample_result.json");

var enLocales = require("assets/stimuli/locale/en/messages.json");
var frLocales = require("assets/stimuli/locale/fr/messages.json");
var iuLocales = require("assets/stimuli/locale/iu/messages.json");


/**
 * @class TDFP
 * @extends Experiment
 */
var TDFP = exports.TDFP = Experiment.specialize( /** @lends TDFP# */ {
    constructor: {
        value: function TDFP() {
            // console.log(designToForceIncludeInMop);
            this.experimentalDesignSrc = "assets/stimuli/tdfp_design.json";
            this.super();
            this.loadDesign(designToForceIncludeInMop);

            this.contextualizer.addMessagesToContextualizedStrings(enLocales, "en");
            this.contextualizer.addMessagesToContextualizedStrings(frLocales, "fr");
            this.contextualizer.addMessagesToContextualizedStrings(iuLocales, "iu");

            this.application.currentStimuliDialect = {
                "iso": "fr",
                "name": "French",
                "nativeName": "français"
            };
            this.contextualizer.currentLocale = this.application.currentStimuliDialect.iso;
        }
    },

    experimentType: {
        value: "tdfp"
    },

    handleStartExperimentPress: {
        value: function() {
            console.log("start button action ");
        }
    },

    transform: {
        value: function() {

        }
    }
});

exports.Tdfp = TDFP;
