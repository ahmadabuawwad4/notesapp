using application.DTOs;
using data.Repositories.UserRepository;
using data.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace application.Services.UserServices
{
    public class UserService:IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> IsCorrectPassword(loginRequest UserCredential)
        {
            if (UserCredential != null)
            {
                string? passwordHash = await _userRepository.GetUserCredential(UserCredential.Email);
                if(passwordHash == null)
                    return false;

                return BCrypt.Net.BCrypt.Verify(UserCredential.Password, passwordHash);

            }
            return false;
        }

        public async Task<string?> GenerateToken(loginRequest UserCredential)
        {
            if (UserCredential != null)
            {
                var user = await _userRepository.GetUserByEmail(UserCredential.Email);
                if (user == null) return null;
                var claims = new[]
                {
                    new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Email, user.Email),
                    new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, user.Role)
                };

                var key = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes("SuperSecretKey_ChangeThis_ReallyLong123"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "NotesAppApi",
                    audience: "NotesAppApiUsers",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            return null;
        }

        public async Task<int> CreateUser(registrationUserDto newUser)
        {
            if (newUser != null)
            {
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
                newUser.Password = passwordHash;
                
                User user = new User
                {
                    FullName = newUser.FullName,
                    Email = newUser.Email,
                    PasswordHash = passwordHash,
                    Role = "User"
                };

                return await _userRepository.CreateUser(user);

            }
            return -1;
        }

    }
}
