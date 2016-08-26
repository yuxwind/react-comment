import React from "react";
import request from "superagent";
import { Comment } from "../components/comment";

export default class CommentList extends React.Component {
  static displayName = "CommentList";
  static propTypes = { data: React.PropTypes.string };
  static defaultProps = { data: "" };

  render() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}
