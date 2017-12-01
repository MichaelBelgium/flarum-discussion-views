import app from 'flarum/app';
import { extend } from 'flarum/extend';
import AddPopularSort from 'michaelbelgium/flarum-discussion-views/components/AddPopularSort';
import AddViewsToModelAndDisplay from 'michaelbelgium/flarum-discussion-views/components/AddViewsToModelAndDisplay';

app.initializers.add('michaelbelgium-flarum-discussion-views', function () {
    AddPopularSort();
    AddViewsToModelAndDisplay();
});