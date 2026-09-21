using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace application.Services
{
    public class AIServices : IAIService
    {
        public static async Task<string> ImproveNoteByAiAsync(string noteContent)
        {
            string prompt = $"Please improve the following note content:\n\n{noteContent}";

            return await AskAI(prompt);

        }

        private static async Task<string> AskAI(string note)
        {
            using var client = new HttpClient();

            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue(
                    "Bearer",
                    "YOUR_API_KEY"
                );

            var prompt = $"""
        Improve the following note.

        Rules:
        - Keep the original meaning and information.
        - Fix grammar, spelling, and unclear wording.
        - Make it clearer and better organized.
        - Keep it concise.
        - Do not turn it into an email or formal letter.
        - Do not add a subject, greeting, signature, or new information.
        - Return only the improved note.
        - Do not wrap the result in quotation marks.

        Note:
        {note}
        """;

            var requestBody = new
            {
                model = "openai/gpt-4o",
                messages = new[]
                {
            new
            {
                role = "system",
                content = "You improve personal notes while preserving their original meaning."
            },
            new
            {
                role = "user",
                content = prompt
            }
        },
                max_tokens = 300
            };

            var json = JsonSerializer.Serialize(requestBody);

            using var content = new StringContent(
                json,
                Encoding.UTF8,
                "application/json"
            );

            var response = await client.PostAsync(
                "https://openrouter.ai/api/v1/chat/completions",
                content
            );

            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync();

            using var document = JsonDocument.Parse(responseJson);

            var improvedNote =
                document.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

            return improvedNote?.Trim() ?? "";
        }
    }
}
