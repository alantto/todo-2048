using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using Todo.Core.Models;

namespace Todo.Core
{
    public class ItemTextFileRepository : IItemRepository
    {
        private readonly string _filePath;

        public ItemTextFileRepository(string filePath)
        {
            _filePath = filePath;
        }

        public IReadOnlyCollection<Item> GetAllItems() => GetAllLinesAndItems().items;

        public void Add(Item item) => File.AppendAllText(_filePath, ItemToLine(item) + Environment.NewLine, Encoding.UTF8);

        private string ItemToLine(Item item) => $"{item.Id.ToString()}&{HttpUtility.UrlEncode(item.Title)}&{item.State}";

        private Item ItemFromLine(string line)
        {
            var split = line.Split("&");
            var id = Guid.Parse(split[0]);
            var title = HttpUtility.UrlDecode(split[1]);
            var state = Enum.Parse<ItemState>(split[2]);

            return new Item() {Id = id, State = state, Title = title};
        }

        public void Save(Item item)
        {
            var (items, lines) = GetAllLinesAndItems();
            var existing = items.First(x => x.Id == item.Id);

            if (existing == null)
            {
                Add(item);
                return;
            }

            var index = Array.IndexOf(lines, ItemToLine(existing));
            lines[index] = ItemToLine(item);
            
            File.WriteAllLines(_filePath, lines, Encoding.UTF8);
        }

        public void Delete(Item item)
        {
            var (_, lines) = GetAllLinesAndItems();
            var line = ItemToLine(item);
            var newLines = lines.Where(x => x != line).ToArray();
            File.WriteAllLines(_filePath, newLines, Encoding.UTF8);
        }
        
        private (Item[] items, string[] lines) GetAllLinesAndItems()
        {
            if (!File.Exists(_filePath))
            {
                return (Array.Empty<Item>(), Array.Empty<string>());
            }
            var allLines = File.ReadAllLines(_filePath, Encoding.UTF8);
            var allItems = allLines.Select(ItemFromLine).ToArray();
            
            return (allItems, allLines);
        }
    }
}