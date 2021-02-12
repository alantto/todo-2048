using System.Collections.Generic;
using Todo.Core;
using Todo.Core.Models;
using Xunit;

namespace Todo.UnitTests
{
    public class ItemServiceTests
    {
        [Fact]
        public void GetAllItems_Should_ReturnAllItems()
        {
            var sut = new ItemService(new ItemRepositoryStub());
            
            Assert.Equal(2, sut.GetAllItems().Count);
        }

        [Theory]
        [InlineData(ItemState.Done, 1, "Some Title")]
        [InlineData(ItemState.Todo, 1, "Another Title")]
        public void GetAllItemsWithState_Should_ReturnOnlyMatchingItem(ItemState state, int targetCount, string title)
        {
            var sut = new ItemService(new ItemRepositoryStub());

            var result = sut.GetAllItems(state);

            Assert.Equal(targetCount, result.Count);
            Assert.Contains(result, x => x.Title == title);
        }

        private class ItemRepositoryStub : IItemRepository
        {
            public IReadOnlyCollection<Item> GetAllItems()
            {
                return new[]
                {
                    new Item() {State = ItemState.Done, Title = "Some Title"},
                    new Item() {State = ItemState.Todo, Title = "Another Title"}
                };
            }
        }
    }
}