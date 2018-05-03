import React, { Component } from 'react';
import './App.css';

class App extends Component {
    componentDidMount() {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        } else {
            // Run notification loop every hour.
            setInterval(() => {
                // Send notification.
                this.onNotify();
            }, 3600000 /* 1 hour */);
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
