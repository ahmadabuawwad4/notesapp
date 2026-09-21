using application.DTOs;
using data.Models;
using data.Repositories.NoteRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace application.Services.NoteServices
{
    public class NoteService : INoteService
    {
        private readonly INoteRepository _noteRepository;

        public NoteService(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<int> CreateAsync(int userId, CreateNoteDto dto)
        {
            var note = new Note
            {
                UserId = userId,
                Title = dto.Title,
                Content = dto.Content,
                IsPinned = dto.IsPinned,
                IsArchived = dto.IsArchived
            };

            return await _noteRepository.AddAsync(note);
        }

        public async Task<Note?> GetByIdAsync(
            int noteId,
            int userId)
        {
            return await _noteRepository
                .GetByIdAsync(noteId, userId);
        }

        public async Task<List<Note>> GetAllAsync(
            int userId)
        {
            return await _noteRepository
                .GetAllAsync(userId);
        }

        public async Task<bool> UpdateAsync(
            UpdateNoteDto dto)
        {
            var note = new Note
            {
                NoteId = dto.noteId,
                Title = dto.title,
                Content = dto.content,
                IsPinned = dto.isPinned,
                IsArchived = dto.isArchived
            };

            await _noteRepository.UpdateAsync(note);

            return true;
        }

        public async Task<bool> DeleteAsync(
            int noteId)
        {

            return await _noteRepository.DeleteAsync(noteId);
        }

        public async Task<string> ImproveNote(
            string noteContent)
        {
            
            return await AIServices.ImproveNoteByAiAsync(noteContent);

        }
    }
}
