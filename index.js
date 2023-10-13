const app = require('express')()
const port = 8080


const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json');

app.get('/games' , (req, res) => {
    res.send(["Witcher 3", "Multi Theft Auto"])
})


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})