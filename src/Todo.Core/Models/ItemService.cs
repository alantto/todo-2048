using System;
using System.Collections.Generic;
using System.Dynamic;
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

        public Item Get(Guid id) => _repository.GetAllItems().FirstOrDefault(x => x.Id == id);

        public Item Add(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                throw new ArgumentException("Title must have a real value");
            }
            
            var item = new Item()
            {
                Id = Guid.NewGuid(),
                Title = title,
                State = ItemState.Todo
            };

            _repository.Add(item);
            return item;
        }

        public void MarkAsDone(Item item)
        {
            if (item.State == ItemState.Done)
            {
                return;
            }

            item.State = ItemState.Done;
            _repository.Save(item);
        }
    }
}