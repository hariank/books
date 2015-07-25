var Shelf = React.createClass({

	getInitialState: function() {
		return {data: []};
	},
	
	loadBooks: function() {
		this.setState({data: ['test']})
	},

	componentDidMount: function() {
		this.loadBooks();
	},

	render: function() {
		return (
			<div className="shelf">
                <p> test </p>
			</div>
		);
	}
});

React.render(
    <Shelf />,
    document.getElementById('content')
);
