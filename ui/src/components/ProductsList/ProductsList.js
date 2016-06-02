import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {setSelectedProduct, toggleSelectProductDrawer} from 'actions/locationFilterActions';
import {addEvent} from 'utility/ga.js';
import './products-list.less';

class ProductsList extends React.Component {
  render() {
    return (
      !_.get(this.props.products, '$isLoading') ?
        <div className={`products-list`}>
        {
         _.map(this.props.products, (product, i) => {
            return (
              <li key={'product-'+i} onClick={this.setProduct.bind(this, product.product)} className="product">{product.product}</li>
            )
          })
        }
      </div> : <div className="home loader"><div className="box"><div className="loader3"></div></div></div>
    );
  }
  setProduct(product) {
    addEvent('Filter by product', product);
    setSelectedProduct(product);
    toggleSelectProductDrawer();
  }
};

export default branch(ProductsList, {
  cursors: {
    products: ['facets', 'Products'],
  }
});