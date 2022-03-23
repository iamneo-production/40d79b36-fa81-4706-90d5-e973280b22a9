using WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Controllers;

namespace WebApp.Controllers
{
    public class ReviewController : ApiController
    {
        ReviewEntities db = new ReviewEntities();
        

        //Add post method
        [HttpPost]
        [Route("api/addReview/{review}")]
        public string addReview(Review review)
        {
            db.Reviews.Add(review);
            db.SaveChanges();
            return "Review added!";
        }

        //Get single Record
        [HttpGet]
        [Route("api/getReview/{id}")]
        public Review getReview(int id)
        {
            Review review = db.Reviews.Find(id);
            return review;
        }

        
    }
}

//Get All Records
/*[HttpGet]
[Route("api/Review/getReview")]
public IEnumerable<Review> Get()
{
    return db.Reviews.ToList();
}*/

//Update the Record
/*public string Put(int id, Review review)
{
    var review_ = db.Reviews.Find(id);
    review_.Name = review.Name;
    review_.Email = review.Email;
    review_.Message = review.Message;

    db.Entry(review_).State = System.Data.Entity.EntityState.Modified;
    db.SaveChanges();

    return "Review Updated";

}

//Delete the record
public string Delete(int id)
{
    Review review = db.Reviews.Find(id);
    db.Reviews.Remove(review);
    db.SaveChanges();
    return "Review Deleted";
}*/

/*[HttpGet]
[Route("getReview")]
public IEnumerable<Review> getReview()
{
    return db.Reviews.ToList();
}
[HttpGet]
[Route("getReview")]
public Review getReview(int Id)
{
    return db.Reviews.FirstOrDefault(r => r.Id == Id);
}*/
