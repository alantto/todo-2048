using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Todo.Core.Models;

namespace Todo.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ILogger<ItemController> _logger;
        private readonly ItemService _itemService;

        public ItemController(ILogger<ItemController> logger, ItemService itemService)
        {
            _logger = logger;
            _itemService = itemService;
        }

        [HttpPost]
        public Item Post(string title) => _itemService.Add(title);
        
        [HttpGet]
        public IEnumerable<Item> Get() => _itemService.GetAllItems();

        [HttpPost]
        [Route("Done/{id}")]
        public ActionResult MarkAsDone(Guid id)
        {
            var item = _itemService.Get(id);
            if (item == null)
                return NotFound();
            _itemService.MarkAsDone(item);
            // Re-fetch item to get updated state
            return Ok(_itemService.Get(id));
        }
    }
}