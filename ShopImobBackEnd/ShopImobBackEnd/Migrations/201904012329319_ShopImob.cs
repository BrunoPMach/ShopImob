namespace ShopImobBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ShopImob : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Produto",
                c => new
                    {
                        Id_Produto = c.Int(nullable: false, identity: true),
                        Nome = c.String(nullable: false, maxLength: 150),
                        Valor = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Produto_Id_Produto = c.Int(),
                    })
                .PrimaryKey(t => t.Id_Produto)
                .ForeignKey("dbo.Produto", t => t.Produto_Id_Produto)
                .Index(t => t.Produto_Id_Produto);
            
            CreateTable(
                "dbo.Venda",
                c => new
                    {
                        Id_Venda = c.Int(nullable: false, identity: true),
                        DataVenda = c.DateTime(nullable: false),
                        ValorComissao = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ValorTotal = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Quantidade = c.Int(nullable: false),
                        fk_vendedor = c.Int(nullable: false),
                        fk_produto = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id_Venda)
                .ForeignKey("dbo.Produto", t => t.fk_produto, cascadeDelete: true)
                .ForeignKey("dbo.Vendedor", t => t.fk_vendedor, cascadeDelete: true)
                .Index(t => t.fk_vendedor)
                .Index(t => t.fk_produto);
            
            CreateTable(
                "dbo.Vendedor",
                c => new
                    {
                        Id_Vendedor = c.Int(nullable: false, identity: true),
                        Nome = c.String(nullable: false, maxLength: 150),
                        DataNascimento = c.DateTime(nullable: false),
                        Genero = c.String(nullable: false, maxLength: 1),
                        Documento = c.String(nullable: false, maxLength: 11),
                        Endereco = c.String(nullable: false, maxLength: 200),
                        Salario = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Vendedor_Id_Vendedor = c.Int(),
                    })
                .PrimaryKey(t => t.Id_Vendedor)
                .ForeignKey("dbo.Vendedor", t => t.Vendedor_Id_Vendedor)
                .Index(t => t.Vendedor_Id_Vendedor);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Venda", "fk_vendedor", "dbo.Vendedor");
            DropForeignKey("dbo.Vendedor", "Vendedor_Id_Vendedor", "dbo.Vendedor");
            DropForeignKey("dbo.Venda", "fk_produto", "dbo.Produto");
            DropForeignKey("dbo.Produto", "Produto_Id_Produto", "dbo.Produto");
            DropIndex("dbo.Vendedor", new[] { "Vendedor_Id_Vendedor" });
            DropIndex("dbo.Venda", new[] { "fk_produto" });
            DropIndex("dbo.Venda", new[] { "fk_vendedor" });
            DropIndex("dbo.Produto", new[] { "Produto_Id_Produto" });
            DropTable("dbo.Vendedor");
            DropTable("dbo.Venda");
            DropTable("dbo.Produto");
        }
    }
}
