
document.addEventListener('DOMContentLoaded', function() {
    
    const userName = prompt("Please enter your name:") || "Guest";
    document.getElementById('welcome-text').textContent = `Hi ${userName}, Welcome To Website`;
    

    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    

    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
            }
        });
    });
});


function updateCurrentTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const formattedTime = now.toLocaleDateString('en-US', options);
    document.getElementById('currentTime').textContent = formattedTime;
}

const form = document.getElementById('messageForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.classList.add('hidden');
        msg.textContent = '';
    });
    
    const name = document.getElementById('name').value.trim();
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked');
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const pesan = document.getElementById('pesan').value.trim();
    
    let isValid = true;
    
    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 3) {
        showError('name', 'Name must be at least 3 characters');
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError('name', 'Name must contain only letters');
        isValid = false;
    }
    
    if (tanggalLahir === '') {
        showError('tanggalLahir', 'Date of birth is required');
        isValid = false;
    } else {
        const birthDate = new Date(tanggalLahir);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (birthDate > today) {
            showError('tanggalLahir', 'Date of birth cannot be in the future');
            isValid = false;
        } 
    }
    
    if (!jenisKelamin) {
        showError('jenisKelamin', 'Please select your gender');
        isValid = false;
    }
    
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (phone === '') {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number (min 10 digits)');
        isValid = false;
    }
    
    if (pesan === '') {
        showError('pesan', 'pesan is required');
        isValid = false;
    } else if (pesan.length > 100) {
        showError('pesan', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        displayResult(name, tanggalLahir, jenisKelamin.value, email, phone, pesan);
        
        alert('Form submitted successfully!');
        
        form.reset();
    }
});

function showError(fieldId, pesan) {
    const field = document.getElementById(fieldId);
    let errorElement;
    
    if (fieldId === 'jenisKelamin') {
        errorElement = document.querySelector('input[name="jenisKelamin"]').closest('div').parentElement.querySelector('.error-message');
    } else {
        errorElement = field.parentElement.querySelector('.error-message');
    }
    
    if (errorElement) {
        errorElement.textContent = pesan;
        errorElement.classList.remove('hidden');
    }

    if (fieldId !== 'jenisKelamin') {
        field.classList.add('border-red-500');
        field.classList.remove('border-gray-300');
    }
}


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}


function displayResult(name, tanggalLahir, jenisKelamin, email, phone, pesan) {
    document.getElementById('resultName').textContent = name;
    document.getElementById('resultTanggalLahir').textContent = formatDate(tanggalLahir);
    document.getElementById('resultJenisKelamin').textContent = jenisKelamin;
    document.getElementById('resultEmail').textContent = email;
    document.getElementById('resultPhone').textContent = phone;
    document.getElementById('resultpesan').textContent = pesan;
    
    document.getElementById('formResult').classList.remove('hidden');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}


document.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('input', function() {
        this.classList.remove('border-red-500');
        this.classList.add('border-gray-300');
        
        const errorElement = this.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    });
});


document.querySelectorAll('input[name="jenisKelamin"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const errorElement = this.closest('div').parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    });
});