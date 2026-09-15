using System;
using System.Collections.Generic;

namespace data.Models;

public partial class Note
{
    public int NoteId { get; set; }

    public int UserId { get; set; }

    public string Title { get; set; } = null!;

    public string? Content { get; set; }

    public bool IsPinned { get; set; }

    public bool IsArchived { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
