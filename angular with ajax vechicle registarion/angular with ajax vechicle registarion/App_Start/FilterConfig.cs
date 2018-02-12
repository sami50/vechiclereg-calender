using System.Web;
using System.Web.Mvc;

namespace angular_with_ajax_vechicle_registarion
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
