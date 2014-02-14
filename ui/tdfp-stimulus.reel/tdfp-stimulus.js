/**
 * @module ui/tdfp-stimulus.reel
 * @requires core/contextualizable-component
 */
var AbstractStimulus = require("oprime-montage/core/abstract-stimulus").AbstractStimulus;

/**
 * @class TdfpStimulus
 * @extends AbstractStimulus
 */
exports.TdfpStimulus = AbstractStimulus.specialize( /** @lends TdfpStimulus# */ {
  constructor: {
    value: function TdfpStimulus() {
      this.super();
    }
  },
  load: {
    value: function(stimulus) {

      var imagePath = this.imageAssetsPath || "missingpath";
      imagePath += "/";
      var audioPath = this.audioAssetsPath || "missingpath";
      audioPath += "/";

      stimulus.audioFile = audioPath + stimulus.audioFile;
      stimulus.primeImage = imagePath + stimulus.primeImage;

      this.super(stimulus);
    }
  }
});
