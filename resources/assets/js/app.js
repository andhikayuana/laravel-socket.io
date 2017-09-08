/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

// window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example', require('./components/Example.vue'));

// const app = new Vue({
// el: '#app'
// });

/**
 * import socket io client
 */
const socket = require('socket.io-client')('http://localhost:9090');

/**
 * Init Component
 */
const $window = $(window);
const $loginPage = $('.login.page');
const $chatPage = $('.chat.page');
const $usernameInput = $('.usernameInput');
const $messages = $('.messages');
const $inputMessage = $('.inputMessage');


/**
 * Vars
 */
let username;
let $currentInput = $usernameInput.focus();

/**
 * Keyboard Events
 */
$window.keydown(function (event) {

    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
        $currentInput.focus();
    }

    /**
     * When user press enter key
     */
    if (event.which === 13) {
        chat.handlePressEnter();
    }
});

/**
 * Chat Functionalities
 */
const chat = {

    handlePressEnter: () => {
        if (username === undefined) {
            chat.loginUser($usernameInput.val().trim());
        } else {
            if (chat.isValidInputMessage()) {
                chat.sendMessage($inputMessage.val().trim());
            } else {
                alert('Please type message');
                chat.setInputFocus();
            }
        }

    },

    isValidInputMessage: () => $inputMessage.val().length > 0 ? true : false,

    sendMessage: (message) => {
        $currentInput.val('');
        chat.setInputFocus();
        const data = {
            time: (new Date()).getTime(),
            user: username,
            message: message
        };
        socket.emit('chat-message', data);
    },

    loginUser: (user) => {
        $loginPage.fadeOut();
        $chatPage.show();
        username = user;
        chat.setInputFocus();
        socket.emit('user-join', username);
    },

    setInputFocus: () => {
        $currentInput = $inputMessage.focus();
    },

    log: (message, options) => {
        const element = $('<li>').addClass('log').text(message);
        chat.addMessageElement(element, options);
    },

    addChatMessage: (data) => {


        const $usernameElement = $('<span class="username"/>').text(data.user);
        const $messageBodyElement = $('<span class="messageBody">').text(data.message);

        const $messageElement = $('<li class="message"/>')
            .data('username', data.user)
            .append($usernameElement, $messageBodyElement);

        chat.addMessageElement($messageElement);
    },

    addMessageElement: (element, options) => {
        const $element = $(element);

        if (!options) options = {};
        if (typeof options.fade === undefined) options.fade = true;
        if (typeof options.prepend === undefined) options.prepend = false;
        if (options.fade) $element.hide().fadeIn(150);

        if (options.prepend) {
            $messages.prepend($element);
        } else {
            $messages.append($element);
        }

        $messages[0].scrollTop = $messages[0].scrollHeight;
    }
};


/**
 * Events
 */
socket.on('connect', () => {

    console.log('connected');
});
socket.on('chat-message', (data) => {

    chat.addChatMessage(data);
});
socket.on('user-join', (data) => {

    chat.log(data + ' joined at this room');
});
socket.on('user-unjoin', (data) => {

    chat.log(data + ' left this room');
});