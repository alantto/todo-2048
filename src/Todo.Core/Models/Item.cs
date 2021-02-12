using System;
using System.Collections.Generic;

namespace Todo.Core.Models
{
    public class Item
    {
        private sealed class IdEqualityComparer : IEqualityComparer<Item>
        {
            public bool Equals(Item x, Item y)
            {
                if (ReferenceEquals(x, y)) return true;
                if (ReferenceEquals(x, null)) return false;
                if (ReferenceEquals(y, null)) return false;
                if (x.GetType() != y.GetType()) return false;
                return x.Id.Equals(y.Id);
            }

            public int GetHashCode(Item obj)
            {
                return obj.Id.GetHashCode();
            }
        }

        public static IEqualityComparer<Item> IdComparer { get; } = new IdEqualityComparer();

        public Guid Id { get; set; }
       
       public ItemState State { get; set; }
       
       public string Title { get; set; }
    }
}