import app from 'flarum/app';
import AddPopularSort from './components/AddPopularSort';
import AddViewsToModelAndDisplay from './components/AddViewsToModelAndDisplay';
import AddModerationControl from './components/AddModerationControl';

app.initializers.add('michaelbelgium-discussion-views', function () {
    AddPopularSort();
    AddViewsToModelAndDisplay();
    AddModerationControl();
});
