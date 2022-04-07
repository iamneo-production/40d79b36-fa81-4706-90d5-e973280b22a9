using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using WebApp.Controllers;

namespace WebApp.Controllers
{
    public class UserController : ApiController
    {
        Entities db = new Entities();


        [HttpPost]
        [Route("addUser")]
        public string addUser(User user)
        {
            Console.WriteLine(user);
            return new AuthController().saveUser(user);
        }

        [HttpGet]
        [Route("getUser")]
        public User getUser(int userid)
        {
            User user = db.Users.Find(userid);
            return user;
        }

        [HttpPut]
        [Route("editUser")]
        public string editUser(int userid, User user)
        {
            User user1 = db.Users.Find(userid);
            Login login = db.Logins.Find(user1.email);
            db.Logins.Remove(login);
            db.SaveChanges();

            login = new Login();

            login.email = user.email;
            login.password = user1.password;

            user1.mobileNumber = user.mobileNumber;
            user1.username = user.username;
            user1.email = user.email;

            if (user.password != "")
            {
                user1.password = new AuthController().Encrypt(user.password);
                login.password = user1.password;
            }
            user1.userRole = user.userRole;

            db.Entry(user1).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();

            db.Logins.Add(login);
            db.SaveChanges();

            return "user edited";
        }

        [HttpDelete]
        [Route("deleteUser")]
        public string deleteUser(int userid)
        {
            User user = db.Users.Find(userid);
            Login login = db.Logins.Find(user.email);

            db.Logins.Remove(login);
            db.SaveChanges();

            db.Users.Remove(user);
            db.SaveChanges();

            return "user deleted";
        }
    }
}
