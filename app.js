D = React.DOM;

function diff(ours, theirs) {
    var common = _.intersection(ours, theirs);
    var plus = _.difference(ours, common);
    var minus = _.difference(theirs, common);

    console.log(common);

    return {
        common: common,
        plus: plus,
        minus: minus
    };
}

var Ingredient = React.createClass({
    displayName: 'Ingredient',
    render: function() {
        var color;
        if (this.props.type === 'common') {
            color = '#999';
        } else if (this.props.type === 'plus') {
            color = 'green';
        } else {
            color = 'red';
        }

        return D.li({ style: { color: color }}, this.props.name);
    }
});

var Ingredients = React.createClass({
    displayName: 'Ingredients',
    render: function() {
        var d = diff(this.props.ingredients,
                     this.props.selectedBurger.ingredients);

        function toElement(type) {
            return function(el) {
                return Ingredient({ name: el, type: type });
            };
        }

        var commonEls = d.common.map(toElement('common'));
        var plusEls = d.plus.map(toElement('plus'));
        var minusEls = d.minus.map(toElement('minus'));

        var list = commonEls.concat(minusEls).concat(plusEls);

        return D.ul(null, list);
    }
});

var Thumbnail = React.createClass({
    displayName: 'Thumbnail',
    onClick: function() {
        this.props.handleChange(this.props.burger);
    },
    render: function() {
        var burger = this.props.burger;
        var title = D.div(null, burger.title);
        var image = D.img({ src: burger.imgSrc });
        var ingredients = Ingredients({
            ingredients: burger.ingredients,
            selectedBurger: this.props.selectedBurger
        });

        return D.div({ onClick: this.onClick },
                     title,
                     image,
                     ingredients);
    }
});

var App = React.createClass({
    displayName: 'App',
    render: function() {
        var self = this;
        var bThumbs = this.props.burgers.map(function(b) {
            return Thumbnail({
                burger: b,
                selectedBurger: self.state.selectedBurger,
                onSelected: self.handleChange
            });
        });

        return D.div(null, bThumbs);
    },
    handleChange: function(burger) {
        this.setState({ selectedBurger: burger });
    },
    getInitialState: function() {
        return { selectedBurger: burgers[0] };
    }
});

var burgers = [
    { id: 0, title: 'asd', imgSrc: 'asdf', description: 'qwe', ingredients: ['кечап', 'мајонез'] },
    { id: 1, title: 'asd2', imgSrc: 'asdf', description: '4234', ingredients: ['кечап', 'сенф'] }
];

React.renderComponent(App({ burgers: burgers }), document.getElementById("app"));
