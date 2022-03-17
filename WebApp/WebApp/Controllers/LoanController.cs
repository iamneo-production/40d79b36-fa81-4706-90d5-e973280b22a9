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
            Document document = db.Documents.Find(id);
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
        [Route("getLoans")]
        public IEnumerable<LoanApplicant> GetLoans(String email)
        {
            return db.LoanApplicants.Where(x => x.applicantEmail == email).ToList().Select(x => new LoanApplicant{
                    loanId = x.loanId,
                    applicantAadhaar = x.applicantAadhaar,
                    applicantAddress = x.applicantAddress,
                    applicantName = x.applicantName,
                    applicantEmail = x.applicantEmail,
                    applicantMobile = x.applicantMobile,
                    applicantPan = x.applicantPan,
                    loanType = x.loanType,
                    applicantSalary = x.applicantSalary,
                    loanAmountRequired = x.loanAmountRequired,
                    LoanRepaymentMethod = x.LoanRepaymentMethod,
                    LoanRepaymentMonths = x.LoanRepaymentMonths,
                    TimestampofLoan = x.TimestampofLoan,
                    documentId = x.documentId
                }
            );
        }

        [HttpGet]
        [Route("getAllLoans")]
        public IEnumerable<LoanApplicant> getAllLoans()
        {
            return db.LoanApplicants.ToList().Select(x => new LoanApplicant
            {
                loanId = x.loanId,
                applicantAadhaar = x.applicantAadhaar,
                applicantAddress = x.applicantAddress,
                applicantName = x.applicantName,
                applicantEmail = x.applicantEmail,
                applicantMobile = x.applicantMobile,
                applicantPan = x.applicantPan,
                loanType = x.loanType,
                applicantSalary = x.applicantSalary,
                loanAmountRequired = x.loanAmountRequired,
                LoanRepaymentMethod = x.LoanRepaymentMethod,
                LoanRepaymentMonths = x.LoanRepaymentMonths,
                TimestampofLoan = x.TimestampofLoan,
                documentId = x.documentId
            });
        }

        //get specified
        [HttpGet]
        [Route("getLoan")]
        public LoanApplicant getLoan(int loanid)
         {
            LoanApplicant la = null;
            if(db.LoanApplicants.Any(x => x.loanId==loanid)) {
                la = db.LoanApplicants.Where(x => x.loanId== loanid).ToList().Select(x => new LoanApplicant
                {  loanId = x.loanId,
                     applicantAadhaar = x.applicantAadhaar,
                     applicantAddress = x.applicantAddress,
                     applicantName = x.applicantName,
                     applicantEmail = x.applicantEmail,
                     applicantMobile = x.applicantMobile,
                     applicantPan = x.applicantPan,
                     loanType = x.loanType,
                     applicantSalary = x.applicantSalary,
                     loanAmountRequired = x.loanAmountRequired,
                     LoanRepaymentMethod = x.LoanRepaymentMethod,
                     LoanRepaymentMonths = x.LoanRepaymentMonths,
                     TimestampofLoan = x.TimestampofLoan,
                     documentId = x.documentId
                }).First();
            }
            return la;
         }
 
        //update
        [HttpPut]
        [Route("editLoan")]
        public string editLoan(int id, LoanApplicant loanApplicant)
        {
            var loanApplicant_ = db.LoanApplicants.Find(id);
            loanApplicant_.applicantName = loanApplicant.applicantName;
            loanApplicant_.applicantAddress = loanApplicant.applicantAddress;
            loanApplicant_.loanAmountRequired = loanApplicant.loanAmountRequired;
            loanApplicant_.applicantSalary = loanApplicant.applicantSalary;
            loanApplicant_.applicantEmail = loanApplicant.applicantEmail;
            loanApplicant_.applicantAadhaar = loanApplicant.applicantAadhaar;
            loanApplicant_.applicantAddress = loanApplicant.applicantAddress.ToString();
            loanApplicant_.applicantMobile = loanApplicant.applicantMobile;
            loanApplicant_.applicantPan = loanApplicant.applicantPan;
            loanApplicant_.LoanRepaymentMonths = loanApplicant.LoanRepaymentMonths;
            loanApplicant_.documentId = loanApplicant.documentId;
            db.Entry(loanApplicant_).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return "loan details updated";
        }

        [HttpPut]
        [Route("updateStatus")]
        public string updateStatus(int id, Boolean val, Object obj)
        {
            LoanApplicant loanApplicant = db.LoanApplicants.Find(id);
            if (val == true)
            {
                loanApplicant.TimestampofLoan = DateTime.Now.ToString();
            }
            else
            {
                loanApplicant.TimestampofLoan = "0";
            }
            db.Entry(loanApplicant).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return "status updated";
        }

        [HttpDelete]
        [Route("deleteLoan")]
        public string deleteLoan(int id)
        {
            LoanApplicant la = db.LoanApplicants.Find(id);
            
                db.LoanApplicants.Remove(la);
                db.SaveChanges();
                return "Loan Application deleted";
        }
    }
}
