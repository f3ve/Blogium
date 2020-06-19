# Blogium

Blogium is a blogging platform inspired by Medium. It has a simplistic and minimalist style to allow users to focus on reading and writing blog posts. It features a fully functional text editor that I built from scratch using JavaScript that is designed to handle the hassle of formatting allowing the user to focus on their writing. Anyone can read the posts on Blogium and users can easily create an account to get started writing their own posts.

## Tech

Blogium was created with React, NodeJS, Express, PostgreSQL, and Firebase it is a Full-Stack web app and you can view the RESTful API Repo [here](https://github.com/f3ve/Blogium-api)

## Using the app

Getting started on Blogium is easy. 

simply follow this [link](https://blogium.now.sh/)

### Main page

![Blogium main page](https://github.com/f3ve/Blogium/src/images/blogium-main-page.png)

On the main page you can view posts made by other users. Login or sign up by clicking one of the buttons on the top navigation bar. 

Clicking the Blogium Logo from anywhere in the app wil redirect you back to this main page.

### Post Page

![Post page content](https://github.com/f3ve/Blogium/src/images/post-page.png)

![Post page comments](https://github.com/f3ve/Blogium/src/images/post-page-comments.png)

You get to this page by clickin on a post from the main page or a users page.

On this page you can read a post made by another user. 

Clicking on the Author's image will direct you to that users page so you can view other posts written by them and read their bio.

Below the Author info is the comment section. Users that are logged in to an account can leave comments in the provided input. 

All users can delete a comment that they wrote or any comments on a post that they created. You cannot delete comments made by others if they are not on a post that you created.

### User page

![User page](https://github.com/f3ve/Blogium/src/images/user-page.png)

you can get to a users page by click on their image in a post or comment or you can get to your page by clicking 'View your page' in the nav bar.

On a users page you can view all the posts made by that user.

if you are on your own page you can edit or delete posts that you have made.

### Drafts

![Draft-page](https://github.com/f3ve/Blogium/src/images/user-page.png)

You can view your drafts by clicking 'View your drafts' in the nav bar

The draft page allows you to view posts that you have not yet published

You can pick up where you left off or delete drafts that you no longer need.

### Editing You Account

![Account page](https://github.com/f3ve/Blogium/src/images/user-page.png)

You can edit your account by clicking on 'Edit your account' in the nav bar

on this page you can upload a new profile image, change your name, update you email and update your bio. 

You can also delete your account from this page.

## Using the Editor 

![Editor](https://github.com/f3ve/Blogium/src/images/editor.png)

To get to the editor either click 'Create new post' in the nav bar or click edit on an existing post from you drafts or on your page. 

### AutoSave

When you start typing in the body of the editor it will automatically save your progress a few seconds after it has detected you have stopped typing you will see 'Saved' displayed underneath the body of your post.

All AutoSaves are saved as drafts until you manually click publish. If you are editing a post that has already been published the outsave will remove it from published and save it as a draft until you click publish again. 

### the toolbar

The toolbar is displayed at the top of the editor above the title input.

It has some basic editing tools, bold, italic, list, link, heading, and code block. 

in order to use bold or italic highlight the text you want to emphasize and click one or both to apply that style.

You can do the same with list or you can simple select anywhere on the text editor and click it to start a list. 

to insert a link, click the link icon to display the url input, type in the url you want to link, highlight the text you want to convert to a link and click create link.

To create a header highlight the text you want to turn into a header and click the header icon.

To create a code block you can select anywhere on the editor and click the code icon and it will create a code block where you can display bites of code. Code blocks cannot be inserted into the Title input or as the first line of the body. Code blocks must be placed on an empty line you cannot convert highlighted text into a code block.

Save Draft will save the post as a draft. 

Publish will display the post publicly for other users to read.

### Drafts

You can manually save your drafts by clicking 'save draft' on the editor toolbar, which will save your draft and redirect you to your draft page 

Drafts do not have to have a body or a title to be saved. Any drafts saved without a title will be displayed as untitled in your drafts page. 

### publish

You can publish you post by clicking publish in the editor toolbar. This will make your post public and redirect you to your page to view your published posts. 

In order to publish a post you must have a title that it as least 4 characters long. The body of your post must have a minimum length of 400 (including spaces) to be published.
