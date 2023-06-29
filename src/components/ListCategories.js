import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({nama}) => {
  if (nama == 'Makanan') return <FontAwesomeIcon icon={faUtensils} className='me-2'/>
  if (nama == 'Minuman') return <FontAwesomeIcon icon={faCoffee} className='me-2'/>
  if (nama == 'Cemilan') return <FontAwesomeIcon icon={faCheese} className='me-2'/>
}
export default class ListCategories extends Component {

  constructor(props) {
    super(props)

    this.state = {
      categories: [],
    }
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then(res => {
        // console.log(res);
        const categories = res.data;
        this.setState({ categories })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { categories } = this.state;
    const {changeCategory, CategoryDipilih} = this.props;
    return (
      <Col className='mt-3' md={2} mt="2">
        <h5 className="fw-light"><strong>Daftar Kategori</strong></h5>
        <hr />
        <ListGroup>
          {categories && categories.map((category) => (
            <ListGroup.Item 
            key={category.id} 
            onClick={ () => changeCategory(category.nama) }
            className={CategoryDipilih === category.nama && "category-aktif"}
            style={{cursor: 'pointer'}}
            >
              <Icon nama={category.nama} />
              {category.nama}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    )
  }
}
