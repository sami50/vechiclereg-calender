using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace angular_with_ajax_vechicle_registarion.Models.DAL
{
   public interface repoInterface : IDisposable
    {

        IEnumerable<vechicle> getallvechicle();

    }
}
