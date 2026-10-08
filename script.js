document.addEventListener('DOMContentLoaded', function () {
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            const isActive = navMenu.classList.contains('active');
            
            if (spans.length >= 3) {
                spans[0].style.transform = isActive ? 'rotate(45deg) translate(5px, 5px)' : 'none';
                spans[1].style.opacity = isActive ? '0' : '1';
                spans[2].style.transform = isActive ? 'rotate(-45deg) translate(7px, -7px)' : 'none';
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const faqItem = this.parentElement;
            
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) item.classList.remove('active');
            });

            faqItem.classList.toggle('active');
        });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const currCards = document.querySelectorAll('.curr-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            currCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = '0.4s';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const form = document.getElementById('registrationForm');
    const successMsg = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            document.querySelectorAll('.error-msg').forEach(msg => msg.innerText = '');
            if (successMsg) successMsg.innerText = '';

            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const msg = document.getElementById('message').value.trim();

            let valid = true;

            if (name.length < 3) {
                document.getElementById('nameError').innerText = 'Please enter your full name (at least 3 characters).';
                valid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').innerText = 'Please enter a valid email address.';
                valid = false;
            }

            if (phone.length < 10 || isNaN(phone)) {
                document.getElementById('phoneError').innerText = 'Please enter a valid 10-digit phone number.';
                valid = false;
            }

            if (msg.length < 10) {
                document.getElementById('msgError').innerText = 'Tell us a bit more! (at least 10 characters).';
                valid = false;
            }

            if (valid) {
                if (successMsg) successMsg.innerText = 'Application Sent! We will contact you soon.';
                form.reset();
            }
        });
    }

});
