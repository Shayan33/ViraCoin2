using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        public long I1 { get; set; }
        public long I2 { get; set; }
        public long I3 { get; set; }
        public long I4 { get; set; }

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
        public Account Owner { get; set; }

        [StringLength(45)]
        public string ImgPath1 { get; set; }
        [StringLength(45)]
        public string ImgPath2 { get; set; }
        [StringLength(45)]
        public string ImgPath3 { get; set; }
        [StringLength(45)]
        public string ImgPath4 { get; set; }
        [StringLength(45)]
        public string ImgPath5 { get; set; }
        [StringLength(45)]
        public string ImgPath6 { get; set; }
        [StringLength(45)]
        public string ImgPath7 { get; set; }
        [StringLength(45)]
        public string ImgPath8 { get; set; }

        public string MetaDate { get; set; }

        public ShopTokens InShop { get; set; }
    }
}
