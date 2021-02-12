using System;
using System.IO;
using Todo.Core;
using Todo.Core.Models;
using Xunit;

namespace Todo.IntegrationTests
{
    public class ItemTextFileRepositoryTests : IDisposable
    {
        public void Dispose()
        {
            if (File.Exists(_filePath))
            {
                File.Delete(_filePath);
            }
        }

        private string _filePath;
        private IItemRepository _sut;

        public ItemTextFileRepositoryTests()
        {
            _filePath = Path.GetFullPath(Guid.NewGuid().ToString() + ".txt");
            _sut = new ItemTextFileRepository(_filePath);
        }

        [Fact]
        public void GivenEmptyRepository_WhenItemIsAdded_ShouldSaveToNewFile()
        {
            var itemId = Guid.NewGuid();
            _sut.Add(new Item() {Title = "Some title", State = ItemState.Todo, Id = itemId});

            Assert.True(File.Exists(_filePath));
            Assert.Contains(itemId.ToString(), File.ReadAllText(_filePath));
        }

        [Fact]
        public void GivenEmptyRepository_WhenItemIsAdded_ItCanBeRead()
        {
            var itemId = Guid.NewGuid();
            var itemTitle = "ioidijlkjdslkj323";
            _sut.Add(new Item() {Title = itemTitle, State = ItemState.Todo, Id = itemId});

            var service = new ItemService(_sut);
            var foundItem = service.Get(itemId);

            Assert.NotNull(foundItem);
            Assert.Equal(itemTitle, foundItem.Title);
            Assert.Equal(ItemState.Todo, foundItem.State);
        }

        [Fact]
        public void GivenExistingItem_ItCanBeUpdated()
        {
            var itemId = Guid.NewGuid();
            var itemTitle = "ioidijlkjdslkj323";
            var item = new Item() {Title = itemTitle, State = ItemState.Todo, Id = itemId};
            _sut.Add(item);

            var service = new ItemService(_sut);
            service.MarkAsDone(item);
            var foundItem = service.Get(itemId);
            Assert.Equal(ItemState.Done, foundItem.State);
        }
    }
}