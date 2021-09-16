import app from 'flarum/app';
import AddPopularSort from './components/AddPopularSort';
import AddViewsToModelAndDisplay from './components/AddViewsToModelAndDisplay';
import AddModerationControl from './components/AddModerationControl';
import AddLists from './components/AddLists';

app.initializers.add('michaelbelgium-discussion-views', function () {
    AddPopularSort();
    AddViewsToModelAndDisplay();
    AddModerationControl();
    AddLists();
});
