import {registration} from "../services/registrationService.js";


const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const con_password = document.getElementById("confirm-password");
const submitBtn = document.getElementById("submitBtn");

(function () {
          const passwordInput = password;
          const togglePasswordBtn = document.getElementById("toggle-password");
          const togglePasswordIcon = document.getElementById(
            "toggle-password-icon",
          );

          const confirmPasswordInput = con_password
          const toggleConfirmBtn = document.getElementById(
            "toggle-confirm-password",
          );
          const toggleConfirmIcon = document.getElementById(
            "toggle-confirm-icon",
          );

          const bar1 = document.getElementById("bar-1");
          const bar2 = document.getElementById("bar-2");
          const bar3 = document.getElementById("bar-3");
          const strengthLabel = document.getElementById("strength-label");

          function toggleVisibility(input, icon) {
            if (input.type === "password") {
              input.type = "text";
              icon.textContent = "visibility_off";
            } else {
              input.type = "password";
              icon.textContent = "visibility";
            }
          }

          if (togglePasswordBtn && passwordInput) {
            togglePasswordBtn.addEventListener("click", () => {
              toggleVisibility(passwordInput, togglePasswordIcon);
            });
          }

          if (toggleConfirmBtn && confirmPasswordInput) {
            toggleConfirmBtn.addEventListener("click", () => {
              toggleVisibility(confirmPasswordInput, toggleConfirmIcon);
            });
          }

          if (passwordInput) {
            passwordInput.addEventListener("input", (e) => {
              const val = e.target.value;
              if (val.length === 0) {
                bar1.className =
                  "h-full rounded-full bg-secondary-container transition-all duration-300";
                bar2.className =
                  "h-full rounded-full bg-secondary-container transition-all duration-300";
                bar3.className =
                  "h-full rounded-full bg-secondary-container transition-all duration-300";
                strengthLabel.textContent = "Enter password";
                strengthLabel.className = "text-secondary font-semibold";
              } else if (val.length < 6) {
                bar1.className =
                  "h-full rounded-full bg-error transition-all duration-300";
                bar2.className =
                  "h-full rounded-full bg-secondary-container transition-all duration-300";
                bar3.className =
                  "h-full rounded-full bg-secondary-container transition-all duration-300";
                strengthLabel.textContent = "Weak";
                strengthLabel.className = "text-error font-semibold";
              } else if (val.length < 10) {
                bar1.className =
                  "h-full rounded-full bg-primary-container transition-all duration-300";
                bar2.className =
                  "h-full rounded-full bg-primary-container transition-all duration-300";
                bar3.className =
                  "h-full rounded-full bg-secondary-container transition-all duration-300";
                strengthLabel.textContent = "Medium";
                strengthLabel.className =
                  "text-primary-container font-semibold";
              } else {
                bar1.className =
                  "h-full rounded-full bg-primary transition-all duration-300";
                bar2.className =
                  "h-full rounded-full bg-primary transition-all duration-300";
                bar3.className =
                  "h-full rounded-full bg-primary transition-all duration-300";
                strengthLabel.textContent = "Strong password";
                strengthLabel.className = "text-primary font-semibold";
              }
            });
          }

          submitBtn.addEventListener("click",async(event)=>{
            event.preventDefault();
            const User = await registration(fullName.value,email.value,password.value);
            
            console.log(User.userId);
            
            if(User.userId>0){
              window.location.href = "../index.html"
            }
            else
              alert("Try!");
            })

        })();




