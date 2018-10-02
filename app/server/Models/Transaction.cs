using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public enum TransactionType
    {
        CoinBase,
        Transfer,
        ICO
    }
    public class Transaction
    {
        [Key]
        public Guid ID { get; set; }

        [StringLength(50)]
        public string SenderPubKey { get; set; }

        [StringLength(50)]
        public string RecipientPubKey { get; set; }

        public Guid? CoinBaseRelatedCoinID { get; set; }
        [JsonIgnore]
        public Asset CoinBaseRelatedCoin { get; set; }

        [StringLength(100)]
        public string TxHash { get; set; }

        public TransactionType Type { get; set; }

    }
}
