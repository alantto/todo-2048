using System;
using System.Collections.Generic;
using Todo.Core.Models;

namespace Todo.Core
{
    public interface IItemRepository
    {
        IReadOnlyCollection<Item> GetAllItems();
        void Add(Item item);
        void Save(Item item);
        void Delete(Item item);
    }
}