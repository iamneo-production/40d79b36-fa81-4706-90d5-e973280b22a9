﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using Newtonsoft.Json.Linq;
using System.Web;
using System.IO;
using System.Net.Http.Headers;

namespace WebApp.Controllers
{
    public class LoanController : ApiController
    {
        Entities db = new Entities();

        [HttpPost]
        [Route("addDocument")]
        public IHttpActionResult AddDocument()
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
            return Ok(document.documentId);
        }

        [HttpGet]
        [Route("getDocument")]
        public HttpResponseMessage GetDocument(int id)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            Document document = db.Documents.ToList().Find(p => p.documentId == id);
            response.Content = new ByteArrayContent(document.documentUpload);
            response.Content.Headers.ContentLength = document.documentUpload.LongLength;
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "files" + document.documentType;
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(document.documentType);
            return response;
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
        [HttpGet]
        [Route("getLoan")]
        public IEnumerable<LoanApplicant> GetLoan(String email)
        {
            return (from o in db.LoanApplicants
                        where o.applicantEmail == email
                        select new 
                        {
                            applicantName = o.applicantName,
                            applicantAddress = o.applicantAddress,
                            loanAmountRequired = o.loanAmountRequired,
                            applicantSalary = o.applicantSalary,
                            applicantEmail = o.applicantEmail,
                            applicantAadhaar = o.applicantAadhaar,
                            applicantMobile = o.applicantMobile,
                            applicantPan = o.applicantPan,
                            LoanRepaymentMonths = o.LoanRepaymentMonths,
                            LoanRepaymentMethod = o.LoanRepaymentMethod,
                            loanType = o.loanType,
                            TimestampofLoan = o.TimestampofLoan,
                            documentId = o.documentId,
                            DocumentUpload=o.Document.documentUpload
                        }).ToList().Select(x => new LoanApplicant {
                            applicantName = x.applicantName,
                            applicantAddress = x.applicantAddress,
                            loanAmountRequired = x.loanAmountRequired,
                            applicantSalary = x.applicantSalary,
                            applicantEmail = x.applicantEmail,
                            applicantAadhaar = x.applicantAadhaar,
                            applicantMobile = x.applicantMobile,
                            applicantPan = x.applicantPan,
                            LoanRepaymentMonths = x.LoanRepaymentMonths,
                            LoanRepaymentMethod = x.LoanRepaymentMethod,
                            loanType = x.loanType,
                            TimestampofLoan = x.TimestampofLoan,
                            documentId = x.documentId,
                           

                        });
        }

        //get specified
        /* public LoanApplicant getLoan(int id)
         {
             LoanApplicant la = db.LoanApplicants.Find(id);
             return la;
         }
 */
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
