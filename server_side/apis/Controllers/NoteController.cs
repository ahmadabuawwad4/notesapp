using application.DTOs;
using application.Services.NoteServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


[Authorize]
[ApiController]
[Route("api/Note")]
public class NotesController : ControllerBase
{
    private readonly INoteService _noteService;

    public NotesController(INoteService noteService)
    {
        _noteService = noteService;
    }

    //GET: api/notes
    [HttpGet("GetAllNotes", Name = "GetAllNotes")]
    public async Task<IActionResult> GetAll([FromServices] IAuthorizationService authorizationService)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var authResult = await authorizationService.AuthorizeAsync(User,userId,"UserOwner");

        if (!authResult.Succeeded)
            return Forbid(); // 403


        var notes = await _noteService
            .GetAllAsync(userId);

        return Ok(notes);
    }

    // GET: api/notes/5
    [HttpGet("GetNote", Name = "GetNote")]
    public async Task<IActionResult> GetById(int noteId,[FromServices] IAuthorizationService authorizationService)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var authResult = await authorizationService.AuthorizeAsync(User, userId, "UserOwner");

        if (!authResult.Succeeded)
            return Forbid(); // 403

        var note = await _noteService
            .GetByIdAsync(noteId, userId);

        if (note == null)
            return NotFound();

        return Ok(note);
    }

    // POST: api/notes
    [HttpPost("AddNote", Name = "AddNote")]
    public async Task<IActionResult> Create(CreateNoteDto dto, [FromServices] IAuthorizationService authorizationService)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var authResult = await authorizationService.AuthorizeAsync(User, userId, "UserOwner");

        if (!authResult.Succeeded)
            return Forbid(); // 403

        int noteId = await _noteService
            .CreateAsync(userId,dto);

        if (noteId == -1)
            return StatusCode(500, "Failed to create note");

        return CreatedAtAction(nameof(GetById), new { id = noteId });
    }

    // PUT: api/notes/5
    [HttpPut("EditNote", Name = "EditNote")]
    public async Task<IActionResult> Update(UpdateNoteDto dto,[FromServices] IAuthorizationService authorizationService)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var authResult = await authorizationService.AuthorizeAsync(User, userId, "UserOwner");

        if (!authResult.Succeeded)
            return Forbid(); // 403

        bool updated = await _noteService.UpdateAsync(dto);

        if (!updated)
            return NotFound();

        return Ok(updated);
    }

    // DELETE: api/notes/5
    [HttpDelete("DeleteNote", Name = "DeleteNote")]
    public async Task<IActionResult> Delete(int noteId, [FromServices] IAuthorizationService authorizationService)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var authResult = await authorizationService.AuthorizeAsync(User, userId, "UserOwner");

        if (!authResult.Succeeded)
            return Forbid(); // 403

        bool deleted = await _noteService
            .DeleteAsync(noteId);

        if (!deleted)
            return NotFound();

        return Ok(deleted);
    }

    [HttpPost("ImproveNote", Name = "ImproveNote")]
    public async Task<IActionResult> ImproveNote(NoteContentDto dto, [FromServices] IAuthorizationService authorizationService)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var authResult = await authorizationService.AuthorizeAsync(User, userId, "UserOwner");

        if (!authResult.Succeeded)
            return Forbid(); // 403

        string improvedContent = await _noteService.ImproveNote(dto.noteContent ?? "");

        return Ok(improvedContent);
    }
}