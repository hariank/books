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
                <div className="row">
                    <h4> currently reading </h4>
                    <ul className="shelf">
                        {cr_shelf}
                    </ul>
                </div>
                <div className="row">
                    <h4> read </h4> 
                    <ul className="shelf">
                        {read_shelf}
                    </ul>
                </div>
            </div>
        );
    }
});

var Book = React.createClass({
    render: function() {
        var book = this.props.data;
        return (
            <li className="book">
                <a href={book.link} target="_blank">
                    <img src={book.image_url} width="80" />
                </a>
            </li>
        );
    }
})

var url = "https://dl.dropboxusercontent.com/u/96903373/book_data.json"

React.render(
    <Shelf url={url} />,
    document.getElementById('content')
);
