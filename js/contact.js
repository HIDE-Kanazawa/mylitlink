document.addEventListener('DOMContentLoaded', () => {
    const contactBtns = document.querySelectorAll('.js-contact-trigger');
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.getElementById('contact-close');
    const copyBtn = document.getElementById('contact-copy-btn');
    const emailText = document.getElementById('contact-email-text');
    const toast = document.getElementById('contact-toast');

    if (contactBtns.length === 0 || !modal || !closeBtn) return;

    // Open Modal
    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.showModal();
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('is-open');
        // Wait for animation to finish before closing dialog
        setTimeout(() => {
            modal.close();
            document.body.style.overflow = '';
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        const rect = modal.getBoundingClientRect();
        const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            closeModal();
        }
    });

    // Copy to Clipboard
    if (copyBtn && emailText) {
        copyBtn.addEventListener('click', async () => {
            const email = emailText.innerText;
            try {
                await navigator.clipboard.writeText(email);
                showToast();
            } catch (err) {
                console.error('Failed to copy:', err);
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("Copy");
                textArea.remove();
                showToast();
            }
        });
    }

    function showToast() {
        if (!toast) return;
        toast.classList.add('is-visible');
        setTimeout(() => {
            toast.classList.remove('is-visible');
        }, 2000);
    }
});
