"use strict";

const util      = require('util');
const spawn     = require('child_process').spawn;
const merge     = require('mout/object/merge');

const Server    = require('./_server');

let streamer;

class RpiServer extends Server {

  constructor(server, opts) {
    super(server, merge({
      fps : 12,
    }, opts));
  }



  init_feed() {
    var msk = "raspivid -t 0 -o - -w %d -h %d -fps %d";
    var cmd = util.format(msk, this.options.width, this.options.height, this.options.fps);
    console.log(cmd);
    streamer = spawn('raspivid', ['-t', '0', '-o', '-', '-w', this.options.width, '-h', this.options.height, '-fps', this.options.fps, '-pf', 'baseline']);
    streamer.on("exit", function(code){
      console.log("Failure", code);
    });

    
  }
  get_feed(){
    return streamer.stdout;
  }

};



module.exports = RpiServer;
