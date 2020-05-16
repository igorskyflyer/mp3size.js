'use strict'

/**
 * *mp3size.js*
 *
 * Calculates an estimated file size of Mp3 files.
 *
 * Author: Igor Dimitrijević <igor.dvlpr@gmail.com>, 2020.
 * License: MIT, see LICENSE.
 *
 * Note: does NOT validate any input, that's up to you. :)
 */

/**
 * File size per second for each bitrate, see http://www.audiomountain.com/tech/audio-file-size.html.
 *
 * Format: bitrate/file size (in kbps/KB)
 */
const bitrateSizes = {
  8: 1,
  16: 2,
  32: 4,
  40: 5,
  48: 6,
  56: 7,
  64: 8,
  80: 10,
  96: 12,
  112: 14,
  128: 16,
  160: 20,
  192: 24,
  224: 28,
  256: 32,
  320: 40,
}

/**
 * Gets the size of 1 second of Mp3 file for the provided bitrate.
 * @param {number} rate the bitrate, defaults to 160
 * @returns {number}
 */
function getBitrate(rate = 160) {
  if (rate in bitrateSizes) {
    return bitrateSizes[rate]
  } else {
    return bitrateSizes[160]
  }
}

/**
 * Parses and returns the time of the Mp3 file.
 * @param {string} time expects HH:MM:ss or MM:ss formatted string
 * @returns {number} the number of seconds or -1 if the provided input is not valid
 */
function getAudioLength(time) {
  try {
    if (typeof time === 'string') {
      const params = time.split(':')
      const count = params.length

      // assuming MM:ss format
      if (count === 2) {
        const minutes = params[0]
        const seconds = params[1]

        return minutes * 60 + seconds * 1
      }
      // assuming HH:MM:ss format
      else if (count === 3) {
        const hours = params[0]
        const minutes = params[1]
        const seconds = params[2]

        return hours * 3600 + minutes * 60 + seconds * 1
      }
    } else {
      return -1
    }
  } catch {
    return -1
  }

  return -1
}

/**
 * Gets the estimated size of the Mp3 file based on the audio time and bitrate.
 * @param {string} time the length of the Mp3 file
 * @param {number} bitrate the bitrate of the file, defaults to 160
 * @returns {string} the estimated Mp3 file size or 0KB in case of an error
 */
function getFileSize(time, bitrate = 160) {
  const audioLength = getAudioLength(time)

  if (audioLength !== -1) {
    const size = audioLength * getBitrate(bitrate)

    return `${size}KB`
  } else {
    return '0KB'
  }
}
