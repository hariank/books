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
        var cr_shelf = [];
        var reading_books = this.state.data['currently-reading'];
        for (var i = 0; i < Math.min(reading_books.length, max_disp); i++) {
            cr_shelf.push(<Book data={reading_books[i]} key={i} />);
        }

        var read_shelf = [];
        var read_books = this.state.data['read'];
        for (var i = 0; i < Math.min(read_books.length, max_disp); i++) {
            read_shelf.push(<Book data={read_books[i]} key={i} />);
        }

        if (this.state.data['currently-reading'].length || this.state.data['read'].length) {
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
                        <a className="link-to-profile" href="https://www.goodreads.com/review/list/45141963-hariank?shelf=read" target="_blank"> more </a>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="loader">
                    <img src="loader.gif" alt="loader"/> 
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

var url = "https://dl.dropboxusercontent.com/u/96903373/book_data.json";
var max_disp = 12;

React.render(
    <Shelf url={url} />,
    document.getElementById('content')
);
