System.register('michaelbelgium/flarum-discussion-views/main', [], function (_export) {
    'use strict';

    return {
        setters: [],
        execute: function () {
            app.initializers.add('michaelbelgium-flarum-discussion-views', function () {
                alert('Hello, world!');
            });
        }
    };
});