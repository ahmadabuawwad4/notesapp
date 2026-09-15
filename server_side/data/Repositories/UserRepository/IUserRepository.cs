using data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<string?> GetUserCredential(string email);
        Task<User?> GetUserByEmail(string email);

        Task<int> CreateUser(User user);
    }
}
