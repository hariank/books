var Shelf = React.createClass({

	getInitialState: function() {
		return {data: {'read': [], 'currently-reading': []}};
	},
	
	loadBooks: function() {
        $.get(this.props.url, function(result) {
            this.setState({data: JSON.parse(result)});
        }.bind(this));
	},

	componentDidMount: function() {
		this.loadBooks();
	},

    render: function() {
        var read_shelf = this.state.data['read'].map(function(book, index) {
            return (
                <Book data={book} key={index} />
            );
        });
        var cr_shelf = this.state.data['currently-reading'].map(function(book, index) {
            return (
                <Book data={book} key={index} />
            );
        });
        return (
            <div className="bookshelf">
                <div className="shelf">
                    {cr_shelf}
                </div>
                <div className="shelf">
                    {read_shelf}
                </div>
            </div>
        );
    }
});

var Book = React.createClass({
    render: function() {
        var book = this.props.data;
        return (
            <div className="book">
                <p> {book.title} </p>
                <img src={book.image_url} width="50" />
            </div>
        );
    }
})

var url = "book_data.json"

React.render(
    <Shelf url={url} />,
    document.getElementById('content')
);
