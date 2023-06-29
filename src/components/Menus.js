import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

export const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col key={menu.id} md={4} xs={6} className="mb-4">
      <Card style={{cursor: 'pointer'}} className="shadow" onClick={() => (masukKeranjang(menu))}>
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title>{menu.nama}</Card.Title>
          <Card.Text className="fw-light">
            Rp. {numberWithCommas(menu.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
