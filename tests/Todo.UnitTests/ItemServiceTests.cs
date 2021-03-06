using System;
using System.Collections.Generic;
using System.Linq;
using Todo.Core;
using Todo.Core.Models;
using Xunit;

namespace Todo.UnitTests
{
    public class ItemServiceTests
    {
        private ItemService _sut;

        public ItemServiceTests()
        {
            _sut = new ItemService(new ItemRepositoryStub());
        }

        [Fact]
        public void GetAllItems_Should_ReturnAllItems()
        {
            Assert.Equal(2, _sut.GetAllItems().Count);
        }

        [Theory]
        [InlineData(ItemState.Done, 1, "Some Title")]
        [InlineData(ItemState.Todo, 1, "Another Title")]
        public void GetAllItemsWithState_Should_ReturnOnlyMatchingItem(ItemState state, int targetCount, string title)
        {
            var result = _sut.GetAllItems(state);

            Assert.Equal(targetCount, result.Count);
            Assert.Contains(result, x => x.Title == title);
        }

        [Fact]
        public void Add_GivenValidTitle_ShouldReturnItem()
        {
            var title = "Some new title";
            var result = _sut.Add(title);

            Assert.NotNull(result);
            Assert.Equal(title, result.Title);
            Assert.Equal(ItemState.Todo, result.State);
        }

        [Fact]
        public void Add_GivenValidTitle_ShouldAddToAllItems()
        {
            var originalCount = _sut.GetAllItems().Count;
            var result = _sut.Add("another new title");

            Assert.Equal(originalCount + 1, _sut.GetAllItems().Count);
        }

        [Theory]
        [InlineData("")]
        [InlineData(null)]
        [InlineData("     ")]
        public void Add_GivenInvalidTitle_ShouldThrowException(string title)
        {
            Assert.Throws<ArgumentException>(() => _sut.Add(title));
        }

        [Fact]
        public void MarkAsDone_GivenNotDoneItem_ShouldSaveNewState()
        {
            var originalItem = _sut.GetAllItems(ItemState.Todo).First();
            
            _sut.MarkAsDone(originalItem);

            var updatedItem = _sut.Get(originalItem.Id);
            Assert.Equal(ItemState.Done, updatedItem.State);
        }
        
        private class ItemRepositoryStub : IItemRepository
        {
            private readonly IList<Item> _items;

            public ItemRepositoryStub()
            {
                _items = new List<Item>()
                {
                    new Item()
                    {
                        State = ItemState.Done, Title = "Some Title", Id = Guid.NewGuid()
                    },
                    new Item()
                    {
                        State = ItemState.Todo, Title = "Another Title", Id = Guid.NewGuid()
                    }
                };
            }

            public IReadOnlyCollection<Item> GetAllItems() => _items.ToArray();

            public void Add(Item item) => _items.Add(item);

            public void Delete(Item item) => _items.Remove(item);
            
            public void Save(Item item)
            {
                var index = _items.IndexOf(item);
                if (index == -1)
                {
                    _items.Add(item);
                }
                else
                {
                    _items[index] = item;
                }

            }
        }
    }
}