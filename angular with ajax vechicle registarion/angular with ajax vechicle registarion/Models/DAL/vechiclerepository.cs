using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace angular_with_ajax_vechicle_registarion.Models.DAL
{
    public class vechiclerepository : repoInterface
    {
        private portableDBEntities dbmodel;
        public vechiclerepository(portableDBEntities dbobj)
        {
            this.dbmodel = dbobj;
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        IEnumerable<vechicle> repoInterface.getallvechicle()
        {
            vechicle vobj = new vechicle();
            vobj.getallbrand = dbmodel.brands.ToList();
            var all = dbmodel.vechicles.ToList();
            return all;
        }

       
    }
}