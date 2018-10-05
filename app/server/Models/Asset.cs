using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public int No { get; set; }

        public bool Available { get; set; }

        #endregion

        public string ImgPath { get; set; }

        [NotMapped]
        public string Tx { get; set; }

        public string MetaDate { get; set; }

    }
}
