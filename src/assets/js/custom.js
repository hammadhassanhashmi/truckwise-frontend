// Handle file upload display for both front and back IDs
document.querySelectorAll('.file-input').forEach(input => {
  input.addEventListener('change', function(e) {
    const fileName = e.target.files[0]?.name || '';
    const icon = this.nextElementSibling.querySelector('i'); // Get the icon
    const uploadDisplay = this.nextElementSibling.nextElementSibling;
    
    uploadDisplay.querySelector('.file-name').textContent = fileName;
    uploadDisplay.style.display = 'flex';
    icon.classList.add('file-selected'); // Add color class
  });
});

// Clear file input function
function clearFile(inputId) {
  const input = document.getElementById(inputId);
  const icon = input.nextElementSibling.querySelector('i'); // Get the icon
  const uploadDisplay = input.nextElementSibling.nextElementSibling;
  
  // Reset input and display
  input.value = '';
  uploadDisplay.style.display = 'none';
  uploadDisplay.querySelector('.file-name').textContent = '';
  icon.classList.remove('file-selected'); // Remove color class
}


document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('[data-step]');
  const progressSteps = document.querySelectorAll('.form-stepper .step');
  const formStepper = document.querySelector('.form-stepper');
  let currentStep = 1;

  // Initialize form
  initializeForm();

  document.querySelectorAll('[data-next]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
        }
    });
  });

  function initializeForm() {
    steps.forEach(step => step.style.display = 'none');
    document.querySelector('[data-step="1"]').style.display = 'block';
    formStepper.style.display = 'none'; // Hide stepper initially
  }

  function showStep(stepNumber) {
    // Show/hide form-stepper based on step
    if (stepNumber === 1) {
        formStepper.style.display = 'none';
    } else {
        formStepper.style.display = 'flex';
    }

    steps.forEach(step => {
        step.style.display = step.dataset.step == stepNumber ? 'block' : 'none';
    });
  }

  function updateProgress() {
      if (currentStep > 1) {
          progressSteps.forEach((step, index) => {
              step.classList.toggle('active', index < currentStep - 1);
          });
      }
  }

  function validateStep(stepNumber) {
    switch(stepNumber) {
      case 1:
          return validateStep1();
      case 2:
          return validateStep2();
      case 3:
          return validateStep3();
      default:
          return true;
    }
  }

  function validateStep1() {
      // Add validation logic if needed for step 1
      return true;
  }

  function validateStep2() {
      const frontUpload = document.getElementById('frontUpload');
      const backUpload = document.getElementById('backUpload');
      
      if (!frontUpload.files.length || !backUpload.files.length) {
          alert('Please upload both front and back of your Emirates ID');
          return false;
      }
      return true;
  }

  function validateStep3() {
      const form = document.querySelector('[data-step="3"] form');
      const inputs = form.querySelectorAll('input');
      let valid = true;

      // Basic validation
      inputs.forEach(input => {
          if (!input.value.trim()) {
              valid = false;
              input.classList.add('is-invalid');
          } else {
              input.classList.remove('is-invalid');
          }
      });

      // Password match validation
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      if (password.value !== confirmPassword.value) {
          valid = false;
          password.classList.add('is-invalid');
          confirmPassword.classList.add('is-invalid');
          alert('Passwords do not match');
      }

      // Email validation
      const email = document.getElementById('email');
      if (!validateEmail(email.value)) {
          valid = false;
          email.classList.add('is-invalid');
          alert('Please enter a valid email address');
      }

      return valid;
  }

  function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

// File upload validation (from previous implementation)
document.querySelectorAll('.file-input').forEach(input => {
  input.addEventListener('change', function(e) {
      const fileName = e.target.files[0]?.name || '';
      const icon = this.nextElementSibling.querySelector('i');
      const uploadDisplay = this.nextElementSibling.nextElementSibling;
      
      uploadDisplay.querySelector('.file-name').textContent = fileName;
      uploadDisplay.style.display = 'flex';
      icon.classList.add('file-selected');
  });
});

function clearFile(inputId) {
  const input = document.getElementById(inputId);
  const icon = input.nextElementSibling.querySelector('i');
  const uploadDisplay = input.nextElementSibling.nextElementSibling;
  
  input.value = '';
  uploadDisplay.style.display = 'none';
  uploadDisplay.querySelector('.file-name').textContent = '';
  icon.classList.remove('file-selected');
}

$(document).ready(function(){
    $('.vehicle-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false
    });
});



const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');
togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Toggle eye / eye-slash icon
    eyeIcon.classList.toggle('bi-eye');
    eyeIcon.classList.toggle('bi-eye-slash');
});