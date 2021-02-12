using System.Collections.Generic;
using System.Linq;

namespace Todo.Core.Models
{
    public class ItemService
    {
        private readonly IItemRepository _repository;

        public ItemService(IItemRepository repository)
        {
            _repository = repository;
        }

        public IReadOnlyCollection<Item> GetAllItems() => _repository.GetAllItems();

        public IReadOnlyCollection<Item> GetAllItems(ItemState state) =>
            GetAllItems().Where(x => x.State == state).ToArray();
    }
}