using grupo1GestorTickets.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace grupo1GestorTickets.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AreaController : ControllerBase
    {
        private readonly TicketsCTX _context;

        public AreaController(TicketsCTX context)
        {
            _context = context;
        }

        

        // GET: api/area
        [HttpGet("area")]
        public async Task<ActionResult<IEnumerable<Area>>> GetAreas()
        {
            return await _context.Areas.ToListAsync();
        }
        private bool AreaExists(int id)
        {
            return _context.Areas.Any(e => e.Id == id);
        }
    }
}
