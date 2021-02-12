using System.Collections.Generic;
using Todo.Core.Models;

namespace Todo.Core
{
    public interface IItemRepository
    {
        IReadOnlyCollection<Item> GetAllItems();
    }
}