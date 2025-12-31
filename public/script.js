$(document).ready(function() {
    // Mobile Menu Toggle
    $('#mobile-menu').click(function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
    });

    // Close mobile menu when a link is clicked
    $('.nav-link').click(function() {
        $('#mobile-menu').removeClass('active');
        $('.nav-menu').removeClass('active');
    });

    // Smooth Scrolling
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 70 // Offset for fixed header
        }, 500, 'linear');
    });

    // Form Submission Handling
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        const form = this;
        const formData = new FormData(form);
        const submitBtn = $(this).find('button[type="submit"]');
        const originalBtnText = submitBtn.text();
        
        submitBtn.prop('disabled', true).text('Sending...');

        fetch('https://kg-transport.pages.dev/send-email', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you! Your message has been sent. We will get back to you shortly.');
                form.reset();
            } else {
                alert('There was a problem sending your message. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem sending your message. Please try again later.');
        })
        .finally(() => {
            submitBtn.prop('disabled', false).text(originalBtnText);
        });
    });
});
