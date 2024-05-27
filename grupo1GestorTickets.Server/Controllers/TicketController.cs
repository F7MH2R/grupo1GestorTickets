using Microsoft.AspNetCore.Mvc;

namespace grupo1GestorTickets.Server.Controllers
{
    public class TicketController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
