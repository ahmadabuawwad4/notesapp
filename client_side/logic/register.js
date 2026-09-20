import { registration } from "../services/registrationService.js";

// =========================================================
// DOM Elements
// =========================================================

const form = document.getElementById("register-form");

const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const submitBtn = document.getElementById("submitBtn");

const togglePasswordBtn = document.getElementById("toggle-password");
const togglePasswordIcon = document.getElementById("toggle-password-icon");

const toggleConfirmBtn = document.getElementById("toggle-confirm-password");
const toggleConfirmIcon = document.getElementById("toggle-confirm-icon");

const bar1 = document.getElementById("bar-1");
const bar2 = document.getElementById("bar-2");
const bar3 = document.getElementById("bar-3");

const strengthLabel = document.getElementById("strength-label");

// =========================================================
// Password Visibility
// =========================================================

function togglePasswordVisibility(input, button, icon) {
  const isPassword = input.type === "password";

  input.type = isPassword ? "text" : "password";

  icon.textContent = isPassword ? "visibility_off" : "visibility";

  button.setAttribute("aria-pressed", String(isPassword));
}

// =========================================================
// Password Strength
// =========================================================

function resetStrengthBars() {
  bar1.classList.remove("is-inactive");
  bar2.classList.remove("is-inactive");
  bar3.classList.remove("is-inactive");
}

function setWeakPassword() {
  resetStrengthBars();

  bar2.classList.add("is-inactive");
  bar3.classList.add("is-inactive");

  bar1.style.backgroundColor = "#ba1a1a";

  strengthLabel.textContent = "Weak";
  strengthLabel.style.color = "#ba1a1a";
}

function setMediumPassword() {
  resetStrengthBars();

  bar3.classList.add("is-inactive");

  bar1.style.backgroundColor = "#4f46e5";
  bar2.style.backgroundColor = "#4f46e5";

  strengthLabel.textContent = "Medium";
  strengthLabel.style.color = "#4f46e5";
}

function setStrongPassword() {
  resetStrengthBars();

  bar1.style.backgroundColor = "#3525cd";
  bar2.style.backgroundColor = "#3525cd";
  bar3.style.backgroundColor = "#3525cd";

  strengthLabel.textContent = "Strong password";
  strengthLabel.style.color = "#3525cd";
}

function resetPasswordStrength() {
  resetStrengthBars();

  bar1.style.backgroundColor = "";
  bar2.style.backgroundColor = "";
  bar3.style.backgroundColor = "";

  strengthLabel.textContent = "Enter password";
  strengthLabel.style.color = "";
}

function updatePasswordStrength(password) {
  if (password.length === 0) {
    resetPasswordStrength();
    return;
  }

  if (password.length < 6) {
    setWeakPassword();
    return;
  }

  if (password.length < 10) {
    setMediumPassword();
    return;
  }

  setStrongPassword();
}

// =========================================================
// Register
// =========================================================

async function handleRegister(event) {
  event.preventDefault();

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    submitBtn.disabled = true;

    const user = await registration(fullName, email, password);

    console.log(user.userId);

    if (user.userId > 0) {
      window.location.href = "../index.html";
      return;
    }

    alert("Registration failed. Please try again.");
  } catch (error) {
    console.error("Registration error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    submitBtn.disabled = false;
  }
}

// =========================================================
// Event Listeners
// =========================================================

togglePasswordBtn.addEventListener("click", () => {
  togglePasswordVisibility(
    passwordInput,
    togglePasswordBtn,
    togglePasswordIcon,
  );
});

toggleConfirmBtn.addEventListener("click", () => {
  togglePasswordVisibility(
    confirmPasswordInput,
    toggleConfirmBtn,
    toggleConfirmIcon,
  );
});

passwordInput.addEventListener("input", () => {
  updatePasswordStrength(passwordInput.value);
});

form.addEventListener("submit", handleRegister);
