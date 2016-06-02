import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {setSelectedProductOwner, filterProducts, toggleSelectProductDrawer} from 'actions/locationFilterActions';
import _ from 'lodash';
import {addEvent} from 'utility/ga.js';

import './product-owners-list.less';

class ProductOwnersList extends React.Component {
  render() {
    return (
        !_.get(this.props.productOwners, '$isLoading') ?
        <div className={`product-owners-list`}>
          {
            _.map(this.props.productOwners, (productOwner, i) => {
              return (
                <li key={'product-owner-'+i} onClick={this.setProductOwner.bind(this, productOwner.product)} className="product">{productOwner.product}</li>
              )
            })
          }
        </div> : <div className="home loader"><div className="box"><div className="loader3"></div></div></div>
    );
  }
  setProductOwner(product) {
    addEvent('Filter by product owner', product);
    setSelectedProductOwner(product);
    toggleSelectProductDrawer();
  }
};

export default branch(ProductOwnersList, {
  cursors: {
    productOwners: ['facets', 'ProductOwner'],
  }
});