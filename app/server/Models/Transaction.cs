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
        Burn,
        PutInShop,
        RemoveFromShop
    }
    public class Transaction
    {
        [Key]
        public Guid ID { get; set; }

        public Guid SenderID { get; set; }
        public Account Sender { get; set; }

        public Guid? CoinBaseRelatedCoinID { get; set; }
        public Asset CoinBaseRelatedCoin { get; set; }

        [StringLength(100)]
        public string TxHash { get; set; }

        public bool Confirmed { get; set; }

        public string LogData { get; set; }

        public string Function { get; set; }
    }
}
