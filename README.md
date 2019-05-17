# Flarum discussion views

This is an extension for the [flarum forum software](http://flarum.org) where you can enable and track how much times a discussion has been viewed.

# Installation
Execute this command in your flarum root: `composer require michaelbelgium/flarum-discussion-views`

# Update
Execute these commands to update the extension.

```
composer update michaelbelgium/flarum-discussion-views
php flarum migrate
php flarum cache:clear
```

# Translations
If you would like to translate this extension to your language, make a PR in the corresponding language pack. 

# Features
* Obviously tracks how much a discussion has been viewed and displays it per discussion on the discussionlist
* Adds 2 sorting options: popular and unpopular
* Adds 1 event which developers can listen for: `DiscussionWasViewed`
* Adds 1 new permission where people can (re)set the viewcount of a discussion (default to admins)

# Media
![image](http://puu.sh/ymLUg.png)

Set the view count:

![image 3](http://puu.sh/AIOet.png)
