var Shelf = React.createClass({

	getInitialState: function() {
		return {data: []};
	},
	
	loadBooks: function() {
        $.get(this.props.url, function(result) {
            console.log(result);
        }.bind(this));
        //$.ajax({
            //url: this.props.url,
            //dataType: 'xml',
            //cache: false,
            //success: function(data) {
                //this.setState({data: data});
            //}.bind(this),
            //error: function(xhr, status, err) {
                ////console.error(this.props.url, status, err.toString());
            //}.bind(this)
        //});
		this.setState({data: ['test']});
	},

	componentDidMount: function() {
		this.loadBooks();
	},

    render: function() {
        return (
            <div classname="shelf">
                <p> url: { this.props.data } </p>
            </div>
        );
    }
});

var url = "https://www.goodreads.com/review/list/45141963?format=xml&key=KEY&v=2"
var key = "yFhXhuMkI2MvcepEd0ipMw"

React.render(
    <Shelf url={url.replace('KEY', key)} />,
    document.getElementById('content')
);
