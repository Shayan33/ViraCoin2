using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Account
    {
        [Key]
        public Guid ID { get; set; }

        [StringLength(25)]
        public string PubKey { get; set; }

        [StringLength(100)]
        public string Signture { get; set; }

        [StringLength(5)]
        public string PassPhrase { get; set; }

        [StringLength(20)]
        public string Name { get; set; }

        [StringLength(20)]
        public string MiddleName { get; set; }

        [StringLength(20)]
        public string LastName { get; set; }

        public string FullName { get => $"{Name} {MiddleName} {LastName}"; }

        [StringLength(100),EmailAddress]
        public string EmailAddress { get; set; }

        [StringLength(30)]
        public string PhoneNumber { get; set; }

        [StringLength(30)]
        public string CellNumber { get; set; }

        [StringLength(30)]
        public string OfficeNumber { get; set; }

        public string Address { get; set; }

        public bool Fa { get; set; }

        public ICollection<Asset> Assets { get; set; }
    }
}
