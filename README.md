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
* Tracks how much a discussion has been viewed and displays it on the discussionlist
* Extension settings
* Adds 2 sorting options: popular and unpopular
* Adds an event which developers can listen for: `DiscussionWasViewed`
* Adds new permissions:
    * Reset the viewcount of a discussion (default to admins)
    * View the viewcount of a discussion (default to admins)

# Media

Normal:

![image](https://i.imgur.com/ZrQZd1e.png)

Smaller screens:

![Imgur](https://i.imgur.com/es4NYHI.png)

## Reset the view count

![Imgur](https://i.imgur.com/iVu92yT.png)

## Extension settings

![Imgur](https://i.imgur.com/3jUSrUd.png)

## Viewlist

![Imgur](https://i.imgur.com/Nn012B0.png)
