import React from 'react'
import {Card, CardText, CardBody, Button, Input, Label } from 'reactstrap'
import server from '../../services/server'
import './Cards.css'

export default class Cards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        phones: [],
        search : ''
    }
  }

  componentDidMount() {
    this.loadPhones()
  }

  async loadPhones(parameters){
    if(typeof(parameters) === typeof('string')){
      const response = await server.get("/cellphones/?researchBy="+parameters)
      this.setState({ phones: JSON.parse(response.request.response)})
    }else{
      const response = await server.get("/cellphones/?researchBy=")
      this.setState({ phones: JSON.parse(response.request.response)})
    }
  }

  async removephone(_id){
    await server.delete('/remove',{ data: { _id: _id }})
    this.loadPhones()
  }

  search(string){
    if(this.state.search.indexOf(string) === -1){
      if(this.state.search === ''){
        this.setState({search : string})
      }else{
      this.setState({search : this.state.search +','+ string})
      }
      this.loadPhones(this.state.search)
    }else{
      if(this.state.search.indexOf(string) === 0){
        if(this.state.search === string){
          this.setState({search : this.state.search.replace(string,'')})
        }else{
          this.setState({search : this.state.search.replace(string+',','')})
        }
      }else{
        this.setState({search : this.state.search.replace(','+string,'')})
      }
    }
  }
  
  notChange(){

  }

  converDate(string){
    let parts = string.split('-')
    let date = parts[2].substring(0,2)
    date += '/'
    date += parts[1]
    date += '/'
    date += parts[0]

    return date
  }

  render() {
    const { phones, search } = this.state;
    
      return (
        <div>
          <Label>Search By:</Label>
          <Input value = {search} name="color" id="color" list="colors" onChange={() => this.notChange()}/>
          <Button id='button' onClick={() => this.search('model')}>Model</Button>
          <Button id='button' onClick={() => this.search('price')}>Price</Button>
          <Button id='button' onClick={() => this.search('brand')}>brand</Button>
          <Button id='button' onClick={() => this.search('photo')}>Photo</Button>
          <Button id='button' onClick={() => this.search('startDate')}>Start Date</Button>
          <Button id='button' onClick={() => this.search('endDate')}>End Date</Button>
          <Button id='button' onClick={() => this.search('color')}>Color</Button>
          <Button id='button' onClick={() => this.search('code')}>Code</Button>
        <div id="cardForm">
          {phones.map(phone => (
            <article key={phone._id}>
              <Card id="card">
                <CardBody>
                  <CardText>Model: {phone.model}</CardText>
                  <CardText>Price: {phone.price}</CardText>
                  <CardText>Photo URL: {phone.photo}</CardText>
                  <CardText>Start Date: {this.converDate(phone.startDate)}</CardText>
                  <CardText>End Date: {this.converDate(phone.endDate)}</CardText>
                  <CardText>Color: {phone.color}</CardText>
                  <CardText>Code: {phone.code}</CardText>
                  <Button id='button' onClick={() => this.removephone(phone._id)}>Remove</Button>
                </CardBody> 
              </Card>
            </article>
          ))}
        </div>
        </div>
      );
    }
  }