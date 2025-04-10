import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: '88a13a71ac97c9b6c2e0', 
    cluster: 'eu', 
    encrypted: true,
});

export default echo;

