const CellPhone = require('../models/Cellphone')
const functions = require('./Functions/index')
module.exports = {
  async index(req, res){
    let listToSort
    try{
      listToSort = functions.extractParams(req.query.researchBy)
    }catch(e){
      res.status(e.code).send(e.message)
    }
    let answer
    try{
      if(listToSort !== ''){
        answer = await CellPhone.find().sort( listToSort )
      }else{
        answer = await CellPhone.find()
      }
    }catch(e){
      res.status(500).send('Internal error')
    }
    return res.json(answer)
  },
  async store(req, res){
    try{
      functions.verifyAllParameters(req.body)

      const {model, price, brand, photo, startDate, endDate, color, code} = req.body
      let answer
      try{
        answer = await CellPhone.create({
          model : model,
          price : price,
          brand : brand,
          photo : photo,
          startDate : new Date(startDate),
          endDate : new Date(endDate),
          color : color,
          code : code
          })
        return res.json(answer)
      }catch(e){
        if(e.code === 11000){
          throw{
            code : 400,
            message : 'Code already exist'
          }
        }else{
          throw{
            code : 500,
            message : 'Internal error'
          } 
        }
      }
    }catch(e){
        res.status(e.code).send(e.message)
    }
  },
  async update(req, res){
    try{
      functions.verifyAllParameters(req.body)

      const {model, price, brand, photo, startDate, endDate, color, code} = req.body
      const element = await CellPhone.find({ code: { $eq: code } })
      if(element.length === 0){
        throw{
          code : 400,
          message : 'Code not exist'
        } 
      }
      try{
        const document = await CellPhone.findById(element[0]._id)
        document.model = model
        document.price = price
        document.brand = brand
        document.photo = photo
        document.startDate = startDate
        document.endDate = endDate
        document.color = color
        document.save()
        return res.send(document)
        
      }catch(e){
        throw{
          code : 500,
          message : 'Internal error'
        } 
      }
    }catch(e){
        res.status(e.code).send(e.message)
    }
  },
  async remove(req, res){
    const document = await CellPhone.findById(req.body._id)
    
    document.remove()
    document.save()

    return res.send(document)
  }
}