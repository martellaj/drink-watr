import React, { Component } from 'react';
import './App.css';

class App extends Component {
    componentDidMount() {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        } else {
            // Set initial hour (so we don't instantly get notification).
            let lastNotifiedHour = new Date().getHours();

            // Run notification loop every 15 minutes.
            setInterval(() => {
                // Get current hour.
                const currentHour = new Date().getHours();

                // If hour is different, send a notification and reset hour.
                if (lastNotifiedHour !== currentHour) {
                    // Send notification.
                    this.onNotify();

                    // Set new hour.
                    lastNotifiedHour = currentHour;
                }
            }, 900000 /* 15 minutes */);
        }
    }

    render() {
        return (
            <div className="app">
                <img
                    alt="Danny Drinkwater drinking water."
                    className="image"
                    src="https://i.imgur.com/KRLeTNq.jpg"
                    onClick={this.onNotify}
                />
            </div>
        );
    }

    onNotify() {
        new Notification('Danny says,', {
            icon: 'https://i.imgur.com/aJMMwsY.jpg',
            body: `"Drink that cup and fill it up!"`,
            requireInteraction: true
        });
    }
}

export default App;
