using application.DTOs;
using application.Services.UserServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace apis.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [AllowAnonymous]
        [HttpPost("Register",Name = "Register")]
        public async Task<IActionResult> register([FromBody] registrationUserDto newUser)
        {
            if(newUser == null)
            {
                return BadRequest("User data cannot be null.");
            }

            var userId = await _userService.CreateUser(newUser);
            if (userId == -1)
            {
                return BadRequest("Failed to create user.");
            }

            return Ok(new { UserId = userId });
        }
    }
}
