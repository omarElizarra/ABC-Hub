using DataAccess;

namespace Dominio
{
    public class UserModel

    {
        UserDao userDao = new UserDao();
        public bool LoginUser(string user, string pass)
        {
            return userDao.login(user, pass);
        }

    }
}
