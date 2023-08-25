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
  const [searchKeyword, setSearchKeyword] = useState('');

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

  const filteredBooks = reviews.reduce((filtered, review) => {
    const filteredReviewBooks = review.book.filter(b => (
      b.title && b.title.toLowerCase().includes(searchKeyword) ||
      b.author && b.author.toLowerCase().includes(searchKeyword) ||
      b.review && b.review.toLowerCase().includes(searchKeyword)
    ));

    if (filteredReviewBooks.length > 0) {
      filtered.push({
        ...review,
        book: filteredReviewBooks
      });
    }

    return filtered;
  }, []);

  return (
    <>
      <Nav handleOpenModal={handleOpenModal} />
      <div className="search-bar">
        <div className='search'>
        <label  className="search-label">
          Search by book name, author, or review:
        </label>
        <input
          type="text"
          id="search-input"
          className="search-input"
          placeholder="Enter your search..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
        />
        </div>
      </div>
      <div className="reviews-list">
        {filteredBooks.map(filteredReview => (
          filteredReview.book.map(book => (
            <ReviewCard
              key={book._id}
              book={book}
              userName={filteredReview.name || ''}
            />
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
