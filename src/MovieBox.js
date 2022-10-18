import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';

const API_IMG = 'https://image.tmdb.org/t/p/w500';
export default function MovieBox({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
  video,
}) {
  const [show, setShow] = useState(false);

  function onHandleShow() {
    setShow(true);
  }
  function onHandleClose() {
    setShow(false);
  }

  return (
    <div className="Card text-center mb-3 bg-dark">
      <div className="card-body">
        <img className="card-img-top mb-3" src={API_IMG + poster_path} alt="" />
        <button
          type="button"
          className="btn btn-dark mb-3"
          onClick={onHandleShow}
        >
          View More
        </button>
        <Modal show={show} onHide={onHandleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              className="card-img-top mb-3  "
              style={{ width: '14rem' }}
              src={API_IMG + poster_path}
              alt=""
            />
            <h3>{title}</h3>
            <h4>IMDB : {vote_average}</h4>
            <h4>Release Date : {release_date}</h4>
            <br />
            <br />
            <p>{overview}</p>
          </Modal.Body>
          <Modal.Footer>
            <button varient="secondary" onClick={onHandleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
