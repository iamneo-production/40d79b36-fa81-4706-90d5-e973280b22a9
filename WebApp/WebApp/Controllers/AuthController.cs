using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using System.Security.Cryptography;
using System.Text;

namespace WebApp.Controllers
{
    public class AuthController : ApiController
    {
        Entities db = new Entities();

        string key = "1pxt56";

        [HttpPost]
        [Route("isUserPresent")]
        public string isUserPresent(Login login)
        {
            Login inTable = db.Logins.Find(login.email);
            if (inTable == null)
            {
                return "enter valid email";
            }
            var pE = Encrypt(login.password);
            if (pE == inTable.password)
            {
                return db.Users.Where(u => u.email == login.email).FirstOrDefault<User>().UserId.ToString();
            }
            else
            {
                return "enter valid password";
            }
        }

        [HttpPost]
        [Route("isAdminPresent")]
        public string isAdminPresent(Login login)
        {
            Login inTable = db.Logins.Find(login.email);
            if (inTable == null)
            {
                return "enter valid email";
            }
            var pE = Encrypt(login.password);
            if (pE == inTable.password)
            {
                return "valid user";
            }
            else
            {
                return "enter valid password";
            }
        }

        [HttpPost]
        [Route("saveUser")]
        public string saveUser([FromBody] User user)
        {
            user.password = Encrypt(user.password);

            Login login = new Login();
            login.email = user.email;
            login.password = user.password;

            db.Users.Add(user);
            db.SaveChanges();

            db.Logins.Add(login);
            db.SaveChanges();

            return "user added";
        }

        [HttpPost]
        [Route("saveAdmin")]
        public string saveAdmin(User user)
        {
            return saveUser(user);
        }

        public string Encrypt(string Encryptval)
        {
            byte[] SrctArray;
            byte[] EnctArray = UTF8Encoding.UTF8.GetBytes(Encryptval);
            SrctArray = UTF8Encoding.UTF8.GetBytes(key);
            TripleDESCryptoServiceProvider objt = new TripleDESCryptoServiceProvider();
            MD5CryptoServiceProvider objcrpt = new MD5CryptoServiceProvider();
            SrctArray = objcrpt.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
            objcrpt.Clear();
            objt.Key = SrctArray;
            objt.Mode = CipherMode.ECB;
            objt.Padding = PaddingMode.PKCS7;
            ICryptoTransform crptotrns = objt.CreateEncryptor();
            byte[] resArray = crptotrns.TransformFinalBlock(EnctArray, 0, EnctArray.Length);
            objt.Clear();
            return Convert.ToBase64String(resArray, 0, resArray.Length);
        }
    }
}
