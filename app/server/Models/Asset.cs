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
        [MinLength(32),MaxLength(40)]
        public byte[] Token { get; set; }

        [MinLength(32), MaxLength(40)]
        public byte[] Data { get; set; }

        public DateTime Production { get; set; }

        public DateTime Registration { get; set; }

        [MinLength(20),MaxLength(32)]
        public byte[] CurrentOwner { get; set; }

        [MinLength(20), MaxLength(32)]
        public byte[] PrevOwner { get; set; }

        [MinLength(20), MaxLength(32)]
        public byte[] FirstOwner { get; set; }

        [MinLength(20), MaxLength(32)]
        public byte[] Issuer { get; set; }

        [MinLength(20), MaxLength(32)]
        public byte[] AttorneyOwner { get; set; }

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
