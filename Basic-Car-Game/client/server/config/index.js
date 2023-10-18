'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

app.use(express.static(path.join(_dirname, './../../dist/client')))
app.use('/assets', express.static(path.join(_dirname, './../../client/assets')))
app.use('/vendor', express.static(path.join(_dirname, './../../vendor')))
app.use(cors())

module.exports = app