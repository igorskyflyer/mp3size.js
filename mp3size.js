'use strict'

/**
 * *mp3size.js*
 *
 * Calculates an estimated file size of Mp3 files.
 *
 * Author: Igor Dimitrijević <igor.dvlpr@gmail.com>, 2020.
 * Version: 1.1
 * License: MIT, see LICENSE.
 *
 * Note: does NOT validate any input, that's up to you. :)
 */

/**
 * Gets the size of 1 second of Mp3 file for the provided bitrate.
 * @private
 * @param {number} rate the bitrate, defaults to 160
 * @returns {number} the size of 1 second of Mp3 file
 */
function getBitrate(rate = 160) {
  if (rate >= 8) {
    return rate / 8
  } else {
    return 160 / 8
  }
}

/**
 * Parses and returns the time of the Mp3 file.
 * @private
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
      } else {
        return -1
      }
    } else {
      return -1
    }
  } catch {
    return -1
  }
}

/**
 * Gets the estimated size of the Mp3 file based on the audio time and bitrate.
 * @public
 * @param {string} time the length of the Mp3 file
 * @param {number} rate the bitrate of the file, defaults to 160
 * @returns {string} the estimated Mp3 file size or 0KB in case of an error
 */
function getFileSize(time, rate = 160) {
  const audioLength = getAudioLength(time)

  if (audioLength !== -1) {
    const size = audioLength * getBitrate(rate)

    return `${size}KB`
  } else {
    return '0KB'
  }
}
