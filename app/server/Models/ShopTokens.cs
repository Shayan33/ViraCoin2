using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class ShopTokens
    {
        [Key]
        public Guid ID { get; set; }

        public Guid AssetID { get; set; }
        public Asset Asset { get; set; }

        public double Price { get; set; }

        public bool Img1 { get; set; }
        public bool Img2 { get; set; }
        public bool Img3 { get; set; }
        public bool Img4 { get; set; }
        public bool Img5 { get; set; }
        public bool Img6 { get; set; }
        public bool Img7 { get; set; }
        public bool Img8 { get; set; }
    }
}
