import React, { Component } from 'react'
import { Row, Col, ListGroup, Badge, Card } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'
import TotalBayar from './TotalBayar'
import { ModalKeranjang } from './ModalKeranjang'
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Hasil extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: '',
      totalHarga: 0
    }
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga
    });
  }

  handleClose = () => {
    this.setState({
      showModal: false
    });
  }

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    })
  }

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
      totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      })
    }
  }

  chageHandler = (event) => {
    this.setState({
      keterangan: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then(res => {
        this.props.getListKeranjangs();
        swal({
          title: "Success!",
          text: "Pesanan berhasil diupdate " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500
        });
      })
      .catch(error => {
        console.log("Error yaa ", error);
      })
  }

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then(res => {
        this.props.getListKeranjangs();
        swal({
          title: "Success!",
          text: "Pesanan berhasil dihapus ",
          icon: "success",
          button: false,
          timer: 1500
        });
      })
      .catch(error => {
        console.log("Error yaa ", error);
      })
  }

  render() {
    const { keranjangs, history } = this.props
    // console.log(history)
    return (
      <Col className='mt-3' md={3} mt="2">
        <h5 className="fw-light"><strong>Hasil</strong></h5>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className='overflow-auto hasil'>
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item key={menuKeranjang.id} onClick={() => { this.handleShow(menuKeranjang) }}>
                  <Row>
                    <Col xs={2}>
                      <Badge pill variant="success">{menuKeranjang.jumlah}</Badge>
                    </Col>
                    <Col xs={5}>
                      <h6>{menuKeranjang.product.nama}</h6>
                      <small>{"Rp." + numberWithCommas(menuKeranjang.product.harga)}</small>
                    </Col>
                    <Col xs={5}>
                      <strong>{"Rp." + numberWithCommas(menuKeranjang.total_harga)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} handleSubmit={this.handleSubmit} changeHandler={this.chageHandler} hapusPesanan={this.hapusPesanan} />
            </ListGroup>
          </Card>

        )}
        <TotalBayar keranjangs={keranjangs} history={history} />
      </Col>
    )
  }
}
