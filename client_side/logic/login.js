import { Login } from "../services/loginService.js";

// ==========================================
// DOM Elements
// Responsibility:
// Centralize all elements used by this module.
// ==========================================

const loginForm = document.getElementById("login-form");

const emailInput = document.getElementById("email-field");
const passwordInput = document.getElementById("password-field");

const togglePasswordButton = document.getElementById("toggle-pwd-btn");
const passwordIcon = document.getElementById("pwd-icon");

const submitButton = document.getElementById("submit-btn");
const submitText = document.getElementById("submit-text");
const submitIcon = document.getElementById("submit-icon");

const errorContainer = document.getElementById("error-container");
const errorText = document.getElementById("error-text");

// ==========================================
// Password Visibility
// Responsibility:
// Show / hide password input.
// ==========================================

togglePasswordButton.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";
    passwordIcon.textContent = isPassword
        ? "visibility_off"
        : "visibility";
});


// ==========================================
// Login Form
// Responsibility:
// Handle login form submission.
// ==========================================

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    await triggerSubmit();
});


// ==========================================
// Login Submission
// Responsibility:
// Handle loading, API request and success state.
// ==========================================

function showError(message) {
    errorText.textContent = message;
    errorContainer.classList.remove("is-hidden");
}

async function triggerSubmit() {
    setLoadingState();

    try {
        const result = await Login(
            emailInput.value.trim(),
            passwordInput.value
        );

        if (result === false) {
            showError("Invalid email or password. Please try again.");
            resetSubmitState();
            return;
        }


        setSuccessState();

        setTimeout(() => {
            window.location.href = "./dashboard.html";
        }, 450);

    } catch (error) {
        console.error("Login failed:", error);
        showError(error.message || "An error occurred during login. Please try again.");
        resetSubmitState();
    }
}


// ==========================================
// Loading State
// Responsibility:
// Display loading state while login request
// is being processed.
// ==========================================

function setLoadingState() {
    errorContainer.classList.add("is-hidden");
    submitButton.disabled = true;

    submitText.textContent = "Signing in...";

    submitIcon.textContent = "sync";
    submitIcon.classList.add("submit-button__icon--loading");
}


// ==========================================
// Success State
// Responsibility:
// Display successful login state before redirect.
// ==========================================

function setSuccessState() {
    submitText.textContent = "Redirecting...";

    submitIcon.textContent = "check";
    submitIcon.classList.remove("submit-button__icon--loading");

    submitButton.classList.add("submit-button--success");
}


// ==========================================
// Reset State
// Responsibility:
// Restore button to its normal state after
// failed login.
// ==========================================

function resetSubmitState() {
    submitButton.disabled = false;

    submitText.textContent = "Sign In";

    submitIcon.textContent = "arrow_forward";

    submitIcon.classList.remove("submit-button__icon--loading");
    submitButton.classList.remove("submit-button--success");
}