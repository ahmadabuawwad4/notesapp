using data.Data;
using data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repositories.NoteRepository
{
    public class NoteRepository : INoteRepository
    {
        private readonly NotesAppDbContext _context;

        public NoteRepository(NotesAppDbContext context)
        {
            _context = context;
        }

        public async Task<Note?> GetByIdAsync(int noteId, int userId)
        {
            return await _context.Notes.AsNoTracking()
                .FirstOrDefaultAsync(n =>
                    n.NoteId == noteId &&
                    n.UserId == userId);
        }

        public async Task<List<Note>> GetAllAsync(int userId)
        {
            return await _context.Notes
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.IsPinned)
                .ThenByDescending(n => n.UpdatedAt)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<int> AddAsync(Note note)
        {
            _context.Notes.Add(note);
            if(await _context.SaveChangesAsync()>0)
                return note.NoteId;
            return -1;
        }

        public async Task<bool> UpdateAsync(Note note)
        {
            var existNote = await _context.Notes.FirstOrDefaultAsync(n => n.NoteId == note.NoteId);
            if (existNote == null)
            {
                return false;
            }

            existNote.Title = note.Title;
            existNote.Content = note.Content;
            existNote.IsPinned = note.IsPinned;
            existNote.IsArchived = note.IsArchived;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int noteId)
        {
            var existNote = await _context.Notes.FirstOrDefaultAsync(n => n.NoteId == noteId);
            if (existNote == null)
            {
                return false;
            }
            _context.Notes.Remove(existNote);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
