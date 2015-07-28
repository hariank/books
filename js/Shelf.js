var Shelf = React.createClass({

	getInitialState: function() {
		return {data: {'read': [], 'currently-reading': []}};
	},
	
	loadBooks: function() {
        $.get(this.props.url, function(result) {
            var book_data = {};
            book_data['currently-reading'] = []
            book_data['read'] = []
            book_data['to-read'] = []

            var titleind = 4, imageind = 5;
            $(result).find('review').each(function(index, rev) {
                var book_obj = {}

                var book = $(rev).find('book').children();
                book_obj['title'] = book[titleind].innerText;
                book_obj['image_url'] = book[imageind].innerText;

                var shelf = $(rev).find('shelves').children()[0].attributes[0].value;
                book_data[shelf].push(book_obj);
            });

            this.setState({data: book_data});
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

//var url = "book_data.json"
var cors = "http://crossorigin.me/";
var url_part = "https://www.goodreads.com/review/list/45141963?format=xml&key=KEY&v=2";
var key = "yFhXhuMkI2MvcepEd0ipMw";
var url = cors + url_part.replace('KEY', key);

React.render(
    <Shelf url={url} />,
    document.getElementById('content')
);
