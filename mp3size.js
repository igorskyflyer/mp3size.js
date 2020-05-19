'use strict'

/**
 * *mp3size.js*
 *
 * Calculates an estimated file size of MP3 files.
 *
 * Author: Igor Dimitrijević <igor.dvlpr@gmail.com>, 2020.
 * Version: 1.1.1
 * License: MIT, see LICENSE.txt.
 *
 * Note: does NOT validate any input, that's up to you. :)
 */

/**
 * Gets the size of 1 second of MP3 file for the provided bitrate.
 * @private
 * @param {number} rate the bitrate, defaults to 160Kbps
 * @returns {number} the size of 1 second of MP3 file in bits
 */
function bitrateInBits(rate = 160) {
  if (rate >= 8) {
    return rate / 8
  } else {
    return 160 / 8
  }
}

/**
 * Returns the size in bits.
 * @private
 * @param {number} size the input value
 * @returns {number} the size in bits
 */
function sizeInBits(size) {
  return size * 8
}

/**
 * Parses and returns the duration of the MP3 file.
 * @private
 * @param {string} time expects HH:MM:ss or MM:ss formatted string
 * @returns {number} the number of seconds or -1 if the provided input is not valid
 */
function getDuration(time) {
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
  } catch (e) {
    return -1
  }
}

/**
 * Pads the number, internal use only.
 * @private
 * @param {number} value the number to pad
 * @returns {string} a string that contains the the padded value
 */
function padNumber(value) {
  if (value < 10) {
    return '0' + value
  } else {
    return value + ''
  }
}

/**
 * Gets the estimated size of the MP3 file based on the audio time and bitrate.
 * @public
 * @param {string} time the duration of the MP3 file
 * @param {number} rate the bitrate of the file, defaults to 160
 * @returns {number} the estimated MP3 file size (in KB) or -1 in case of an error
 */
function getFileSize(time, rate = 160) {
  const audioDuration = getDuration(time)

  if (audioDuration > -1) {
    return audioDuration * bitrateInBits(rate)
  } else {
    return -1
  }
}

/**
 * Gets the estimated audio duration for the provided file size and bitrate.
 * @public
 * @param {number} size file size (in KB)
 * @param {number} rate bitrate (in Kbps)
 * @returns {string} the estimated audio duration formatted as HH:MM:ss or '-1' in case of an error
 */
function getAudioDuration(size, rate) {
  if (!size || !rate || size === 0 || rate > size) {
    return '-1'
  } else {
    try {
      let audioDuration = sizeInBits(size) / rate

      if (audioDuration > 0) {
        audioDuration = Math.round(audioDuration)

        const hours = padNumber(parseInt(audioDuration / 3600))
        const minutes = padNumber(parseInt((audioDuration - hours * 3600) / 60))
        const seconds = padNumber(parseInt(audioDuration % 60))

        return hours + ':' + minutes + ':' + seconds
      } else {
        return '00:00:00'
      }
    } catch (e) {
      return '-1'
    }
  }
}

/**
 * Gets the estimated bitrate for the provided audio duration and file size.
 * @public
 * @param {string} time the duration of the audio
 * @param {number} size the size of the audio file (in KB)
 * @returns {number} the estimated bitrate or -1 in case of an error
 */
function getAudioBitrate(time, size) {
  const audioDuration = getDuration(time)

  if (audioDuration > -1) {
    try {
      return Math.round(sizeInBits(size) / audioDuration)
    } catch (e) {
      return -1
    }
  } else {
    return -1
  }
}
