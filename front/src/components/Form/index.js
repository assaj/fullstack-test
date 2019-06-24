import React from 'react'
import { Button, Label, Input } from 'reactstrap'
import server from '../../services/server'

import './Form.css'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title : '',
      model : '',
      price : 0,
      brand : '',
      photo : '',
      startDate : '',
      endDate : '',
      color : '',
      code : '',
      modelErrorText : '',
      modelSucessText : '',
      brandErrorText : '',
      brandSucessText : '',
      priceErrorText : '',
      priceSucessText : '',
      photoErrorText : '',
      photoSucessText : '',
      colorErrorText : '',
      colorSucessText : '',
      codeErrorText : '',
      codeSucessText : '',
      submitErrorText : '',
      submitText : '',
      submitLoad : ''
    }
    this.checkFormField = this.checkFormField.bind(this)
    this.SubmitForm = this.SubmitForm.bind(this)
    this.UpdateForm = this.UpdateForm.bind(this)
}

  checks = {
    model: (value) => {
      let valueLength = value.replace(' ','').length
      if(!this.checks.auxiliaryFunctions.isAlphaNumeric(value)){
        this.setState({ modelSucessText : ''})
        this.setState({ modelErrorText: 'Just numbers and letters' })
      }else if(valueLength < 2){
        this.setState({ modelSucessText : ''})
        this.setState({ modelErrorText: 'Needs to have at lest 2 letters' })
      }else if(valueLength > 255){
        this.setState({ modelSucessText : ''})
        this.setState({ modelErrorText: 'Needs to have at most 255 letters' })
      }else{
        this.setState({ modelErrorText: '' })
        this.setState({ modelSucessText : 'Ok!'})
      }
      this.setState({ model: value })
    },
    price: (value) => {
      let numberValue = parseInt(value)
      if(!this.checks.auxiliaryFunctions.stringIsNumber(value)){
        this.setState({ priceErrorText: 'Needs to have a number' })
        this.setState({ priceSucessText: '' })
      }else if(numberValue < 0){
        this.setState({ priceErrorText: "It's can't be negative"  })
        this.setState({ priceSucessText: '' })
      }else {
        this.setState({ priceErrorText: '' })
        this.setState({ priceSucessText: 'Ok!' })
      }
      this.setState({ price: value })
    },
    brand: (value) => {
      let valueLength = value.replace(' ','').length
      if(!this.checks.auxiliaryFunctions.isAlphaNumeric(value)){
        this.setState({ brandErrorText: 'Just numbers and letters' })
        this.setState({ brandSucessText: '' })
      }else if(valueLength < 2){
        this.setState({ brandErrorText: 'Needs to have at lest 2 letters' })
        this.setState({ brandSucessText: '' })
      }else if(valueLength > 255){
        this.setState({ brandErrorText: 'Needs to have at most 255 letters' })
        this.setState({ brandSucessText: '' })
      }else{
        this.setState({ brandErrorText: '' })
        this.setState({ brandSucessText: 'Ok!' })
      }
      this.setState({ brand: value })
    },
    photo: (value) => {
      let valueLength = value.replace(' ','').length
      if(valueLength > 255){
        this.setState({ photoErrorText: 'Needs to have at most 255 letters' })
        this.setState({ photoSucessText: '' })
      }else{
        this.setState({ photoErrorText: '' })
        this.setState({ photoSucessText: 'Ok!' })
      }
      this.setState({ photo: value })
    },
    startDate : (value) => {
      if(this.checks.auxiliaryFunctions.dateIsLessThan('2018-12-25', value)){
        this.setState({ startDateErrorText: ''})
        this.setState({ startDateSucessText: 'Ok!' })
      }else{
        this.setState({ startDateErrorText: 'Date needs to be greater than 25/12/2018'})
        this.setState({ startDateSucessText: '' })
      }
      this.setState({ startDate: value })
    },
    endDate : (value) => {
      if(this.checks.auxiliaryFunctions.dateIsLessThan(this.state.startDate, value)){
        this.setState({ endDateErrorText: ''})
        this.setState({ endDateSucessText: 'Ok!' })
      }else{
        this.setState({ endDateErrorText: 'End date needs to be greater than start Date'})
        this.setState({ endDateSucessText: '' })
      }
      this.setState({ endDate: value })
    },
    color : (value) => {
      value = value.toUpperCase()
      value = value.replace(' ','')
      this.setState({ color: value })
      if(this.checks.auxiliaryFunctions.colorIsValid(value)){
        this.setState({ colorErrorText: ''})
        this.setState({ colorSucessText: 'Ok!' })
      }else{
        this.setState({ colorErrorText: 'Select one color of the Options(BLACK, WHITE, GOLD, PINK )'})
        this.setState({ colorSucessText: '' })
      }
    },
    code : async (value) => {
      this.setState({ loadCode : true})
      if(!this.checks.auxiliaryFunctions.isAlphaNumeric(value)){
        this.setState({ codeErrorText: 'Just numbers and letters' })
        this.setState({ codeSucessText: '' })
      }else if(value.length !== 8){
        this.setState({ codeErrorText: 'Code needs to have 8 digits' })
        this.setState({ codeSucessText: '' })
      }else{
        try{
          let flag = true
          await server.get('./cellphones/?researchBy=').then( responde => {
            responde.data.forEach(data => {
              if(data.code === value){
                flag = false
              }
            })
          })
          if(!flag){
            this.setState({ codeErrorText: 'Code already exist, if you are trying to create, try another one' })
            this.setState({ codeSucessText: '' })
          }else{
            this.setState({ codeErrorText: '' })
            this.setState({ codeSucessText: 'Ok!' })
          }
        }catch(e){
          this.setState({ codeErrorText: 'Server not Found' })
          this.setState({ codeSucessText: '' })

          this.setState({ code: value})
          this.setState({ loadCode : false})
        }
      }
      this.setState({ code: value})
      this.setState({ loadCode : false})
    }, auxiliaryFunctions : {
        isAlphaNumeric(string){
          let oldSize = string.length
          string = string.replace(/\W/g, '')
          return string.length === oldSize
        },
        stringIsNumber(string){
          let number = parseInt(string)
          if(isNaN(number)){
            return false
          }else{
            number = number.toString()
            return number.length === string.length
          }
        },
        convertDate(string){
          let parts = string.split('-')
          let date = parts[2]
          date += '-'
          date += parts[1]
          date += '-'
          date += parts[0]
          return date
        },
        dateIsLessThan(date1, date2){
          return new Date(date1) < new Date(date2)
        },
        colorIsValid(color){
          return (
            color === 'BLACK'
            || color === 'WHITE'
            || color === 'GOLD'
            || color === 'PINK'
          )
        }
      }
  }

  clearFields(){
    this.setState({model : ''})
    this.setState({price : ''})
    this.setState({brand : ''})
    this.setState({photo : ''})
    this.setState({startDate : ''})
    this.setState({endDate : ''})
    this.setState({color : ''})
    this.setState({code : ''})

    this.setState({modelSucessText : ''})
    this.setState({priceSucessText : ''})
    this.setState({brandSucessText : ''})
    this.setState({photoSucessText : ''})
    this.setState({startDateSucessText : ''})
    this.setState({endDateSucessText : ''})
    this.setState({colorSucessText : ''})
    this.setState({codeSucessText : ''})
    this.setState({codeErrorText : ''})
  }

  checkFormField(event){
    this.checks[event.target.name](event.target.value)
    this.setState({ submitText : ''})
    this.setState({ submitErrorText: ''})
  }

  checkAllFormFields(){
    let {brandSucessText, priceSucessText, modelSucessText, photoSucessText, colorSucessText, codeSucessText, startDateSucessText, endDateSucessText} = this.state
    return (
      brandSucessText === 'Ok!'
      && priceSucessText === 'Ok!'
      && modelSucessText === 'Ok!'
      && photoSucessText === 'Ok!'
      && colorSucessText === 'Ok!'
      && codeSucessText === 'Ok!'
      && startDateSucessText === 'Ok!'
      && endDateSucessText === 'Ok!'
    )
  }

  checkAllFormFieldsButCode(){
    let {brandSucessText, priceSucessText, modelSucessText, photoSucessText, colorSucessText, codeErrorText, startDateSucessText, endDateSucessText} = this.state
    return (
      brandSucessText === 'Ok!'
      && priceSucessText === 'Ok!'
      && modelSucessText === 'Ok!'
      && photoSucessText === 'Ok!'
      && colorSucessText === 'Ok!'
      && codeErrorText === 'Code already exist, if you are trying to create, try another one'
      && startDateSucessText === 'Ok!'
      && endDateSucessText === 'Ok!'
    )
  }
  async SubmitForm() {
    if(this.checkAllFormFields()){
      this.setState({ submitLoad : 'Loading!'})
      let {model, price, brand, photo, startDate, endDate, color, code} = this.state
      try{
        await server.post('/add',{model, price, brand, photo, startDate, endDate, color, code})
        this.setState({ submitLoad : ''})
        this.setState({ submitText : 'Submitted!'})
        this.clearFields()
      }catch(e){
        this.setState({ submitLoad : ''})
        this.setState({ submitErrorText : 'Could not connect to server'})
        console.log(e)
      }
    }else{
      this.setState({ submitErrorText : 'Some field is not corrected completed'})
    }
  }

  async UpdateForm() {
    if(this.checkAllFormFieldsButCode()){
      this.setState({ submitLoad : 'Loading!'})
      let {model, price, brand, photo, startDate, endDate, color, code} = this.state
      try{
        await server.post('/update',{model, price, brand, photo, startDate, endDate, color, code})
        this.setState({ submitLoad : ''})
        this.setState({ submitText : 'Updated!'})
        this.clearFields()
      }catch(e){
        this.setState({ submitLoad : ''})
        this.setState({ submitErrorText : 'Could not connect to server'})
        console.log(e)
      }
    }else{
      this.setState({ submitErrorText : 'Some field is not corrected completed'})
    }
  }
  render() {
    
    return (
      <div >
        <Label id='title'> {this.state.title} </Label>
      <form id="new-post">
          <Label>Model. </Label>
          <p className="text-danger d-inline" name="modelError"> {this.state.modelErrorText}</p>
          <p className="text-success d-inline" name="modelSucess"> {this.state.modelSucessText}</p>
          <Input value = {this.state.model} type="name" name="model" placeholder="Model here" onChange={this.checkFormField}/>
          <Label>Price. </Label>
          <p className="text-danger d-inline" name="priceError"> {this.state.priceErrorText}</p>
          <p className="text-success d-inline" name="priceSucess"> {this.state.priceSucessText}</p>
          <Input value = {this.state.price} type="name" name="price" placeholder="Price here" onChange={this.checkFormField}/>
          <Label>Brand. </Label>
          <p className="text-danger d-inline" name="brandError"> {this.state.brandErrorText}</p>
          <p className="text-success d-inline" name="brandSucess"> {this.state.brandSucessText}</p>
          <Input value = {this.state.brand} type="name" name="brand" placeholder="Brand here" onChange={this.checkFormField}/>
          <Label>Photo. </Label>
          <p className="text-danger d-inline" name="photoError"> {this.state.photoErrorText}</p>
          <p className="text-success d-inline" name="photoSucess"> {this.state.photoSucessText}</p>
          <Input value = {this.state.photo} type="name" name="photo" placeholder="Photo URL here" onChange={this.checkFormField}/>
          <Label>Start date. </Label>
          <p className="text-danger d-inline" name="startDateError"> {this.state.startDateErrorText}</p>
          <p className="text-success d-inline" name="startDateSucess"> {this.state.startDateSucessText}</p>
          <Input value = {this.state.startDate} type="date" name="startDate" onChange={this.checkFormField}/>
          <Label>End date. </Label>
          <p className="text-danger d-inline" name="endDateError"> {this.state.endDateErrorText}</p>
          <p className="text-success d-inline" name="endDateSucess"> {this.state.endDateSucessText}</p>
          <Input value = {this.state.endDate} type="date" name="endDate" onChange={this.checkFormField}/>
          <Label>Color. </Label>
          <p className="text-danger d-inline" name="colorError"> {this.state.colorErrorText}</p>
          <p className="text-success d-inline" name="colorSucess"> {this.state.colorSucessText}</p>
          <Input value = {this.state.color} name="color" id="color" list="colors" onChange={this.checkFormField}/>
          <datalist id="colors"> 
            <option>BLACK</option> 
            <option>WHITE</option> 
            <option>GOLD</option> 
            <option>PINK</option>
          </datalist>
          <Label>Code. </Label>
          <p className="text-warning d-inline" name="codeError"> {this.state.codeErrorText}</p>
          <p className="text-success d-inline" name="codeSucess"> {this.state.codeSucessText}</p>
          <Input value = {this.state.code} type="name" name="code" onChange={this.checkFormField}/>
        <Button onClick={this.SubmitForm}>Create</Button>
        <Button id='title' onClick={this.UpdateForm}>Update</Button>
        <p className="text-success d-inline" name="descriptionError"> {this.state.submitText}</p>
        <p className="text-warning d-inline" name="descriptionError"> {this.state.submitLoad}</p>
        <p className="text-danger d-inline" name="descriptionError"> {this.state.submitErrorText}</p>
      </form>
      </div>
    )
  }
}