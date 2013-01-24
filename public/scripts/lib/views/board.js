define( ['backbone', 'underscore', 'boardTemplate'], function(Backbone, _, template) {
    var boardTemplate = _.template(template);
    var Board = Backbone.View.extend({
        className: 'board',
        initialize: function() {
            this.options.model; // the Board model passed to the init fuction
            this.$container = $('#boardContainer');
        },
        render: function() {
            // either use a template to draw board or get fancy with html5 canvas
            // for now use svg template
        }
    });

    return {
        Board: Board
    };
})
