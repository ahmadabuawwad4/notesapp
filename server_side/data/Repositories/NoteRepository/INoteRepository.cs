using data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repositories.NoteRepository
{
    public interface INoteRepository
    {
        Task<Note?> GetByIdAsync(int noteId, int userId);

        Task<List<Note>> GetAllAsync(int userId);

        Task<int> AddAsync(Note note);

        Task<bool> UpdateAsync(Note note);

        Task<bool> DeleteAsync(int noteId);
    }
}
