const express = require('express')
// import express from 'express'

const app = express()
const hostname = 'localhost'
const port = 3000
app.get('/', function (req, res) {
    res.send('<h1>Hello World NodeJs VongNguyenDev</h1>')
})

app.listen(port, hostname, () => {
    console.log(`Hello VongNguyen, I'm running sever at http://${hostname}:${port}`)
})