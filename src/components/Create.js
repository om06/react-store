import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      quantity: '',
      description: '',
      product_image: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, quantity, description, product_image } = this.state;
    const formData = new FormData()
    formData.append('name',name)
    formData.append('quantity',quantity)
    formData.append('description', description)
    formData.append('product_image',product_image)

    axios({method: 'post',
                url: '/api/store',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
          .then((result) => {
            this.props.history.push("/")
          });

   }

  onInputChange = (e) =>{

    this.setState({product_image:e.target.files[0]})
  }

  render() {
    const { name, quantity, description, product_image } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD PRODUCT
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Product List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">NAME:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="title">QUANTITY:</label>
                <input type="text" class="form-control" name="quantity" value={quantity} onChange={this.onChange} placeholder="Quantity" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <input onChange={e => this.onInputChange(e)} type="file"/>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;