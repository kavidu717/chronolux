import express from 'express'




const app = express()


app.get('/', (req, res) => {
    res.send('backend running kaviduheloo with docker hello neda kavidu')
})


app.listen(5000, () => {
    console.log('Server is runningoi onyu port 5000 ')
})