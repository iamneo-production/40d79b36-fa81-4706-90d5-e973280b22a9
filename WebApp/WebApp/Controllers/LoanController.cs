using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using Newtonsoft.Json.Linq;
using System.Web;
using System.IO;

namespace WebApp.Controllers
{
    public class LoanController : ApiController
    {
        Entities db = new Entities();

        [HttpPost]
        [Route("addDocument")]
        public int AddDocument()
        {
            var httpRequest = HttpContext.Current.Request;
            var postedFile = httpRequest.Files["file"];
            var dType = httpRequest.Form["type"];
            byte[] bytes;
            using (BinaryReader br = new BinaryReader(postedFile.InputStream))
            {
                bytes = br.ReadBytes(postedFile.ContentLength);
            }
            Document document = new Document
            {
                documentType = dType,
                documentUpload = bytes
            };
            db.Documents.Add(document);
            db.SaveChanges();
            return document.documentId;
        }

        [HttpPost]
        [Route ("addLoan")]
        public string AddLoan([FromBody] LoanApplicant loanApplicant)
        {
            db.LoanApplicants.Add(loanApplicant);
            db.SaveChanges();
            return "loan applied succesfully";
        }
        //get all
        public IEnumerable<LoanApplicant> getLoan()
        {
            return db.LoanApplicants.ToList();
        }

        //get specified
        public LoanApplicant getLoan(int id)
        {
            LoanApplicant la = db.LoanApplicants.Find(id);
            return la;
        }

        //update
        [HttpPut]
        public string editLoan(int id, LoanApplicant loanApplicant)
        {
            var loanApplicant_ = db.LoanApplicants.Find(id);
            loanApplicant_.applicantName = loanApplicant.applicantName;
            loanApplicant_.applicantAddress = loanApplicant.applicantAddress;
            loanApplicant_.loanAmountRequired = loanApplicant.loanAmountRequired;
            loanApplicant_.applicantSalary = loanApplicant.applicantSalary;
            loanApplicant_.applicantEmail = loanApplicant.applicantEmail;
            loanApplicant_.applicantAadhaar = loanApplicant_.applicantAadhaar;
            loanApplicant_.applicantAddress = loanApplicant.applicantAddress.ToString();
            loanApplicant_.applicantMobile = loanApplicant_.applicantMobile;
            loanApplicant_.applicantPan = loanApplicant_.applicantPan;
            loanApplicant_.LoanRepaymentMonths = loanApplicant_.LoanRepaymentMonths;
            db.Entry(loanApplicant_).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return "loan details updated";
        }

        [HttpDelete]
        public string deleteLoan(int id)
        {
            LoanApplicant la = db.LoanApplicants.Find(id);
            if (la != null)
            {
                db.LoanApplicants.Remove(la);
                db.SaveChanges();
                return "Loan Application deleted";
            }
            db.SaveChanges();
            return "Loan deletion failed";

        }
    }
}
