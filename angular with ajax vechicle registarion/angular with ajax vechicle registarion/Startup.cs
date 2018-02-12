using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(angular_with_ajax_vechicle_registarion.Startup))]
namespace angular_with_ajax_vechicle_registarion
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
