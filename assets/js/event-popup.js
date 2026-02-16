document.addEventListener('DOMContentLoaded', function () {
    const closeBtn = document.querySelector('.event-popup-close');
    const popup = document.querySelector('.event-popup');

    if (closeBtn && popup) {
        closeBtn.addEventListener('click', function () {
            // Add animation class for closing
            popup.style.animation = 'slideOutUp 0.4s ease-out forwards';

            // Remove element after animation completes
            setTimeout(() => {
                popup.style.display = 'none';
            }, 400);
        });
    }
});
