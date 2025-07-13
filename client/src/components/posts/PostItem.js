import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, attachment },
  showActions,
}) => (
  <div className='post bg-white my-1 p-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>

    <div>
      <p className='my-1'>{text}</p>

      {/* Display uploaded file if exists */}
      {attachment && (
        <div className='my-1'>
          {/\.(jpg|jpeg|png)$/i.test(attachment) ? (
            <img
              src={`http://localhost:5000/uploads/${attachment}`}
              alt='uploaded'
              style={{ width: '300px', height: 'auto', marginTop: '10px' }}
            />
          ) : attachment.endsWith('.pdf') ? (
            <iframe
              src={`http://localhost:5000/uploads/${attachment}`}
              width='600px'
              height='400px'
              title='PDF Preview'
              style={{ border: '1px solid #ccc', marginTop: '10px' }}
            ></iframe>
          ) : (
            <a
              href={`http://localhost:5000/uploads/${attachment}`}
              target='_blank'
              rel='noreferrer'
              className='btn btn-light'
            >
              View Attachment
            </a>
          )}
        </div>
      )}

      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <button onClick={() => addLike(_id)} type='button' className='btn btn-light'>
            <i className='fas fa-thumbs-up'></i>{' '}
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>

          <button onClick={() => removeLike(_id)} type='button' className='btn btn-light'>
            <i className='fas fa-thumbs-down'></i>
          </button>

          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>

          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger'
              title='Delete this post'
            >
              <i className='fas fa-trash-alt'></i> Delete
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
