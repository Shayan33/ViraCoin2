using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Asset
    {
        [Key]
        public Guid ID { get; set; }
        #region Token Data
        [StringLength(100)]
        public string Token { get; set; }

        [StringLength(100)]
        public string Data { get; set; }

        public ulong I1 { get; set; }
        public ulong I2 { get; set; }
        public ulong I3 { get; set; }
        public ulong I4 { get; set; }

        public void ChunkData()
        {
            I1 = ulong.Parse(Token.Substring(0, 16));
            I2 = ulong.Parse(Token.Substring(16, 16));
            I3 = ulong.Parse(Token.Substring(32, 16));
            I4 = ulong.Parse(Token.Substring(46, 16));
        }
        public DateTime Production { get; set; }

        public DateTime Registration { get; set; }

        [StringLength(100)]
        public string CurrentOwner { get; set; }

        [StringLength(100)]
        public string PrevOwner { get; set; }

        [StringLength(100)]
        public string FirstOwner { get; set; }

        [StringLength(100)]
        public string Issuer { get; set; }

        [StringLength(100)]
        public string AttorneyOwner { get; set; }

        public bool Available { get; set; }

        public bool ForSale { get; set; }
        #endregion

        public Guid OWnerID { get; set; }

        [JsonIgnore]
        public Account Owner { get; set; }

        public string ImgPath { get; set; }

        [JsonIgnore]
        public Transaction CoinBaseTx { get; set; }

        [NotMapped]
        public string Tx { get; set; }

        public string MetaDate { get; set; }

        [JsonIgnore]
        public ShopTokens InShop { get; set; }
    }
}
