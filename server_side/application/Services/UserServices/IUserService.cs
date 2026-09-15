using application.DTOs;
using data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace application.Services.UserServices
{
    public interface IUserService
    {
        Task<bool> IsCorrectPassword(loginRequest UserCredential);

        Task<string?> GenerateToken(loginRequest UserCredential);

        Task<int> CreateUser(registrationUserDto newUser);

    }
}
