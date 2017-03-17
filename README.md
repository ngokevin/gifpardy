# GIFPARDY

What is a command-line video-to-GIF maker?

![gifpardy](https://cloud.githubusercontent.com/assets/674727/24027740/06b1fa1e-0a87-11e7-8c1a-34a2a8402e21.png)

## Usage

Path to source video is the only required argument.

If the GIF output filename is not given, the source video filename will be used
as a base.

```sh
gifpardy in.mp4
gifpardy in.mp4 out.gif
gifpardy --r 320x240 --d 8 in.mp4
gifpardy --resolution 1200x800 --delay 5 in.mp4 out.gif
```

| Option           | Description                                                    | Default Value |
|------------------|----------------------------------------------------------------|---------------|
| -d, --delay      | How much time to wait between frames in hundreths of a second. | 6             |
| -r, --resolution | GIF resolution.                                                | 600x400       |

## System Dependencies

Requires ffmpeg and gifsicle.

- [ffmpeg](https://ffmpeg.org/)
  - `brew install ffmpeg`
  - `sudo apt-get install ffmpeg`
  - [Windows](https://ffmpeg.org/download.html#build-windows)
- [gifsicle](https://www.lcdf.org/gifsicle/)
  - `brew install gifsicle`
  - `sudo apt-get install gifsicle`
  - [Windows](https://eternallybored.org/misc/gifsicle/)

## Under the Hood

gifpardy calls a command that looks like this:

```sh
ffmpeg -i in.mp4 -s 600x400 -pix_fmt rgb24 -r 7 -f gif - | gifsicle --optimize=3 --delay=6 > out.gif
```

## Taking a Screen Capture

Want to make a screen capture GIF, but don't know which screen recording tool
to use?

- On Windows, try [OBS Studio](https://obsproject.com/).
- On OS X, use QuickTime Player's screen recording tool (`<cmd> + ^ + N`).

Then run GIFPARDY on the output video.
