using application.DTOs;
using data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace application.Services.NoteServices
{
    public interface INoteService
    {
        Task<int> CreateAsync(int userId, CreateNoteDto dto);

        Task<Note?> GetByIdAsync(int noteId, int userId);

        Task<List<Note>> GetAllAsync(int userId);

        Task<bool> UpdateAsync(UpdateNoteDto dto);

        Task<bool> DeleteAsync(int noteId);

    }
}
