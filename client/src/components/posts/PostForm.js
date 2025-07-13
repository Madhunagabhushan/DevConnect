import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    if (file) {
      formData.append('attachment', file);
    }

    addPost(formData);

    setText('');
    setFile(null);
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary'>
        <h3>Say Something...</h3>
      </div>
      <form className='form my-1' onSubmit={onSubmit} encType="multipart/form-data">
        <textarea
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="file" name="attachment" onChange={onFileChange} />
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
