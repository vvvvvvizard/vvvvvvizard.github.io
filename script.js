// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '1000';
        document.body.appendChild(toastContainer);
    }

    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showToast('Please fill out all fields', 'error');
        return;
    }

    // Show loading state
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Send form data to Formspree
    fetch('https://formspree.io/f/mvoeyqjq', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        
        if (response.ok) {
            // Clear form
            this.reset();
            // Show success message
            showToast('Thank you for your message! I will get back to you soon.', 'success');
        } else {
            throw new Error('Failed to send message');
        }
    })
    .catch(error => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        showToast('Oops! Something went wrong. Please try again later.', 'error');
        console.error('Form submission error:', error);
    });
});

// Toast notification system
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
