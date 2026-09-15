using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace application.DTOs
{
    public class CreateNoteDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Content { get; set; }
        public bool IsPinned { get; set; } = false;
        public bool IsArchived { get; set; } = false;
    }
}
