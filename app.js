console.log("GdJ");


var CommentBox = React.createClass({
	getInitialState: function(){
		return {data:[]};
	},

	loadCommentsFromServer: function(){
		$.ajax({
		url: this.props.url,
		dataType: 'json',
		cache: false,
		success: function(data) {
			this.setState({data: data});
		}.bind(this),
		error: function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this)
		});
	},
	
	componentDidMount: function() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},

	handleCommentSubmit: function(comment) {
		$.ajax({
		url: this.props.url,
		dataType: 'json',
		type: 'POST',
		data: comment,
		success: function(data) {
			this.setState({data: data});
		}.bind(this),
		error: function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this)
		});
  	},	


	render: function() {
		return(
			<div className="comment-box">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			</div>
			
		)
	}
});



var CommentList = React.createClass({
	propTypes: {
		data: React.PropTypes.arrayOf(React.PropTypes.object)
	},
	render: function() {
		var commentNodes = this.props.data.map((com)=> (
			<Comment 
			author={com.author} 
			key={com.id} 
			rating ={com.rating} 
			text={com.text}
			id={com.id}
			/>
		))
		return(
			<div>
				{commentNodes}
			</div>
		)
	}
})

var Comment = React.createClass({

	render: function(){
		return (
			<div className="comment">
					<div className="comment-header">
					  <div className="author">{this.props.author}</div>
						<CommentVoter initialRating={this.props.rating}/>
					</div>
					<div className="comment-text">{this.props.text} </div>
				</div>
		)
	}
});

var CommentVoter = React.createClass({

	propTypes: {
		data: React.PropTypes.number
	},

	getInitialState: function(){
		return {rating: this.props.initialRating };
	},
	
	voteUp: function(){
		this.setState({rating: this.state.rating +1})
	},
	voteDown: function(){
		this.setState({rating: this.state.rating -1})
	},
	
	render: function(){
		return(
			<div>
				<div className="rating">{this.state.rating}</div>
				<button value={1} className="btn-vote" onClick={this.voteUp}>+</button>
				<button value={-1} className="btn-vote" onClick={this.voteDown}>-</button>
			</div>
		)
	}
})

var CommentForm = React.createClass({
	getInitialState: function() {
		return {author: '', text: ''};
	},

	handleAuthorChange: function(e) {
		this.setState({author: e.target.value});
	},

	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},  

	handleSubmit: function(e) {
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if (!text || !author) {
			return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: '', text: ''});
	},

	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input
				type="text"
				placeholder="Your name"
				value={this.state.author}
				onChange={this.handleAuthorChange}
				/>
				<input
				type="text"
				placeholder="Say something..."
				value={this.state.text}
				onChange={this.handleTextChange}
				/>
				<input type="submit" value="Post" />
			</form>
		);
  }
});

ReactDOM.render(
	<CommentBox url="http://localhost:3000/api/comments" pollInterval={30000} />,
	document.getElementById('content')
);






