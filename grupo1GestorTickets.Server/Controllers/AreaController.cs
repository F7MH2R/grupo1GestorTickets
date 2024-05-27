using Microsoft.AspNetCore.Mvc;

namespace grupo1GestorTickets.Server.Controllers
{
    public class AreaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
