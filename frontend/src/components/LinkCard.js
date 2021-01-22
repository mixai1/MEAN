import React from 'react';

export const LinkCart = ({ link }) => {
    return (
        <div>
            <h2>Link</h2>
            <p>Your Link: <a href={link.to}>{link.to}</a></p>
            <p>From of: <a href={link.from}>{link.from}</a></p>
            <p>Count clik: <strong>{link.clicks}</strong></p>
            <p>Date create: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    );
}
