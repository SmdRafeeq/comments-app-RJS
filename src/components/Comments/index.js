import {Component} from 'react'
import {v4 as uniqueId} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  onChangeName = evemt => {
    this.setState({nameInput: evemt.target.value})
  }

  onCommentChange = evemt => {
    this.setState({commentInput: evemt.target.value})
  }

  onAddComment = event => {
    event.preventDefault()

    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uniqueId(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })

    this.setState(preCount => ({commentsCount: preCount.commentsCount - 1}))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComm => (
      <CommentItem
        key={eachComm.id}
        commentDetails={eachComm}
        deleteComment={this.deleteComment}
        toggleIsLiked={this.toggleIsLiked}
      />
    ))
  }

  render() {
    const {commentsList, nameInput, commentInput} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="comment-heading">Comments</h1>
          <div className="form-comments-con">
            <form className="form-container" onSubmit={this.onAddComment}>
              <p className="say">Say something about 4.0 Technologies</p>
              <input
                type="text"
                className="input-name"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeName}
              />
              <br />
              <textarea
                className="text-area"
                rows="6"
                placeholder="Your Comment"
                onChange={this.onCommentChange}
                value={commentInput}
              />
              <br />

              <button type="submit" className="add-btn">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="comments-image"
              alt="comments"
            />
          </div>

          <hr />

          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>{' '}
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
