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

            stimulus.audioFileSpontaneousQuestion1 = audioPath + stimulus.audioFileSpontaneousQuestion1;
            stimulus.audioFile = stimulus.audioFileSpontaneousQuestion1;
            stimulus.audioFileSpontaneousQuestion2 = audioPath + stimulus.audioFileSpontaneousQuestion2;
            stimulus.audioFileDelayedImitation = audioPath + stimulus.audioFileDelayedImitation;
            stimulus.audioFileImmediateImitation = audioPath + stimulus.audioFileImmediateImitation;
            stimulus.primeImage = imagePath + stimulus.primeImage;
            stimulus.responses = [];
            
            this.super(stimulus);
            this.primesUsed = [{
                medium: "visual",
                file: stimulus.primeImage,
                timestamp: Date.now()
            }];

            this.canPlayButton1 = false;
            this.canPlayButton2 = false;
            this.canPlayButton3 = false;
            this.canPlayButton4 = false;

            this.spontaneousQuestion1();
        }
    },


    spontaneousQuestion1: {
        value: function() {
            console.log("Button 1 is pressed ");

            this.application.audioPlayer.play(this.audioFileSpontaneousQuestion1);
            this.primesUsed.push({
                medium: "auditory",
                type: "SpontaneousQuestion1",
                file: this.audioFileSpontaneousQuestion1,
                timestamp: Date.now()
            });
            this.canPlayButton1 = false;
            this.canPlayButton2 = true;
        }
    },


    spontaneousQuestion2: {
        value: function() {
            console.log("Button 2 is pressed ");

            this.application.audioPlayer.play(this.audioFileSpontaneousQuestion2);
            this.primesUsed.push({
                medium: "auditory",
                type: "SpontaneousQuestion2",
                file: this.audioFileSpontaneousQuestion2,
                timestamp: Date.now()
            });
            this.canPlayButton1 = false;
            this.canPlayButton2 = false;
            this.canPlayButton3 = true;

        }
    },

    delayedImitation: {
        value: function() {
            console.log(" Button 3 is pressed ");

            this.application.audioPlayer.play(this.audioFileDelayedImitation);
            this.primesUsed.push({
                medium: "auditory",
                type: "DelayedImitation",
                file: this.audioFileDelayedImitation,
                timestamp: Date.now()
            });
            this.canPlayButton2 = false;
            this.canPlayButton3 = false;
            this.canPlayButton4 = true;

        }
    },

    immediateImitation: {
        value: function() {
            console.log(" Button 4 is pressed ");

            this.application.audioPlayer.play(this.audioFileImmediateImitation);
            this.primesUsed.push({
                medium: "auditory",
                type: "ImmediateImitation",
                file: this.audioFileImmediateImitation,
                timestamp: Date.now()
            });
            this.canPlayButton3 = false;

        }
    },

    calculateProductionDifficulty: {
        value: function() {
            var difficulty = 0;
            if (this.primesUsed.length === 2) {
                return difficulty;
            }
            var primes = {};
            this.primesUsed.map(function(prime) {
                if (!primes[prime.type]) {
                    primes[prime.type] = 1;
                    difficulty++;
                }
            });
            difficulty = difficulty - 2; //visual and first audio are normal
            console.log("Difficulty was roughly " + difficulty + "/ 5");
            return difficulty / 4;
        }
    },

    handleCorrectAction: {
        value: function() {
            console.log(" Button Correct is pressed ");
            var difficulty = this.calculateProductionDifficulty();
            this.addOralResponse({
                score: 1 - difficulty,
                productionDifficulty: difficulty,
                primes: this.primesUsed
            });
        }
    },

    handleIncorrectAction: {
        value: function() {
            console.log(" Button Incorrect is pressed ");
            this.addOralResponse({
                score: 0,
                productionDifficulty: this.calculateProductionDifficulty(),
                primes: this.primesUsed
            });
        }
    }

});
