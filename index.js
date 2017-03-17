#!/usr/bin/env node
var exec = require('child_process').exec;
var fs = require('fs');
var program = require('commander');

console.log('Let\'s play GIFPARDY!.');
console.log('Note that GIFPARDY requires ffmpeg and gifsicle to be installed (https://github.com/ngokevin/gifpardy#system-dependencies)');

program
  .arguments('<videoFile> [outFile]')
  .option('-r, --resolution [resolution]', 'GIF resolution [900x600]', '900x600')
  .option('-d, --delay [delay]', 'Delay in between frames to control speed. Higher is slower. [6]', '6')
  .action(function doConversion (videoFile, outFile, options) {
    // Check video file.
    if (!fs.existsSync(videoFile)) {
      throw new Error('Source video was not found: ' + videoFile);
    }

    // Output filename.
    var outFile = outFile || (videoFile.split('.').slice(0, -1).join('.') + '.gif');

    // Build command.
    var command = [
      'ffmpeg -i ' + videoFile,
      '-s ' + options.resolution,
      '-pix_fmt rgb24 -r 7 -f gif -',
      '|',
      'gifsicle --optimize=3',
      '--delay=' + options.delay,
      '>',
      outFile
    ].join(' ');

    // Run command.
    console.log(command);
    exec(command, {stdio: 'inherit'}, function (err, stdout, stderr) {
      if (err) { console.log(err); }
      if (stdout) { console.log(stdout); }
      if (stderr) { console.log(stderr); }
    });
  })
  .parse(process.argv);
