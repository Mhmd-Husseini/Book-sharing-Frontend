import React from 'react';
import "./style.css";

const ReviewCard = ({ book, userName }) => {
  return (
    <div className="review-card">
      {book.image ? (
        <div className='img'><img src={`data:image/jpeg;base64,${book.image}`} alt={book.title} /></div>
      ) : (
        <img src="http://content.health.harvard.edu/wp-content/uploads/2021/11/7640be02-f078-4f16-91da-6cf32d186e46.jpg" alt={book.title} />
      )}
      <h3>Book: {book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Review: {book.review}</p>
      <p>Posted by: {userName}</p>
      <p>Likes: {book.likes.length}</p>
    </div>
  );
};

export default ReviewCard;
