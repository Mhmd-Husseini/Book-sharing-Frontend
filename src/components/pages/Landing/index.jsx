import React, { useEffect, useState } from 'react';
import ReviewCard from '../../ReviewCard';
import Nav from '../../../components/Nav';
import Modal from 'react-modal'; 
import { sendRequest } from '../../../config/request';
import "./style.css";
import ModalForm from '../../../components/ModalForm';


const Landing = () => {
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchReviews = async () => {
    try {
      const response = await sendRequest({ route: "/reviews", body: "" });
      setReviews(response);
    } catch (error) {
      console.log(error);
    }
  }; 

  useEffect(() => {
    fetchReviews(); 
  }, []); 

  return (
    <>
      <Nav handleOpenModal={handleOpenModal} />
      <div className="reviews-list">
        {reviews.map(review => (
          review.book.map(book => (
            <ReviewCard key={book._id} book={book} userName={review.name} />
          ))
        ))}
      </div>
      <Modal isOpen={openModal} onRequestClose={handleCloseModal}>
        <ModalForm handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};

export default Landing;



