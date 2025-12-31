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

    // Form Submission Handling (Demo)
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        // In a real application, you would send the data to a server here.
        // For this demo, we'll just show an alert.
        const name = $('#name').val();
        alert(`Thank you, ${name}! Your message has been sent. We will get back to you shortly.`);
        $(this)[0].reset();
    });
});
