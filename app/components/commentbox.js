import React from "react";
import request from "superagent";
import { CommentList } from "../components/commentlist";
import { CommentForm } from "../components/commentform";
import { Button } from "react-bootstrap";

const post = (url, data, cb) => {
  request.post(url)
  .send(data)
  .set("Content-Type", "application/json")
  .end(cb);
};

const get = (url, cb) => {
  request.post(url)
  .set("Content-Type", "application/json")
  .end(cb);
};

export default class CommentBox extends React.Component {
  static displayName = "CommentBox";
  static propTypes = { url: React.PropTypes.string, pollInterval: React.PropTypes.number };
  static defaultProps = { url: "/comments", pollInterval: 200000 };

  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  render() {
    console.log("start load commentbox");
    return (
        <div className="commentBox">
        <h1>Comments</h1>
        <CommentForm onCommentSubmit={ this.handleCommentSubmit } />
        <CommentList data={ this.state.data } />
        </div>
        );
  }

  loadCommentsFromDB() {
    console.log("in CommentBox, loadCommentsFromServer, success");
    get(this.props.url, (err, res) => {
      if(err) {
        console.error(this.props.url, err.toString());
        return;
      }
      console.log(JSON.stringify(res.body));
      this.setState({ data: res.body.data });
    });
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    commend.commentId = Date.now();
    var newCommnets = comments.concat([ comment ]);
    this.setState({ data: newComments });
    console.log("in CommentBox, handleCommentSubmit, success", comment);
    post(this.props.url, comment, (err, res) => {
      if(err) {
        console.log(props.url, err);
        return;
      }
      this.setState({ data: res.body.data });
    });
  }

  componentDidMount() {
    this.loadCommentsFromDB();
    setInterval( this.loadCommentsFromDB, this.props.pollInterval);
  }
}
//<CommentList data={this.state.data} />
//<CommentForm onCommentSubmit={this.handleCommentSubmit} />
