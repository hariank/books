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
                        <h4> recently read </h4> 
                        <p> (from <a className="link-to-profile" href="https://www.goodreads.com/review/list/45141963-hariank?shelf=read" target="_blank"> goodreads</a>)</p>

                        <ul className="shelf">
                            {read_shelf}
                        </ul>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="loader">
                    <img src="loader.svg" alt="loader"/> 
                </div>
            );
    }
});

var Book = React.createClass({
    render: function() {
        var book = this.props.data;
        return (
            <li className="book">
                <img src={book.image_url} width="90" />
                <a href={book.link} target="_blank">
                    <p> {book.title} - {book.author} </p>
                </a>
            </li>
            //<br>
        );
    }
})

//var url = "https://dl.dropboxusercontent.com/s/gp0t4ghjol1s575/book_data.json?dl=0"
var url = "https://dl.dropboxusercontent.com/s/05ru4ft3sk88tdc/book_data.json?dl=0"
var max_disp = 15;

React.render(
    <Shelf url={url} />,
    document.getElementById('content')
);
