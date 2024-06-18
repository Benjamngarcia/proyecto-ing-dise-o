import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Button, Chip, TextField, Typography, Rating } from '@mui/material';

const ReviewModal = ({ open, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [tags, setTags] = useState([]);
  const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleTagDelete = (tagToDelete) => () => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleTagAdd = (option) => () => {
    setTags((prevTags) => [...prevTags, option]);
  };

  const handleSubmit = () => {
    // Aquí puedes enviar la información del review a tu API
    console.log('Rating:', rating);
    console.log('Comment:', comment);

    onClose();
  };

  const modalStyle = {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    padding: '20px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="review-modal-title"
      aria-describedby="review-modal-description"
    >
      <div style={modalStyle}>
        <Typography variant="h6" component="h2" id="review-modal-title">
          Leave a Review
        </Typography>
        <div>
          <Typography variant="body1">Rating:</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            precision={0.5}
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <Typography variant="body1">Options:</Typography>
          {options.map((option, index) => (
            <Chip
              key={index}
              label={option}
              onClick={handleTagAdd(option)}
              style={{ marginRight: '8px', marginBottom: '8px', cursor: 'pointer' }}
            />
          ))}
        </div>
        <div style={{ marginTop: '16px' }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={handleTagDelete(tag)}
              style={{ marginRight: '8px', marginBottom: '8px' }}
            />
          ))}
          
        </div>
        <div style={{ marginTop: '16px' }}>
          <Typography variant="body1">Comment:</Typography>
          <TextField
            id="comment"
            multiline
            fullWidth
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            variant="outlined"
            style={{ marginTop: '8px' }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: '16px' }}
        >
          Submit Review
        </Button>
      </div>
    </Modal>
  );
};

export default ReviewModal;
