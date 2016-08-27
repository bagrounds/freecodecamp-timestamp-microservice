/**
 * freecodecamp-timestamp-microservice
 *
 * Assignment:
 * https://www.freecodecamp.com/challenges/timestamp-microservice
 */
;(function () {
  'use strict'

  /* imports */
  var express = require('express')
  var moment = require('moment')
  var chrono = require('chrono-node')
  var pkg = require('./package')

  var PORT = process.env.PORT || 8080
  var app = express()

  // redirect to homepage
  app.get('/', function (request, response) {
    response.redirect(pkg.homepage)
  })

  // handle dates and timestamps
  app.get('/:date', function (request, response) {
    var date = request.params.date

    response.json(interpretDate(date))
  })

  app.listen(PORT, function () {
    console.log('Listening on port ' + PORT)
  })

  /**
   * Takes a date string and returns an object containing the unix timestamp
   * and a date string in a form like: 'August 26, 2016'
   *
   * @function interpretDate
   *
   * @param {String} date a string describing a date
   * @return {Object} unix timestamp and a 'natural' date string
   */
  function interpretDate (date) {
    var result = {
      unix: null,
      natural: null
    }

    // chrono doesn't handle unix timestamps, so use moment
    if (/^\d+$/.test(date)) {
      date = moment(date, 'X').format()
    }

    // chrono parses all kinds of messy date inputs
    date = chrono.parseDate(date)

    if (!date) {
      return result
    }

    // insert formatted values into result
    result.natural = moment(date).format('MMMM D, YYYY')
    result.unix = moment(date).format('X')

    return result
  }
})()

