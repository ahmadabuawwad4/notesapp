using application.DTOs;
using application.Services.UserServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace apis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] loginRequest request)
        {

            if (request == null)
            {
                return BadRequest("Login request cannot be null.");
            }

            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Email and password cannot be empty.");
            }

            if (! await _userService.IsCorrectPassword(request))
            {
                return Unauthorized("Invalid credentials");
            }

            string? token = await _userService.GenerateToken(request);
            if (token == null)
            {
                return Unauthorized("Failed to generate token");
            }

            return Ok(new { Token = token });
        }

    }
}
