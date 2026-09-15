using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace application.DTOs
{
    public class UpdateNoteDto
    {
        public int noteId { get; set; }
        public string title { get; set; } = string.Empty;
        public string? content { get; set; }
        public bool isPinned { get; set; }
        public bool isArchived { get; set; }
    }
}
