using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Sandbox.Models;

namespace Sandbox.Models
{
    public partial class DynamicAppContext : DbContext
    {
        public DynamicAppContext()
        {
        }

        public DynamicAppContext(DbContextOptions<DynamicAppContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<ContactDetails> ContactDetails { get; set; }
        public virtual DbSet<Name> Name { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<QuestionMapping> QuestionMapping { get; set; }
        public virtual DbSet<QuestionMappingText> QuestionMappingText { get; set; }
        public virtual DbSet<RefContactType> RefContactType { get; set; }
        public virtual DbSet<RefObjectType> RefObjectType { get; set; }
        public virtual DbSet<RefPage> RefPage { get; set; }
        public virtual DbSet<RefPageGroup> RefPageGroup { get; set; }
        public virtual DbSet<PageButtonManager> PageButtonManager { get; set; }
        public virtual DbSet<PageOrder> PageOrder { get; set; }
        public virtual DbSet<Personal> Personal { get; set; }
        public virtual DbSet<DdlData> DdlData { get; set; }

        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<Address>(entity =>
            {
                entity.Property(e => e.Address1).HasMaxLength(150);

                entity.Property(e => e.Address2).HasMaxLength(150);

                entity.Property(e => e.Address3).HasMaxLength(150);

                entity.Property(e => e.Address4).HasMaxLength(150);

                entity.Property(e => e.Postcode).HasMaxLength(10);
            });

            modelBuilder.Entity<ContactDetails>(entity =>
            {
                entity.Property(e => e.ContactDetail)
                    .HasColumnName("ContactDetails")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Name>(entity =>
            {
                entity.Property(e => e.FirstName).HasMaxLength(250);

                entity.Property(e => e.LastName).HasMaxLength(250);
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.QuestionText)
                    .HasColumnName("QuestionText")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<QuestionMapping>(entity =>
            {
                entity.Property(e => e.ColumnName).HasMaxLength(50);

                entity.Property(e => e.FieldName).HasMaxLength(50);

                entity.Property(e => e.OptionNextList).HasMaxLength(100);

                entity.Property(e => e.OptionTextList).HasMaxLength(1000);

                entity.Property(e => e.ReferenceTable).HasMaxLength(50);

                entity.Property(e => e.TableName).HasMaxLength(50);

                entity.HasOne(d => d.ObjectType)
                    .WithMany(p => p.QuestionMapping)
                    .HasForeignKey(d => d.ObjectTypeId)
                    .HasConstraintName("FK_QuestionMapping_RefObjectType");

                entity.HasOne(d => d.PageGroup)
                    .WithMany(p => p.QuestionMapping)
                    .HasForeignKey(d => d.PageGroupId)
                    .HasConstraintName("FK_QuestionMapping_QuestionMapping");

                entity.HasOne(d => d.Page)
                    .WithMany(p => p.QuestionMapping)
                    .HasForeignKey(d => d.PageId)
                    .HasConstraintName("FK_QuestionMapping_Page");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.QuestionMapping)
                    .HasForeignKey(d => d.QuestionId)
                    .HasConstraintName("FK_QuestionMapping_Question");
            });

            modelBuilder.Entity<QuestionMappingText>(entity =>
            {
                entity.Property(e => e.HelpText).HasMaxLength(1000);

                entity.Property(e => e.MandatoryText).HasMaxLength(1000);

                entity.HasOne(d => d.QuestionMapping)
                    .WithMany(p => p.QuestionMappingText)
                    .HasForeignKey(d => d.QuestionMappingId)
                    .HasConstraintName("FK_QuestionMappingText_QuestionMapping");
            });

            modelBuilder.Entity<RefContactType>(entity =>
            {
                entity.HasKey(e => e.ContactTypeId);

                entity.Property(e => e.ContactType).HasMaxLength(100);
            });

            modelBuilder.Entity<RefObjectType>(entity =>
            {
                entity.HasKey(e => e.ObjectTypeId);

                entity.Property(e => e.ObjectType).HasMaxLength(50);
            });

            modelBuilder.Entity<RefPage>(entity =>
            {
                entity.HasKey(e => e.PageId).HasName("PK_Page");

                entity.Property(e => e.PageName).HasMaxLength(100);
            });

            modelBuilder.Entity<RefPageGroup>(entity =>
            {
                entity.HasKey(e => e.PageGroupId).HasName("PK_PageGroup");

                entity.Property(e => e.PageGroup).HasMaxLength(100);
            });

            modelBuilder.Entity<PageButtonManager>(entity =>
            {
                entity.HasKey(e => e.PageButtonManagerId).HasName("PK_PageButtonManager");
                entity.Property(e => e.BackButtonText).HasMaxLength(20);
                entity.Property(e => e.ForwardButtonText).HasMaxLength(20);

            });

            modelBuilder.Entity<PageOrder>(entity =>
            {
                entity.HasKey(e => e.PageOrderId).HasName("PK_PageOrder");
            });

            modelBuilder.Entity<Personal>(entity =>
            {
                entity.HasKey(e => e.PersonalId).HasName("PK_Personal");
                entity.Property(e => e.PartnerName).HasMaxLength(100);
            });

            modelBuilder.Entity<DdlData>(entity =>
            {
                entity.HasKey(e => e.DdlDataId).HasName("PK_DdlData");
                entity.Property(e => e.DdlItemValue).HasMaxLength(100);
            });


        }

    }
}
