import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-services';
import Spinner from '../spinner';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    loading: false,
    image: null
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId || 
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updateItem()
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    this.setState({
      loading: true
    })

    getData(itemId)
      .then(item => {
        this.setState({
          item,
          loading: false,
          image: getImageUrl(item)
        })
      })
  }

  render() {

    const { item, loading, image } = this.state
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { item });
    }); 

    const select = (!item && !loading) ? <SelectPerson /> : null
    const spinner = loading ? <Spinner /> : null;
    const content = (item && !loading) ? <PeopleView item={item} image={image} children={children} /> : null;

    return (
      <div className="item-details card">
        {select}
        {spinner}
        {content}
      </div>
    )
  }
}

const SelectPerson = () => {
  return <span>Select a person from a list</span>
}

const PeopleView = ({ item, image, children }) => {

  const { name } = item;

  return (
    <React.Fragment>
      <img className="item-image"
        src={image}
        alt="character" />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {children}
        </ul>
      </div>
    </React.Fragment>
  )
}
