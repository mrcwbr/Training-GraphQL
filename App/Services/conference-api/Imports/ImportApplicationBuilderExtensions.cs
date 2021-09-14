using System.Threading.Tasks;
using conference_api.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace conference_api.Imports
{
    public static class ImportApplicationBuilderExtensions
    {
        public static IApplicationBuilder EnsureDatabaseIsCreated(this IApplicationBuilder app)
        {
            IDbContextFactory<ApplicationDbContext> factory = app.ApplicationServices.GetRequiredService<IDbContextFactory<ApplicationDbContext>>();
            using ApplicationDbContext dbContext = factory.CreateDbContext();
            if (dbContext.Database.EnsureCreated())
            {
                var importer = new DataImporter();
                importer.LoadData(dbContext);
            }

            return app;
        }
    }
}