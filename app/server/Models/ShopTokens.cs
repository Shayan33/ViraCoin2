using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class ShopTokens
    {
        [Key]
        public Guid ID { get; set; }

        public Guid AssetID { get; set; }

        [JsonIgnore]
        public Asset Asset { get; set; }

        public double Price { get; set; }

        [NotMapped]
        public string Tx { get; set; }

        [NotMapped]
        public Guid Account { get; set; }
    }
}
