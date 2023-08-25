import React, { useEffect, useState } from 'react';
import Input from '../../Input';
import { sendRequest } from '../../../config/request';
import './style.css';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Nav from '../../../components/Nav';
import Button from '../../Button';

const RecipeDetails = () => {
  const { recipe_id } = useParams();
  const [details, setDetails] = useState([]);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isClicked, setIsClicked] = useState(true);
  const [selectedDate, setSelectedDate] = useState();
  const [showSelect, setShowSelect] = useState(false);
  const [openListModal, setOpenListModal] = useState(false)
  const handleOpenListModal = () => setOpenListModal(true)
  const handleCloseListModal = () => setOpenListModal(false)
  const [ingredients, setIngredients] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await sendRequest({ route: `/getRecipe/${recipe_id}`, body: '' });
      setDetails(response);
      setIsLiked(response.is_liked);
      setIngredients(response.ingredients);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  async function likeRecipe() {
    try {
      const response = await sendRequest({ method: "POST", route: `/getRecipe/${recipe_id}/like`, body: '' });
      setIsLiked(!isLiked)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleScheduleChange(event) {
    setSelectedDate(event.target.value)
  }
  async function submitSchedule() {
    try {
      const response = await sendRequest({ method: "POST", route: `/addDate/${recipe_id}`, body: { date: selectedDate } });
      console.log(response);
      setIsClicked(true)
    } catch (error) {
      console.log(error);
    }
  }
  function switchButtons() {
    setIsClicked(false)
    setShowSelect(false)
  }

  return (
    <>
    <Nav handleOpenListModal={handleOpenListModal} />
    <div className="details">
      <div className="recipe-images">
        {details.images &&
          details.images.map((image, index) => (
            <img  key={index} src={`data:image/jpeg;base64,${image.image_url}`} alt={`Recipe ${details.title}`} />
          ))}
      </div>
      <div className='name'>
        <h1>{details.title}</h1>
      </div>
      <div className="recipe-details">
          <div className="recipe-info">
            <h2>Description</h2>
            <p>{details.description}</p>
            <p>Cuisine: {details.cuisine}</p>
          </div>
        <div className="recipe-info">
          <h2>Directions</h2>
          <p>{details.directions}</p>
        </div>
        <div className="recipe-info">
          <h2>Ingredients</h2>
            {details.ingredients &&
              details.ingredients.map((ingredient) => (
                <p key={ingredient.id}>
                  {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                </p>
              ))}
        </div>
      </div>
      <div className="comments">
        <h2>Comments:</h2>
        <ul>
          {details.comments &&
            details.comments.map((comment) => (
              <li key={comment.id}>
                {comment.text} - by {comment.username}
              </li>
            ))}
        </ul>
      </div>
      <div className='comment-input'>
        <i className={`fa-solid fa-thumbs-up fa-2xl like-icon ${isLiked ? 'like' : 'unliked'}`} onClick={likeRecipe}></i>        
        <Input  value={comment} onChange={(newComment) => setComment(newComment)}  placeholder={'Comment here'}/>
      </div>
      {isClicked ? (
          <Button color='primary-bg' textColor='white-text' text='Schedule Recipe' onClick={() => setShowSelect(true)} />
        ) : (
          <><Button color='primary-bg' textColor='white-text' text='Add Schedule' onClick={submitSchedule} /> </>
        )}
        {showSelect ? (
          <input type='datetime-local' onChange={handleScheduleChange} onBlur={switchButtons} />
        ) : (
          <> </>
        )}

      <Modal isOpen={openListModal} onRequestClose={handleCloseListModal}>
          <h2>Ingredients</h2>
          <ul>
            {ingredients &&
              ingredients.map((ingredient) => (
                <div key={ingredient.id}>
                  <input type='checkbox' id='ingredient'></input>
                  <label htmlFor="ingredient">{ingredient.name} - {ingredient.quantity} {ingredient.unit}</label>
                </div>
              ))}
          </ul>
        </Modal>
    </div>
    </>
  );
};

export default RecipeDetails;
