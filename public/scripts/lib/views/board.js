define( ['backbone', 'jade!../templates/board'], function(Backbone, template) {
    var Board = Backbone.View.extend({
        className: 'board',
        tagName: 'svg',
        template: template,
        initialize: function() {
            this.options.model; // the Board model passed to the init fuction
            this.$container = $('#boardContainer')
            this.$el.attr({
                height: '500px',
                width: '500px',
                xmlns: "http://www.w3.org/2000/svg",
                'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                version: '1.1'
            });
        },
        render: function() {
            // either use a template to draw board or get fancy with html5 canvas
            // for now use svg template
            this.compile();
            this.$container.append(this.$el);
            //if (this.prerendered) this.delegateEvents();
            this.prerendered = true;
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
            this.trigger('placePiece', {
                x: x,
                y: y
            });
        },
        // Register DOM events
        events: {
            'click svg': 'go'
        }
    });

    return {
        Board: Board
    };
})
