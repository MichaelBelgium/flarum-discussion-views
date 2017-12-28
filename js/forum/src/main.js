import app from 'flarum/app';
import AddPopularSort from 'michaelbelgium/flarum-discussion-views/components/AddPopularSort';
import AddViewsToModelAndDisplay from 'michaelbelgium/flarum-discussion-views/components/AddViewsToModelAndDisplay';
import AddModerationControl from 'michaelbelgium/flarum-discussion-views/components/AddModerationControl';

app.initializers.add('michaelbelgium-discussion-views', function () {
    AddPopularSort();
    AddViewsToModelAndDisplay();
    AddModerationControl();
});
