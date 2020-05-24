# mp3size.js

<p align="center" style="text-align: center; margin: auto">
	<img src="https://github.com/igorskyflyer/mp3size.js/raw/master/public/mp3size.js.png">
	<h3 align="center">Calculates an estimated file size of MP3 files.</h3>
	<br>
	<h4 align="center">Since version 1.1.0 calculations of audio duration and audio bitrate are supported!</h4>
</p>
<br>

### Usage

`getFileSize(time: string, rate: number = 160): number`

> Gets the estimated size of the MP3 file based on the audio duration and bitrate.

- **time**: _string_, the duration of the MP3 file, expects either HH:MM:ss or MM:ss format

- **rate**: _number_, the bitrate of the file, defaults to 160

returns a number, the estimated MP3 file size or -1 in case of an error

<br>

`getAudioDuration(size: number, rate: number): string`

> Gets the estimated audio duration for the provided file size and bitrate.

- **size**: _number_, file size (in KB)

- **rate**: _number_, the bitrate of the file

returns a string, the estimated audio duration formatted as HH:MM:ss or '-1' in case of an error.

<br>

`getAudioBitrate(time: string, size: number): number`

> Gets the estimated bitrate for the provided audio duration and file size.

- **time**: _string_, the duration of the MP3 file, expects either HH:MM:ss or MM:ss format

- **size**: _number_, the size of the audio file (in KB)

returns a number, the estimated bitrate of the MP3 file or -1 in case of an error

<br>

<p align="center" style="text-align: center; margin: auto;font-style: italic;">If you like this project please consider donating to keep it alive, see <a href="https://github.com/igorskyflyer/mp3size.js/#">this</a> and click on the Sponsor button at the top.</p>
