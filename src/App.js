import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.populateList()
  }

  populateList(){
    axios.get('/api/store')
    .then(res => {
      this.setState({ products: res.data });
      console.log(this.state.products);
    });
  }
  deleteProduct(e){

    console.log()
    axios.delete('/api/store/'+e.target.id)
    .then(res => {
      this.populateList()
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Products available
            </h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/create">
                <button className="btn btn-primary">
                  Add Product
                </button>
              </Link>
            </h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Action</th>
                  
                </tr>
              </thead>
              <tbody>
                {this.state.products.map(product =>
                  <tr>
                    <td><img style={{width:'50px'}} src={"/"+product.file}/></td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.description}</td>
                    <td><button 
                        className="btn btn-danger" 
                        id={product._id}
                        onClick={e => this.deleteProduct(e)}
                        >
                        Delete
                        </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;