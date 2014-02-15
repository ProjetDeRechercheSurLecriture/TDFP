/**
 * @module ui/tdfp-stimulus.reel
 * @requires oprime-montage/core/abstract-stimulus
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
      // this.confirmResponseChoiceMessage = "Es tu sûr?";
      // this.primeImage = "";
      // this.audioFile = "";
      this.canPlayButton1 = true;

    }
  },

  load: {
    value: function(stimulus) {

      var imagePath = this.imageAssetsPath || "missingpath";
      imagePath += "/";
      var audioPath = this.audioAssetsPath || "missingpath";
      audioPath += "/";

      stimulus.auditoryFileSpontaneousQuestion1 = audioPath + stimulus.auditoryFileSpontaneousQuestion1;
      stimulus.audioFileSpontaneousQuestion2 = audioPath + stimulus.audioFileSpontaneousQuestion2;
      stimulus.audioFileDelayedImitation = audioPath + stimulus.audioFileDelayedImitation;
      stimulus.audioFileImmediateImitation = audioPath + stimulus.audioFileImmediateImitation;
      stimulus.primeImage = imagePath + stimulus.primeImage;
      
      stimulus.audioFile = stimulus.auditoryFileSpontaneousQuestion1;
      this.super(stimulus);
    }
  },


  spontaneousQuestion1: {
    value: function() {
      console.log("Button 1 is pressed ");

      this.playAudio(this.auditoryFileSpontaneousQuestion1);
      this.canPlayButton2 = true;
    }
  },


  spontaneousQuestion2: {
    value: function() {
      console.log("Button 2 is pressed ");

      this.playAudio(this.auditoryFileSpontaneousQuestion2);
      this.canPlayButton1 = false;
      this.canPlayButton3 = true;

    }
  },

  delayedImitation: {
    value: function() {
      console.log(" Button 3 is pressed ");

      this.playAudio(this.audioFileDelayedImitation);
      this.canPlayButton2 = false;
      this.canPlayButton4 = true;

    }
  },

  immediateImitation: {
    value: function() {
      console.log(" Button 4 is pressed ");

      this.playAudio(this.audioFileImmediateImitation);
      this.canPlayButton3 = false;

    }
  }

});
