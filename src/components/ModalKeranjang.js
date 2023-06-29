import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';


export const ModalKeranjang = (
  {
    showModal,
    handleClose,
    keranjangDetail,
    jumlah,
    keterangan,
    tambah,
    kurang,
    changeHandler,
    handleSubmit,
    hapusPesanan,
    totalHarga
  }) => {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.product.nama}
            {' '}
            <strong>({'Rp.' + numberWithCommas(keranjangDetail.product.harga)})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total harga : </Form.Label>
              <p>
                <strong>{'Rp.' + numberWithCommas(totalHarga)}</strong>
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Jumlah</Form.Label>
              <div>
                <Button variant='primary' size='sm' className='me-2' onClick={() => kurang()}>
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <strong>{jumlah}</strong>
                <Button variant='primary' size='sm' className='ms-2' onClick={() => tambah()}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>keterangan : </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder='cth : Pedas, Nasi setengah, Ga pake kecap, dll'
                value={keterangan}
                onChange={(event) => changeHandler(event)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
            <FontAwesomeIcon icon={faTrash} /> Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Kosong
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
