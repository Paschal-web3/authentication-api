const controller = require ('../Controller/UserControl')
const route = require("express").Router()


route.post('/create', controller.createUser)
route.post('/login', controller.Login)
route.get('/getall', controller.getuser)
route.get('/get/:id', controller.getUserbyId)
route.put('/update/:id', controller.updateUser)
route.delete('/delete/:id', controller.deleteUser)



module.exports = route