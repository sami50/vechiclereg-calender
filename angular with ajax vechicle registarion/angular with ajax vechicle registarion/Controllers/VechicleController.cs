using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using angular_with_ajax_vechicle_registarion.Models;
using Microsoft.Reporting.WebForms;
using CrystalDecisions.CrystalReports.Engine;
using angular_with_ajax_vechicle_registarion.Models.DAL;

namespace angular_with_ajax_vechicle_registarion.Controllers
{
    public class VechicleController : Controller
    {
        //initializing repository
        private repoInterface interfaceObject;
        //set constructor
        public VechicleController()
        {
            this.interfaceObject = new vechiclerepository(new portableDBEntities());
        }



    //angular 
    //get all vechicles

            public  JsonResult getallvechicle()
        {
            using (portableDBEntities dbmodel = new portableDBEntities())
            {
                //vechicle vobj = new vechicle();
                //vobj.getallbrand = dbmodel.brands.ToList();
                //var all = dbmodel.vechicles.ToList();
                var result = interfaceObject.getallvechicle();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
           
        }
        //get all vechicle brands
        public JsonResult getallbrands()
        {
            using (portableDBEntities dbmodel = new portableDBEntities())
            {
                vechicle vobj = new vechicle();
                vobj.getallbrand = dbmodel.brands.ToList();
                var all = dbmodel.vechicles.ToList();

                return Json(vobj.getallbrand, JsonRequestBehavior.AllowGet);
            }
        }


        //add vechicle
        [HttpPost]
        public string Addvechicle(vechicle vechicle)
        { if (vechicle != null)
            {
                try
                {

                   //var img= Convert.ToBase64String(vechicle.imagepath);
                   // var img = Encoding.UTF8.GetString(vechicle.imagepath);
                    //vechicle.imagepath = "sample";
                    using (portableDBEntities dbmodel = new portableDBEntities())
                    {

                        dbmodel.vechicles.Add(vechicle);
                        dbmodel.SaveChanges();
                        return "sucessfully  added";
                    }
                }
                catch (Exception e)
                {
                    return e.ToString();
                }
            }
            else
            {
                return "data error";
            }
           }
        //delete
        [HttpPost]
        public string deletevechicle(string id)
        {

            using (portableDBEntities dbmodel = new portableDBEntities())
            {
                int gotid = Int32.Parse(id);
                var set = dbmodel.vechicles.Find(gotid);
                dbmodel.vechicles.Remove(set);
                dbmodel.SaveChanges();

                return "DELETE record sucessfully"+set;
            }

        }
        //edit
        [HttpPost]
        public string editvechicle(vechicle vechicle)
        {
            if (vechicle != null)
            {

                using (portableDBEntities dbmodel = new portableDBEntities())
                {
                    int gotid = Convert.ToInt32(vechicle.vid);
                    vechicle _vechicle = dbmodel.vechicles.Where(b => b.vid == gotid).FirstOrDefault();

                    _vechicle.vtype = vechicle.vtype;
                    _vechicle.vbrand = vechicle.vbrand;
                    _vechicle.vowner = vechicle.vowner;
                    _vechicle.imagepath = vechicle.imagepath;
                    _vechicle.date = vechicle.date;
                    dbmodel.SaveChanges();
                    return "Vechicle record updated successfully";
                }
            }
            else
            {
                return "error in upadating";
            }

        }

        public JsonResult autocom(string argmy)
        {
            List<string> all;

            using (portableDBEntities dbmodel = new portableDBEntities())
            {
                //var all = dbmodel.vechicles.ToList();
                all = dbmodel.vechicles.Where
                    (X => X.vowner.StartsWith(argmy)).Select(c => c.vowner).ToList();

                return Json(all, JsonRequestBehavior.AllowGet);

            }


        }


        [HttpPost]
        public string checkimg(string file2)
        {

            string ss = "ss";
            return file2 ;
        }
        //reporting

            public ActionResult ExportReport(string id)
        {
            //    CrystalReportViewer rv = new CrystalReportViewer();
            //    ReportDocument cryRpt = new ReportDocument();
            //    cryRpt.Load(@"E:\home made - Copy - Copy\angular with ajax vechicle registarion\angular with ajax vechicle registarion\Reports\Vehicle.rpt");
            //    crystalReportViewer1.ReportSource = cryRpt;
            //    crystalReportViewer1.Refresh();

            LocalReport lr = new LocalReport();
        string path = Path.Combine(Server.MapPath("~/Reports"), "Report-All.rdlc");

            if (System.IO.File.Exists(path))
            {
                lr.ReportPath = path;
            }
            else
            {
                return View("Index");
            }
              List<vechicle> vlst = new List<vechicle>();
            using (portableDBEntities dbmodel = new portableDBEntities())
            {
                vlst = dbmodel.vechicles.ToList();
                
                //foreach (var item in vlst)
                //{
                //    Convert.FromBase64String(base64imageString)
                //    item.imagepath = sa;

                //}
            }

            ReportDataSource rd = new ReportDataSource("DataSet1", vlst);
                    lr.DataSources.Add(rd);
                                string reportType = id;
                    string mimeType;
                    string encoding;
                    string fileNameExtension;

                    string deviceInfo =
                         "<DeviceInfo>" +
                         "<OutputFormat>" + id + "</OutputFormat>" +
                         "<PageWidth>8.5in</PageWidth>" +
                         "<PageHeight>11in </PageHeight >" +
                         "<MarginTop>0.5in</MarginTop>" +
                         "<Marginleft>1in</Marginleft>" +
                         "<MarginBottom>0.5in</MarginBottom>" +
                         "<MarginRight>1in</MarginRight>" +
                         "</DeviceInfo>";

                    Warning[] warnings;
                    string[] streams;
                    byte[] renderedBytes;


                    renderedBytes = lr.Render(
                                    reportType,
                                    deviceInfo,
                                    out mimeType,
                                    out encoding,
                                    out fileNameExtension,
                                    out streams,
                                    out warnings);

            return File(renderedBytes, mimeType);
        }
        //categorise  report
        
        public ActionResult categoriseReport(string id,string category)
        {
            LocalReport lr = new LocalReport();
            string path = Path.Combine(Server.MapPath("~/Reports"), "Brands.rdlc");
           
            //lr.SetParameters(p1);
            //lr.Refresh();
            if (System.IO.File.Exists(path))
            {
                lr.ReportPath = path;
            }
            else
            {
                //return View("Index");
            }

            List<vechicle> vlst = new List<vechicle>();
            using (portableDBEntities dbmodel = new portableDBEntities())
            {
                //vlst = dbmodel.vechicles.ToList();
                vlst = dbmodel.vechicles.Where(x => x.vbrand == category).ToList();
            }

            ReportDataSource rd = new ReportDataSource("DataSet2", vlst);
            lr.DataSources.Add(rd);

            ReportParameter p1 = new ReportParameter("brand",category);
            lr.SetParameters(new ReportParameter[] { p1 });
            string reportType = id;
            string mimeType;
            string encoding;
            string fileNameExtension;

            string deviceInfo =
                 "<DeviceInfo>" +
                 "<OutputFormat>" + id + "</OutputFormat>" +
                 "<PageWidth>8.5in</PageWidth>" +
                 "<PageHeight>11in </PageHeight >" +
                 "<MarginTop>0.5in</MarginTop>" +
                 "<Marginleft>1in</Marginleft>" +
                 "<MarginBottom>0.5in</MarginBottom>" +
                 "<MarginRight>1in</MarginRight>" +
                 "</DeviceInfo>";

            Warning[] warnings;
            string[] streams;
            byte[] renderedBytes;


            renderedBytes = lr.Render(
                reportType,
                deviceInfo,
                out mimeType,
                out encoding,
                out fileNameExtension,
                out streams,
                out warnings);

            return File(renderedBytes, mimeType);
        }



        public ActionResult sheduler()
        {
            return View();
        }
        public ActionResult calender()
        {

            return View();
        }
        //calender generate
        [HttpGet]
        public JsonResult getcalevents()
        {
            using (portableDBEntities dbmodel = new portableDBEntities())
            {
                var result = dbmodel.bookings.ToList();
               return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
        //save calender event
        [HttpPost]
        public JsonResult saveEvent(booking e)
        {
            var status = false;
            using (portableDBEntities dbmodel = new portableDBEntities())
            {
                if (e.bkid > 0)
                {
                    var v = dbmodel.bookings.Where(a => a.bkid == e.bkid).FirstOrDefault();
                    if (v != null)
                    {
                        v.bkdate1 = e.bkdate1;
                        v.bkdate2 = e.bkdate2;
                    }

                }
                else
                {
                    dbmodel.bookings.Add(e);
                }
                dbmodel.SaveChanges();
                status = true;
            }
                return new JsonResult { Data = new { status = status } };
        }

        public JsonResult getvechicletocal()
        {
            using (portableDBEntities dbmodel = new portableDBEntities())
            {
                var rslt = dbmodel.vebookings.ToList();
                return Json(rslt, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult DeleteEvent(int id)
        {
            var status = false;

            using (portableDBEntities dbmodel = new portableDBEntities())
            {
                var v = dbmodel.bookings.Where(a => a.bkid == id).FirstOrDefault();
                if(v != null){
                    dbmodel.bookings.Remove(v);
                    dbmodel.SaveChanges();
                    status = true;
                }
            }

                return new JsonResult { Data = new { status = status } };

        }

        // GET: Vechicle
        public ActionResult Index()
        {
            using (portableDBEntities dbmodel = new portableDBEntities())
            {
                
                return View(dbmodel.vechicles.ToList());
            }
            
        }



        // GET: Vechicle/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Vechicle/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Vechicle/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Vechicle/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Vechicle/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Vechicle/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Vechicle/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
