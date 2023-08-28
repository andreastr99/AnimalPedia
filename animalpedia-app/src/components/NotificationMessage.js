import React, { useState } from 'react';

const NotificationMessage = () => {
    const [showNotification, setShowNotification] = useState(false);

    const handleShow = () => {
        setShowNotification(false);
    };

    const handleClose = () => {
        setShowNotification(false);
    };

    return (
        <>
            {showNotification && (
                <div className="sticky-social-bar alert alert-success alert-dismissible" role="notification">
                    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                    <button type="button" className="btn-close" onClick={handleClose} />
                </div>
            )}
        </>
    );
};

export default NotificationMessage;
