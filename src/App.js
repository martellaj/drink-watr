import React, { Component } from 'react';
import './App.css';

class App extends Component {
    reminderTime = 3600000; // 1 hour

    constructor() {
        super();

        this.state = {
            isPaused: false,
            timeRemaining: this.reminderTime
        };
    }

    componentDidMount() {
        // Prompt for permission immediately (since that's the whole point).
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
            return;
        }

        const interval = 200; // How quickly timer is updated

        // Start loop to decrement timer.
        setInterval(() => {
            // If timer is paused, this is a no-op.
            if (this.state.isPaused) {
                return;
            }

            // Get remaining time.
            let timeRemaining = this.state.timeRemaining - interval;

            // If time is 0 (or somehow negative), send notification and reset.
            if (timeRemaining <= 0) {
                this.sendNotification();
                timeRemaining = this.reminderTime;
            }

            // Update time remaining.
            this.setState({
                timeRemaining: timeRemaining
            });
        }, interval);
    }

    render() {
        return (
            <div className="app">
                {/* Message to tell user to allow notifications. */}
                {Notification.permission !== 'granted' && (
                    <span className="enableNotificationsNotification">
                        Enable notifications and refresh (or this site will be
                        useless)!
                    </span>
                )}

                {/* Timer controls */}
                {Notification.permission === 'granted' && (
                    <span className="timer">
                        {/* Displays the remaining time */}
                        <span className="timerTimeRemaining">
                            {(this.state.timeRemaining / 1000 / 60).toFixed(2)}
                        </span>{' '}
                        minutes remaining until the next refill
                        <div className="timerButtons">
                            {/* Button to manually restart timer */}
                            <button
                                className="timerButton"
                                onClick={this.onRestartTimerClicked.bind(this)}
                            >
                                Restart Timer
                            </button>
                            {/* If not paused, show pause button */}
                            {!this.state.isPaused && (
                                <button
                                    className="timerButton"
                                    onClick={this.onPauseTimerClicked.bind(
                                        this
                                    )}
                                >
                                    Pause Timer
                                </button>
                            )}
                            {/* If paused, show resume button */}
                            {this.state.isPaused && (
                                <button
                                    className="timerButton"
                                    onClick={this.onResumeTimerClicked.bind(
                                        this
                                    )}
                                >
                                    Resume Timer
                                </button>
                            )}
                        </div>
                    </span>
                )}
            </div>
        );
    }

    // Sends desktop notification to drink that water
    sendNotification() {
        new Notification('Danny says,', {
            icon: 'https://i.imgur.com/aJMMwsY.jpg',
            body: `"Drink that cup and fill it up!"`,
            requireInteraction: true
        });
    }

    // Restarts the timer
    onRestartTimerClicked() {
        this.setState({
            timeRemaining: this.reminderTime
        });
    }

    // Pauses the timer
    onPauseTimerClicked() {
        this.setState({
            isPaused: true
        });
    }

    // Resumes the timer
    onResumeTimerClicked() {
        this.setState({
            isPaused: false
        });
    }
}

export default App;
