import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_URL } from '../utils/constants';
import axios from 'axios';

export default class Sukses extends Component {

  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    return (
      <div className='mt-4 text-center'>
        <div>
          <Image src="assets/images/success_page.png" width="300" />
          <h3 className='text-success'>Sukses Pesan</h3>
          <p>Terimkasih telah memesan</p>
        </div>
        <Button variant="dark" as={Link} to="/">
          Kembali
        </Button>
      </div>
    )
  }
}
