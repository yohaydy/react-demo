console.log("GUJ");
var Comments = React.createClass({
    render: function() {
        return(
            <div className="comments">
                <Comment text="This is 1st Comment" rating={15}/>
                <Comment text="This is 2nd Comment" rating={25}/>
            </div>
        )
    }
});

var Comment = React.createClass({
    render: function(){
        return (
            <div className="comment">
                    <div className="comment-header">
                        <div className="rating">{this.props.rating}</div>
                        <button className="btn-vote">+</button>
                        <button className="btn-vote">-</button>
                    </div>
                    <div className="comment-text">{this.props.text} </div>
                </div>
        )
    }
})

ReactDOM.render(
    <Comments />,
    document.getElementById('content')
);

