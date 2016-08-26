import React from "react";
import CommentBox from "../components/commentbox";

export default class CommentPage extends React.Component {
  static displayName = "CommentPage";
  constructor() {
    super();
  }

  render() {
    return (
        <div>
        <CommentBox url="/comments" pollInterval={200000} />
        </div>
    );
  }
}
