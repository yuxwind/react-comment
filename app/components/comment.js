import React from "react";
import request from "superagent";

import { Button } from "react-bootstrap";
import { Remarkable } from "react-remarkable";
const get = (url, cb) => {
  request.get(url)
    .set("Content-Type", "application/json")
    .end(cb);
}

export default class Comment extends React.Component {
  static displayName = "Comment";
  static propTypes = { 
    author: React.PropTypes.string,
    commentId: React.PropTypes.stirng,
    text: React.PropTypes.string };
  static defaultProps = { author: "test" };
  
  constructor(props) {
    super(props);
    this.state = { author: props.author, commendId: props.commentId, text: props.text };
  }

  render(){
    return (
        <div className="comment">
            <h4 className="commentAuthor">
             { this.props.author }
            </h4>
            <h4 className="commentId">
             { this.props.commentId }
            </h4>
        <Remarkable>
        { this.props.text }
        </Remarkable>
        </div>
        );
  }
}
