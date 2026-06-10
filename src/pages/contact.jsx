import { useState, useContext } from 'react';

export default function calendarForm() {
    return (
        <div>
            <form action="http://localhost:5000/api/auth" method="POST">
                <div>
                    <textarea id="username" name="username" placeholder="Write your username here..."></textarea>
                </div>
                <div>
                    <textarea id="password" name="password" placeholder="Write your password here..."></textarea>
                </div>
                <button type="submit">Save Note</button>
            </form>
        </div>
    )
}