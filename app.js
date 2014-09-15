D = React.DOM;

function diff(ours, theirs) {
    var common = _.intersection(ours, theirs);
    var plus = _.difference(ours, common);
    var minus = _.difference(theirs, common);

    return {
        common: common,
        plus: plus,
        minus: minus
    };
}

var Ingredient = React.createClass({
    displayName: 'Ingredient',
    render: function() {
        return D.li({ className: this.props.type }, this.props.name);
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
        this.props.onSelected(this.props.burger);
    },
    render: function() {
        var burger = this.props.burger;
        var title = D.h2(null, burger.title);
        var image = D.img({ src: burger.imgSrc });
        var ingredients = Ingredients({
            ingredients: burger.ingredients,
            selectedBurger: this.props.selectedBurger
        });

        var cs = React.addons.classSet;
        var classes = cs({
            'thumbnail': true,
            'selected': this.props.selectedBurger === burger
        });

        return D.div({ className: classes, onClick: this.onClick },
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

var burgers = [
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wp1446e004_1a.png",
        "title": "Classic Burger",
        "ingredients": [
            "Леб",
            "Плескавица",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wp1446e004_1a.png",
        "title": "Isabela",
        "ingredients": [
            "Леб",
            "Плескавица",
            "Фриендс премаз",
            "Марула",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wpfaa533af_1a.png",
        "title": "Casanova",
        "ingredients": [
            "Леб",
            "Плескавица",
            "Сланина",
            "Кари сос",
            "Марула",
            "Домат",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wp1446e004_1a.png",
        "title": "Mr. Perfect",
        "ingredients": [
            "Леб",
            "Плескавица",
            "Фриендс премаз",
            "Печурки",
            "Марула",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wpb8b6b968_1a.png",
        "title": "Chicago",
        "ingredients": [
            "Леб",
            "Плескавица",
            "Кашкавал",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wp1446e004_1a.png",
        "title": "Firehouse",
        "ingredients": [
            "Леб",
            "Плескавица",
            "Кашкавал",
            "Марула",
            "Чили сос",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wpa509fbfc_1a.png",
        "title": "Chicken Classic",
        "ingredients": [
            "Леб",
            "Пилешки стек на скара",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wp25b62d84_1a.png",
        "title": "Junior",
        "ingredients": [
            "Леб",
            "Пилешки стек на скара",
            "Кари сос",
            "Марула",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wp8c227d7c_1a.png",
        "title": "Senior",
        "ingredients": [
            "Леб",
            "Пилешки стек на скара",
            "Кашкавал",
            "Кари сос",
            "Марула",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wp8c227d7c_1a.png",
        "title": "Hot Chick",
        "ingredients": [
            "Леб",
            "Пилешки стек на скара",
            "Печурки",
            "Марула",
            "Чили сос",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wp4c8a7743_1a.png",
        "title": "Mona Lisa",
        "ingredients": [
            "Леб",
            "Похован пилешки стек",
            "Фриендс премаз",
            "Марула",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wpaaabcf82_1a.png",
        "title": "Daisy",
        "ingredients": [
            "Леб",
            "Похован пилешки стек",
            "Кари сос",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    },
    {
        "imgSrc": "http://burgerfriends.mk/wpimages/wp1c824f2d_1a.png",
        "title": "Miss Universe",
        "ingredients": [
            "Леб",
            "Ќофте (плескавица) од тиквички",
            "Фриендс премаз",
            "Марула",
            "Печурки",
            "Домат",
            "Кромид",
            "Кисели краставички",
            "Помфрит",
            "2 соса по избор"
        ]
    }
];

React.renderComponent(App({ burgers: burgers }), document.getElementById("app"));
