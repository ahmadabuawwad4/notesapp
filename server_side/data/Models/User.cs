using System;
using System.Collections.Generic;

namespace data.Models;

public partial class User
{
    public int UserId { get; set; }

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public string Role { get; set; } = null!;

    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();
}
