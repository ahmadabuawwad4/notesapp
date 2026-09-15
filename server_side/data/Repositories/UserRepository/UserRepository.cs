using data.Data;
using data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly NotesAppDbContext _context;

        public UserRepository(NotesAppDbContext context)
        {
            _context = context;
        }

        public async Task<string?> GetUserCredential(string email)
        {
            var user = await _context.Users
                .Where(u => u.Email == email).Select(
                u => new User
                {
                    PasswordHash = u.PasswordHash
                })
                .AsNoTracking().FirstOrDefaultAsync();

            if (user == null)
                return null;

            return user.PasswordHash;
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            var user = await _context.Users
                .Select(u => new User
                {
                    UserId = u.UserId,
                    FullName = u.FullName,
                    Email = u.Email,
                    Role = u.Role,

                })
                .AsNoTracking().Where(u => u.Email == email).FirstOrDefaultAsync();
            
            return user;
        }

        public async Task<int> CreateUser(User user)
        {
            _context.Users.Add(user);
            if(await _context.SaveChangesAsync() > 0)
            {
                return user.UserId;
            }
            return -1;
        }

    }
}
