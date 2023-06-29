import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { numberWithCommas } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

function TotalBayar({ keranjangs }) {
  const navigate = useNavigate();

  const submitTotalBayar = (sum) => {
    const pesanan = {
      total_bayar: sum,
      menus: keranjangs
    };

    axios.post(API_URL + 'pesanans', pesanan)
      .then((res) => {
      navigate('/sukses');
    });
  };

  const sum = keranjangs.reduce((total, item) => total + item.total_harga, 0);

  return (
    <div className='fixed-bottom'>
      <Row>
        <Col md={{ span: 3, offset: 9 }} className='px-4'>
          <div className='bg-white p-2'>
            <h6>Total harga: <h5 className='float-end fw-bold'>Rp. {numberWithCommas(sum)}</h5></h6>
            <div className='py-2'>
              <Button
                variant='dark'
                className='w-100'
                size='md'
                onClick={() => submitTotalBayar(sum)}
              >
                <FontAwesomeIcon icon={faMoneyBill1Wave} /> Bayar
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default TotalBayar;