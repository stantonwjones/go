define( ['backbone', 'jade!../templates/board'], function(Backbone, template) {
    var Board = Backbone.View.extend({
        className: 'board',
        tagName: 'svg',
        template: template,
        initialize: function() {
            var self = this;
            this.options.model; // the Board model passed to the init fuction
            this.$container = $('#boardContainer')
            this.$el.attr({
                height: '500px',
                width: '500px',
                xmlns: "http://www.w3.org/2000/svg",
                version: '1.1'
            });
            this.options.model.on('piecePlaced', function() {
                self.render();
            });
        },
        render: function() {
            // either use a template to draw board or get fancy with html5 canvas
            // for now use svg template
            this.compile();
            this.$container.empty();
            this.$container.append(this.$el);
        },
        compile: function() {
            var tempText = template({
                locals: {
                    board: this.options.model
                }
            });
            this.$el.html(tempText);
        },
        go: function(e) {
            var x = e.currentTarget.getAttribute('data-x');
            var y = e.currentTarget.getAttribute('data-y');
            // game.trigger a placePiece with the position parameters
            window.GO.game.get('currentPlayer')
            .placePiece(this.options.model, x, y);
            console.log(x, y);
            this.delegateEvents();
        },
        events: {
            'click svg': 'go'
        }
    });

    return {
        Board: Board
    };
})
