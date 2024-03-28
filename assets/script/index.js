'use strict';

import {User, Subscriber} from './subscriber.js';


const newSubscriber = new Subscriber('5635', 'john smith', 'john56smith', 'smith35@gmail.com', 12, 5, true);
const profile = document.querySelector('.profile');
const profileInfo = document.querySelector('.profile-info')
const message = document.querySelector('.message');
const images = document.querySelector('.images');
const postButton = document.querySelector('#button');
const profilePic = document.querySelector('.profile-pic');
const imageInput = document.getElementById('imageInput');
const userPostContainer = document.querySelector('.user-post');
const userName = newSubscriber.name;
const postDate = new Date().toLocaleDateString();
const postContent = document.querySelector('.postContent');
const postImage = document.querySelector('.postImage');
const warning = document.querySelector('.alert');



function displaySubscriberInfo() {
    if (profileInfo.style.display === 'none' || profileInfo.style.display === '') {
        // Display subscriber info
        profileInfo.style.display = 'block';
        // Assuming 'subscriber' is the instance of the Subscriber class
        profileInfo.innerHTML = `
            <div>ID: ${newSubscriber.id}</div>
            <div>Name: ${newSubscriber.name}</div>
            <div>Username: ${newSubscriber.userName}</div>
            <div>email: ${newSubscriber.email}</div>
            <div>Pages: ${newSubscriber.pages}</div>
            <div>Groups: ${newSubscriber.groups}</div>
            <div>Can Monetize: ${newSubscriber.canMonetize}</div>
        `;
    } else {
        // Hide subscriber info
        profileInfo.style.display = 'none';
    }
}

profile.addEventListener('click', displaySubscriberInfo);


let postArray = []; // Array to track posts

    postButton.addEventListener('click', function () {
        const messageValue = message.value.trim();
        const imageFile = imageInput.files[0];
        const imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';

        if (messageValue === '' && imageUrl === '') {
            warning.innerHTML = ('Please enter or upload something');
            return;
        }

        // Create a new post object
        const newPost = {
            userName: userName,
            postDate: new Date().toLocaleDateString(),
            message: messageValue,
            imageUrl: imageUrl
        };

        // Add the new post to the post array
        postArray.push(newPost);

        // Display the new post in the user-post section
        displayPost(newPost);

        // Reset input fields
        message.value = '';
        imageInput.value = '';
        document.getElementById('previewContainer').innerHTML = ''; // Clear any preview images if present
    });

    // Function to display a post in the user-post section
    function displayPost(post) {
        const newPostSection = document.createElement('section');
        newPostSection.classList.add('user-post');

        const userDiv = document.createElement('div');
        userDiv.classList.add('flex', 'space-between');

        const userInfoDiv = document.createElement('div');
        userInfoDiv.classList.add('flex', 'gap-10');

        const userImage = document.createElement('img');
        // userImage.src = './assets/media/my avatar new.jpg';
        // userImage.classList.add('post-ico');

        const userName = document.createElement('p');
        userName.textContent = post.userName;

        const postDate = document.createElement('p');
        postDate.textContent = post.postDate;

        const contentDiv = document.createElement('div');
        userDiv.classList.add('userPostMsg');
        contentDiv.textContent = post.message;

        const imageDiv = document.createElement('div');
        const image = document.createElement('img');
        image.src = post.imageUrl;
        image.classList.add('userPostImage');
        imageDiv.appendChild(image);

        userInfoDiv.appendChild(userImage);
        userInfoDiv.appendChild(userName);
        userDiv.appendChild(userInfoDiv);
        userDiv.appendChild(postDate);
        newPostSection.appendChild(userDiv);

        if (post.message.trim() !== '') {
            newPostSection.appendChild(contentDiv);
        }
        if (post.imageUrl !== '') {
            newPostSection.appendChild(imageDiv);
        }

        userPostContainer.insertAdjacentElement('afterbegin', newPostSection);

        // Show the user-post section
        userPostContainer.style.display = 'block';
    }

