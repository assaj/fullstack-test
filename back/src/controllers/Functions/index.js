const validParams = ['model','brand','price','photo','startDate','endDate','color','code', '']

function verifyModel(model) {
  let modelLength = model.replace(' ','').length
  return functions.isAlphaNumeric(model) && modelLength >= 2 && modelLength <= 255
}

function verifyPrice(price) {
  let numberPrice = parseInt(price)
  return  functions.stringIsNumber(price) && numberPrice >= 0
}

function verifyPhoto(photoUrl) {
  let photoUrlLength = photoUrl.replace(' ','').length
  return photoUrlLength <= 255
}

function verifyStartDate(startDate) {
  return functions.dateIsLessThan('2018-12-25', startDate)
}

function verifyEndDate(startDate, endDate) {
  return functions.dateIsLessThan(startDate, endDate)
}

function verifyColor(color) {
  color = color.toUpperCase()
  color = color.replace(' ','')
  if(functions.colorIsValid(color)){
    return true
  }else{
    return false
  }
}

function verifyCode(code) {
  return code.length === 8 && functions.isAlphaNumeric(code)
}

const functions = {
  extractParams : (string) => {
    if(string === ''){
      return ''
    }
    string = string.split(',')
    let list = {}
    string.forEach(parameter => {
      if(validParams.includes(parameter)){
        list[parameter] = 1
      }else{
        throw {
          message : 'Parameter not exist',
          description : '',
          code : 400
        }
      }
    });
    return list
  },
  verifyAllParameters : (body) => {
    const {model, brand, price, photo, startDate, endDate, color, code} = body
  if(
      verifyModel(model)
      && verifyModel(brand)
      && verifyPrice(price)
      && verifyPhoto(photo)
      && verifyStartDate(startDate)
      && verifyEndDate(startDate, endDate)
      && verifyColor(color)
      && verifyCode(code)
  ){
     return true
  }else{
    throw{
      message : 'Some Field are not correct',
       code : 400
     }
  }
  },
  isAlphaNumeric : (string) => {
    let oldSize = string.length
    string = string.replace(/\W/g, '')
    return string.length === oldSize
  },
  stringIsNumber : (string) =>{
    let number = parseInt(string)
    if(isNaN(number)){
      return false
    }else{
      number = number.toString()
      return number.length === string.length
    }
  },
  colorIsValid : (color) => {
    return (
      color === 'BLACK'
      || color === 'WHITE'
      || color === 'GOLD'
      || color === 'PINK'
    )
  },
  dateIsLessThan : (date1, date2) => {
    try{
      return new Date(date1) < new Date(date2)
    }catch(e){
      return false
    }
  },
}

module.exports = functions