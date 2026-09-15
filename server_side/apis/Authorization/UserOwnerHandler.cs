using data.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace apis.Authorization
{
    public class UserOwnerHandler : AuthorizationHandler<UserOwnerRequirement, int>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, UserOwnerRequirement requirement, int resourceUserId)
        {
            
            // Check if the user is the owner of the resource
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);
            if (!context.User.IsInRole("Admin") && userIdClaim != null && 
                int.TryParse(userIdClaim.Value, out int userId) && userId == resourceUserId)
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }
            // If neither condition is met, do not succeed the requirement
            return Task.CompletedTask;
        }
    }
}
