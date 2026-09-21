using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace application.Services
{
    public interface IAIService
    {
        static async Task<string> ImproveNoteByAiAsync(string noteContent)
        {
            // Simulate AI improvement of the note content
            return noteContent + "\n\n[Improved by AI]";
        }
    }
}
